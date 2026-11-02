# tgsconstruccion.cl — Astro

Primera instancia del sitio de TGS Construcción migrado de WordPress + Bricks a
Astro estático, con edición visual mediante Pages CMS.

## Correr en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Editar contenido (sin tocar código)

El archivo `.pages.yml` define el panel. Conectando el repositorio en
https://app.pagescms.org se edita desde el navegador:

- **Artículos del blog** → `src/content/posts/*.md`
- **Textos del sitio** → `src/data/site.json` (portada, servicios, testimonios, FAQ, teléfono, zonas)

Cada cambio se guarda como commit y Cloudflare Pages reconstruye el sitio solo.

## Estructura

```
src/
  data/site.json          Textos editables del sitio
  content/posts/*.md      12 artículos migrados
  content.config.ts       Colección del blog
  layouts/Base.astro      HTML base, SEO, Open Graph
  components/             Header, Footer, ServiceLanding
  pages/
    index.astro           Portada
    remodelacion-de-banos.astro
    remodelacion-cocinas.astro
    portafolio.astro
    nosotros.astro
    contacto.astro        Formulario que arma el mensaje de WhatsApp
    blog/index.astro      Listado
    blog/[...slug].astro  Artículo
  styles/global.css       Tokens del sitio real (Satoshi, #ffb700, 1260px)
public/
  fonts/                  Satoshi 300/400/500/700
  _redirects              301 de WordPress → Astro
  _headers                Cache y cabeceras de seguridad
```

## Migración SEO pendiente antes de publicar

1. **Descargar las imágenes y videos** que hoy apuntan a
   `tgsconstruccion.cl/wp-content/uploads/...` y moverlos a `public/img/`.
   Mientras estén en WordPress, apuntan al sitio viejo.
2. Verificar que los 12 artículos mantengan su URL vía `_redirects` (ya cargados).
3. Reenviar el sitemap en Search Console después del cambio de DNS.
4. Reponer el formulario con envío por correo (hoy abre WhatsApp).

## Deploy

Cloudflare Pages: build `npm run build`, output `dist`, Node 20+.
Proyecto sugerido: `tgs-construccion` → primero en `*.pages.dev` para revisar,
después se apunta el dominio cuando el cliente apruebe.
