#!/usr/bin/env python3
"""
Screenshot tool using headless Chrome DevTools Protocol.
Takes full-page screenshots of each major section.
"""
import subprocess
import json
import urllib.request
import time
import base64
import sys
import os

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE_URL = "http://localhost:8743"
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "tmp", "screenshots")

os.makedirs(OUT_DIR, exist_ok=True)

def start_chrome():
    proc = subprocess.Popen(
        [CHROME, "--headless=new", "--disable-gpu", "--remote-debugging-port=9222",
         "--no-first-run", "--no-default-browser-check", "--window-size=1440,900",
         "--hide-scrollbars", BASE_URL],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    time.sleep(2.5)
    return proc

def cdp(ws_url, method, params=None):
    """Send CDP command via HTTP (simplified using /json/new endpoint approach)."""
    pass

def get_tab():
    for _ in range(10):
        try:
            with urllib.request.urlopen("http://localhost:9222/json") as r:
                tabs = json.loads(r.read())
                for tab in tabs:
                    if tab.get("type") == "page":
                        return tab["webSocketDebuggerUrl"], tab["id"]
        except Exception:
            time.sleep(0.5)
    raise RuntimeError("Could not connect to Chrome DevTools")

def screenshot_via_cdp(ws_debugger_url, scroll_y, filename):
    """Use Python websocket to send CDP commands."""
    import socket
    import hashlib
    import struct
    import random

    # Parse ws url
    # ws://localhost:9222/devtools/page/...
    ws_host = "localhost"
    ws_port = 9222
    ws_path = ws_debugger_url.replace("ws://localhost:9222", "")

    # Build WebSocket handshake
    key = base64.b64encode(os.urandom(16)).decode()
    handshake = (
        f"GET {ws_path} HTTP/1.1\r\n"
        f"Host: {ws_host}:{ws_port}\r\n"
        "Upgrade: websocket\r\n"
        "Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        "Sec-WebSocket-Version: 13\r\n\r\n"
    )

    sock = socket.create_connection((ws_host, ws_port))
    sock.sendall(handshake.encode())
    resp = b""
    while b"\r\n\r\n" not in resp:
        resp += sock.recv(4096)

    def send_ws(msg_dict, msg_id):
        msg = json.dumps({**msg_dict, "id": msg_id}).encode()
        length = len(msg)
        # Build frame: fin=1, opcode=1 (text), masked=1
        header = bytearray([0x81])
        mask = os.urandom(4)
        if length < 126:
            header.append(0x80 | length)
        elif length < 65536:
            header.append(0x80 | 126)
            header += struct.pack(">H", length)
        else:
            header.append(0x80 | 127)
            header += struct.pack(">Q", length)
        header += mask
        masked = bytearray(b ^ mask[i % 4] for i, b in enumerate(msg))
        sock.sendall(bytes(header) + bytes(masked))

    def recv_ws():
        data = b""
        while True:
            chunk = sock.recv(65536)
            data += chunk
            if len(data) < 2:
                continue
            fin = (data[0] & 0x80) != 0
            opcode = data[0] & 0x0f
            has_mask = (data[1] & 0x80) != 0
            length = data[1] & 0x7f
            offset = 2
            if length == 126:
                length = struct.unpack(">H", data[2:4])[0]
                offset = 4
            elif length == 127:
                length = struct.unpack(">Q", data[2:10])[0]
                offset = 10
            if len(data) < offset + length:
                continue
            payload = data[offset:offset+length]
            if has_mask:
                mask = data[offset-4:offset]
                payload = bytearray(b ^ mask[i%4] for i,b in enumerate(payload))
            return json.loads(payload.decode())

    # Enable Runtime
    send_ws({"method": "Runtime.enable", "params": {}}, 1)
    recv_ws()

    # Scroll to position and force-reveal all animated elements
    expr = (
        f"window.scrollTo(0, {scroll_y}); "
        "document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));"
    )
    send_ws({"method": "Runtime.evaluate",
             "params": {"expression": expr}}, 2)
    recv_ws()
    time.sleep(0.4)

    # Take screenshot
    send_ws({"method": "Page.captureScreenshot",
             "params": {"format": "png", "quality": 100, "captureBeyondViewport": False}}, 3)
    result = recv_ws()

    sock.close()

    img_data = base64.b64decode(result["result"]["data"])
    out_path = os.path.join(OUT_DIR, filename)
    with open(out_path, "wb") as f:
        f.write(img_data)
    print(f"  Saved: {out_path}")
    return out_path


def main():
    print("Starting Chrome DevTools session...")
    proc = start_chrome()

    try:
        ws_url, tab_id = get_tab()
        print(f"Connected to tab: {tab_id[:16]}...")

        sections = [
            (0,    "01_hero.png"),
            (750,  "02_services_top.png"),
            (1350, "03_services_bottom.png"),
            (1730, "04_philosophy.png"),
            (2430, "05_contact_footer.png"),
        ]

        for scroll_y, filename in sections:
            print(f"  Screenshotting y={scroll_y} -> {filename}")
            screenshot_via_cdp(ws_url, scroll_y, filename)

        print("\nAll screenshots saved to tmp/screenshots/")

    finally:
        proc.terminate()
        proc.wait()

if __name__ == "__main__":
    main()
