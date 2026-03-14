# Estructura de Páginas CMS

## Descripción General

Las páginas del sitio se construyen mediante bloques modulares representados como posts CMS. Cada bloque define su tipo a través de categorías y se relaciona con una página raíz mediante el campo `parent`. Los bloques se renderizan en orden ascendente según el campo `ordering`.

---

# Página de Inicio

## Post Raíz
```json
{
  "slug": "ecommerce-home",
  "title": "Inicio",
  "categories": [
    { "name": "Page", "slug": "page" },
    { "name": "Home", "slug": "home" }
  ],
  "parent": null
}
```

Actúa como contenedor principal. Todos los bloques de la página de inicio apuntan a este post como `parent`.

---

## Tipos de Bloques

| Tipo | Slug | Descripción | Uso |
|------|------|-------------|-----|
| Banner | `home-banner` | Imagen grande con título y enlace | Promociones destacadas |
| Banner Slider | `home-banner-slider` | Carrusel de banners (completos o simples) | Múltiples promociones |
| Categorías | `home-categories` | Grilla de categorías con imágenes | Navegación visual |
| Productos | `home-products-by-category` | Lista de productos de una categoría | Mostrar stock destacado |
| HTML libre | `home-html` | HTML personalizado | Anuncios, promos, dividers |

---

## Estructura de Cada Bloque

### Banner

**Slug:** `home-banner`
```json
{
  "slug": "ecommerce-home-banner-1",
  "title": "Nueva colección",
  "excerpt": null,
  "body": "{\"subtitle\": \"Temporada 2026\", \"autoplay\": true}",
  "categories": [
    { "name": "Home", "slug": "home-block" },
    { "name": "Banner", "slug": "home-banner" }
  ],
  "link": "/coleccion/nueva",
  "featured_image": "/img/banner1.jpg",
  "ordering": 1,
  "parent": {
    "slug": "ecommerce-home",
    "title": "Inicio"
  }
}
```

Campos importantes:
- `title`: Título principal visible en el banner
- `body`: JSON con `subtitle` (texto secundario) y `autoplay` (rotación automática)
- `featured_image`: Imagen principal (recomendado: 1920x600px)
- `link`: Destino al hacer clic

---

### Categorías Destacadas

**Slug:** `home-categories`
```json
{
  "slug": "ecommerce-home-categories",
  "title": "Categorías",
  "excerpt": null,
  "body": "{\"items\": [{\"slug\": \"maquillaje\", \"image\": \"/img/maq.jpg\"}, {\"slug\": \"perfumes\", \"image\": \"/img/perf.jpg\"}]}",
  "categories": [
    { "name": "Home", "slug": "home-block" },
    { "name": "Categorías", "slug": "home-categories" }
  ],
  "ordering": 2,
  "parent": {
    "slug": "ecommerce-home",
    "title": "Inicio"
  }
}
```

Campos importantes:
- `body`: JSON con array `items`:
  - `slug`: Slug de la categoría (usado para navegación)
  - `image`: Imagen de la categoría (recomendado: 300x300px)

---

### Productos por Categoría

**Slug:** `home-products-by-category`
```json
{
  "slug": "ecommerce-home-products-maquillaje",
  "title": "Maquillaje destacado",
  "excerpt": null,
  "body": "{\"category_slug\": \"maquillaje\", \"limit\": 8, \"order\": \"popular\"}",
  "categories": [
    { "name": "Home", "slug": "home-block" },
    { "name": "Productos", "slug": "home-products-by-category" }
  ],
  "ordering": 3,
  "parent": {
    "slug": "ecommerce-home",
    "title": "Inicio"
  }
}
```

Campos importantes:
- `body`: JSON con:
  - `category_slug`: Slug de la categoría a filtrar
  - `limit`: Cantidad de productos a mostrar (recomendado: 4–12)
  - `order`: Criterio de ordenamiento (`popular`, `new`, `price_asc`, `price_desc`)

---

### Banner Slider

**Slug:** `home-banner-slider`

Bloque contenedor que agrupa múltiples items renderizados como carrusel. Los items son posts hijos con `parent` apuntando a este bloque.
```json
{
  "slug": "ecommerce-home-banner-slider-main",
  "title": "Slider Principal",
  "excerpt": null,
  "body": "{\"autoplay\": true, \"duration\": 5000}",
  "categories": [
    { "name": "Home", "slug": "home-block" },
    { "name": "Banner Slider", "slug": "home-banner-slider" }
  ],
  "ordering": 2,
  "parent": {
    "slug": "ecommerce-home",
    "title": "Inicio"
  }
}
```

Campos importantes:
- `body`: JSON con configuración del slider:
  - `autoplay` (boolean): Rotación automática
  - `duration` (number): Tiempo en ms entre cambios (default: 5000)

#### Item de Slider — Banner Completo

**Slug:** personalizado | **Parent:** `ecommerce-home-banner-slider-main`

Reutiliza la estructura de `home-banner` como hijo del slider. Muestra título, descripción, imagen y botón de acción.
```json
{
  "slug": "ecommerce-home-banner-slider-item-1",
  "title": "Colección Verano",
  "excerpt": "Descubre lo último en moda",
  "body": "{\"subtitle\": \"Temporada 2026\"}",
  "categories": [
    { "name": "Home", "slug": "home-block" },
    { "name": "Banner", "slug": "home-banner" }
  ],
  "link": "/coleccion/verano",
  "featured_image": "/img/banner-summer.jpg",
  "ordering": 1,
  "parent": {
    "slug": "ecommerce-home-banner-slider-main",
    "title": "Slider Principal"
  }
}
```

Campos importantes:
- `title`: Título principal visible en el banner
- `excerpt`: Subtítulo o descripción visible
- `body`: JSON con `subtitle` (texto adicional)
- `featured_image`: Imagen principal (1920x600px)
- `link`: Destino al hacer clic
- `categories`: Debe incluir `home-banner`

#### Item de Slider — Imagen Simple

**Slug:** personalizado | **Parent:** `ecommerce-home-banner-slider-main`

Solo imagen, opcionalmente con link. No muestra texto ni botón.
```json
{
  "slug": "ecommerce-home-banner-slider-item-promo",
  "title": null,
  "excerpt": null,
  "body": null,
  "categories": [
    { "name": "Home", "slug": "home-block" },
    { "name": "Banner Slider Item", "slug": "home-banner-slider-item-image" }
  ],
  "link": "/shop",
  "featured_image": "/img/promo-banner.jpg",
  "ordering": 2,
  "parent": {
    "slug": "ecommerce-home-banner-slider-main",
    "title": "Slider Principal"
  }
}
```

Campos importantes:
- `featured_image`: Imagen principal (1920x600px)
- `link`: Opcional. Si está presente, toda la imagen es clickeable
- `title`, `excerpt`, `body`: Deben ser `null`
- `categories`: Debe incluir `home-banner-slider-item-image`

---

### HTML Personalizado

**Slug:** `home-html`
```json
{
  "slug": "ecommerce-home-html-promo",
  "title": null,
  "excerpt": null,
  "body": "<div class=\"promo\">Envíos gratis desde $999</div>",
  "categories": [
    { "name": "Home", "slug": "home-block" },
    { "name": "HTML", "slug": "home-html" }
  ],
  "ordering": 4,
  "parent": {
    "slug": "ecommerce-home",
    "title": "Inicio"
  }
}
```

Campos importantes:
- `body`: HTML puro sin escapar
- `title`: Opcional, puede ser `null`
- Uso típico: dividers, banners promocionales, widgets personalizados

> El contenido del `body` no se sanitiza. Evitar incluir HTML de fuentes no confiables.

---

## Orden Recomendado
```
ordering: 1  → Banner (hero único)
ordering: 2  → Banner Slider (contenedor)
              ├─ Item 1: banner completo o imagen simple
              ├─ Item 2: banner completo o imagen simple
              └─ Item N: ...
ordering: 3  → Categorías destacadas
ordering: 4  → Productos — Categoría 1
ordering: 5  → HTML — Promo
ordering: 6  → Productos — Categoría 2
ordering: 7+ → Bloques adicionales
```

---

## Checklist de Validación

Bloque contenedor `home-banner-slider`:
- [ ] `parent.slug` apunta a `ecommerce-home`
- [ ] `body` solo contiene configuración del slider (`autoplay`, `duration`)
- [ ] `categories` incluye `home-block` y `home-banner-slider`

Items del slider (hijos):
- [ ] `parent.slug` apunta a `ecommerce-home-banner-slider-main`
- [ ] `ordering` es secuencial dentro del contenedor
- [ ] Items tipo `home-banner`: incluyen `title`, `featured_image`, `link` y category `home-banner`
- [ ] Items tipo `home-banner-slider-item-image`: solo `featured_image` y opcionalmente `link`, con category `home-banner-slider-item-image`; `title`, `excerpt` y `body` en `null`
- [ ] Todas las imágenes existen y tienen las dimensiones adecuadas (1920x600px)

---

## Notas

- Los bloques se renderizan en orden ascendente por `ordering`.
- Los items dentro de un slider se ordenan por `ordering` relativo a su contenedor.
- Se pueden agregar múltiples bloques del mismo tipo.
- Las imágenes se sirven desde CDN externo.
- El slider soporta arquitectura mixta: puede combinar banners completos e imágenes simples en el mismo contenedor.

---

# Footer

## Post Raíz
```json
{
  "slug": "ecommerce-footer",
  "title": "Footer",
  "categories": [
    { "name": "Page", "slug": "page" },
    { "name": "Footer", "slug": "footer" }
  ],
  "parent": null
}
```

Actúa como contenedor principal. Todos los bloques de columnas del footer apuntan a este post como `parent`.

A diferencia del home, todos los bloques del footer son hojas (sin hijos): toda la información de cada columna vive en su propio campo `body`.

---

## Tipos de Bloques

| Tipo | Slug | Descripción |
|------|------|-------------|
| Links simples | `footer-links` | Lista de links con URLs explícitas |
| Categorías | `footer-categories` | Links a categorías del catálogo (por slug) |
| Redes sociales | `footer-social` | Íconos y links a perfiles de redes sociales |

---

## Estructura de Cada Bloque

### Links Simples

**Slug:** `footer-links`
```json
{
  "slug": "ecommerce-footer-links-empresa",
  "title": "Empresa",
  "excerpt": null,
  "body": "{\"items\": [{\"label\": \"Quiénes somos\", \"link\": \"/nosotros\"}, {\"label\": \"Contacto\", \"link\": \"/contacto\"}, {\"label\": \"Aviso de privacidad\", \"link\": \"/privacidad\"}]}",
  "categories": [
    { "name": "Footer", "slug": "footer-block" },
    { "name": "Links", "slug": "footer-links" }
  ],
  "link": null,
  "featured_image": null,
  "ordering": 1,
  "parent": {
    "slug": "ecommerce-footer",
    "title": "Footer"
  }
}
```

Campos importantes:
- `title`: Encabezado visible de la columna
- `body`: JSON con array `items`:
  - `label`: Texto visible del link
  - `link`: URL destino (relativa o absoluta)

---

### Categorías

**Slug:** `footer-categories`
```json
{
  "slug": "ecommerce-footer-categories-shop",
  "title": "Tienda",
  "excerpt": null,
  "body": "{\"items\": [{\"label\": \"Maquillaje\", \"slug\": \"maquillaje\"}, {\"label\": \"Perfumes\", \"slug\": \"perfumes\"}, {\"label\": \"Skincare\", \"slug\": \"skincare\"}]}",
  "categories": [
    { "name": "Footer", "slug": "footer-block" },
    { "name": "Categorías", "slug": "footer-categories" }
  ],
  "link": null,
  "featured_image": null,
  "ordering": 2,
  "parent": {
    "slug": "ecommerce-footer",
    "title": "Footer"
  }
}
```

Campos importantes:
- `title`: Encabezado visible de la columna
- `body`: JSON con array `items`:
  - `label`: Texto visible
  - `slug`: Slug de la categoría. El frontend construye la URL (ej: `/categoria/maquillaje`)

> A diferencia de `footer-links`, este bloque referencia entidades del catálogo por slug. La URL la construye el renderer, no el editor de contenido.

---

### Redes Sociales

**Slug:** `footer-social`
```json
{
  "slug": "ecommerce-footer-social",
  "title": "Síguenos",
  "excerpt": null,
  "body": "{\"items\": [{\"network\": \"instagram\", \"url\": \"https://instagram.com/mitienda\", \"label\": \"@mitienda\"}, {\"network\": \"facebook\", \"url\": \"https://facebook.com/mitienda\", \"label\": \"Mi Tienda\"}, {\"network\": \"tiktok\", \"url\": \"https://tiktok.com/@mitienda\", \"label\": \"@mitienda\"}]}",
  "categories": [
    { "name": "Footer", "slug": "footer-block" },
    { "name": "Social", "slug": "footer-social" }
  ],
  "link": null,
  "featured_image": null,
  "ordering": 3,
  "parent": {
    "slug": "ecommerce-footer",
    "title": "Footer"
  }
}
```

Campos importantes:
- `title`: Encabezado visible de la sección
- `body`: JSON con array `items`:
  - `network`: Identificador de la red. El renderer lo mapea al ícono correspondiente. Valores reconocidos: `instagram`, `facebook`, `tiktok`, `twitter`, `youtube`, `pinterest`, `whatsapp`
  - `url`: URL completa del perfil
  - `label`: Handle o texto alternativo visible

---

## Orden Recomendado
```
ordering: 1 → footer-categories  → "Tienda"
ordering: 2 → footer-links       → "Empresa"
ordering: 3 → footer-links       → "Ayuda"
ordering: 4 → footer-social      → "Síguenos"
```

Los bloques se renderizan de izquierda a derecha según `ordering`. Se pueden agregar múltiples bloques del mismo tipo incrementando el valor.

---

## Checklist de Validación

Todos los bloques:
- [ ] `parent.slug` apunta a `ecommerce-footer`
- [ ] `categories` incluye `footer-block` y el slug del tipo específico
- [ ] `ordering` es único y secuencial entre hermanos
- [ ] `title` presente si se requiere encabezado visible (puede ser `null`)

`footer-links`:
- [ ] Cada item en `body.items` contiene `label` y `link`
- [ ] Los valores de `link` son URLs válidas (relativas o absolutas)

`footer-categories`:
- [ ] Cada item en `body.items` contiene `label` y `slug`
- [ ] Los slugs coinciden con categorías existentes en el catálogo

`footer-social`:
- [ ] Cada item en `body.items` contiene `network`, `url` y `label`
- [ ] `network` usa uno de los valores reconocidos: `instagram`, `facebook`, `tiktok`, `twitter`, `youtube`, `pinterest`, `whatsapp`

---

## Notas

- Todos los bloques del footer son hojas (sin hijos). Contrasta con el slider del home, que usa arquitectura parent-child.
- El bloque `footer-social` puede repetirse para manejar múltiples grupos de redes (ej: cuentas por país o marca).
- El campo `body` en todos los bloques del footer es siempre JSON estructurado. No aplica HTML libre.