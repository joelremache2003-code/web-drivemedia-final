# DRIVE MEDIA S.A.S — Web Platform

Este es el repositorio oficial de la plataforma web de **DRIVE MEDIA S.A.S**, una empresa líder en Ecuador enfocada en Inteligencia Artificial, automatización y consultoría tecnológica de alto nivel.

## 🚀 Despliegue en Vercel

El proyecto está configurado para ser desplegado como un sitio estático en Vercel.

### Opción 1: Vercel CLI (Recomendado para actualizaciones rápidas)

1. Instala la herramienta de Vercel:
   ```bash
   npm i -g vercel
   ```
2. Inicia sesión:
   ```bash
   vercel login
   ```
3. Despliega la versión de producción:
   ```bash
   vercel --prod
   ```

### Opción 2: Conexión con GitHub (Recomendado para CI/CD)

1. Sube este código a un repositorio de GitHub.
2. En el dashboard de Vercel, haz clic en **"New Project"**.
3. Importa el repositorio de GitHub.
4. Vercel detectará automáticamente que es un sitio estático y desplegará cada vez que hagas `git push`.

---

## 🌐 Configuración del Dominio (GoDaddy)

Para conectar **drivemediadj.com**, sigue estos pasos:

### 1. En Vercel
1. Ve a **Settings > Domains** en tu proyecto de Vercel.
2. Añade `drivemediadj.com`.
3. Vercel te pedirá configurar los registros DNS.

### 2. En GoDaddy (DNS Management)
Inicia sesión en GoDaddy, ve a la administración de DNS de tu dominio y añade/actualiza estos registros:

| Tipo  | Nombre (Host) | Valor | TTL |
| :---  | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | 1/2 Hour (o Default) |
| **CNAME** | `www` | `cname.vercel-dns.com` | 1/2 Hour (o Default) |

> [!NOTE]
> Una vez guardados los cambios en GoDaddy, la propagación DNS puede tardar desde unos minutos hasta 48 horas, aunque usualmente es casi instantánea con Vercel.

---

## 🛠️ Desarrollo Local

Para previsualizar el sitio localmente, puedes usar cualquier servidor estático. Si tienes VS Code, **Live Server** es la mejor opción.

Si prefieres la terminal:
```bash
npx serve .
```

## 📁 Estructura del Proyecto

- `index.html`: Página principal (Hero, Servicios, Intro).
- `servicios.html`: Detalle de soluciones tecnológicas e IA.
- `music.html`: Press Kit y sección de Progressive House.
- `nosotros.html`: Visión y equipo de Drive Media.
- `contacto.html`: Formulario de contacto y agendamiento.
- `assets/`: Estilos (CSS), Imágenes (img) y Scripts (js).
- `vercel.json`: Configuraciones de cabeceras y caché para producción.

---

© 2026 DRIVE MEDIA S.A.S. Todos los derechos reservados.
