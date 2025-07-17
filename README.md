
# Prueba Técnica: Mobile Shop

Esta es una mini-app SPA hecha en React (Next.js) para comprar móviles. Solo tiene dos vistas: listado de productos y detalle de producto. El diseño es responsive y el filtrado funciona en tiempo real por marca/modelo.

## ¿Cómo se usa?

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Arranca en modo desarrollo:
   ```bash
   npm run dev
   ```
3. Para producción:
   ```bash
   npm run build
   npm start
   ```
4. Para exportar estático (GitHub Pages):
   ```bash
   npm run build
   npm run export
   ```
   El resultado estará en la carpeta `out`.

## Scripts disponibles

-- `npm run dev` - desarrollo
-- `npm run build` - build producción
-- `npm start` - servidor producción
-- `npm run export` - exporta la app como estática en `out` (para GitHub Pages)
-- `npm run lint` - lint
-- `npm run test` - tests

## Estructura

- Listado de productos con buscador
- Detalle de producto con imagen, specs y acciones
- Header con breadcrumbs y contador de carrito
- Carrito persistente y selectores de color/almacenamiento

## API

Se usa la API pública:
https://itx-frontend-test.onrender.com

Endpoints:
- GET /api/product
- GET /api/product/:id
- POST /api/cart

## Notas
- Para desplegar en GitHub Pages, asegúrate de tener el workflow `.github/workflows/gh-pages.yml` y que la carpeta `out` se genere correctamente con `npm run export`.
- Si tu repositorio no está en la raíz de GitHub Pages, configura `assetPrefix` y `basePath` en `next.config.js`.

- No se usa TypeScript
- Todo el estado se gestiona con hooks
- El caché es en localStorage y expira a la hora

---
Para cualquier duda, revisa los comentarios en el código.
---
P.D Un saludo y espero que tengas un buen dia.
Alberca.
---
