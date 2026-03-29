# GitHub Pages + Cloudflare (preview desde branch, sin merge a `main`)

Este repo publica la web **solo cuando hay push a la branch `website-v2`**. La rama `main` no dispara el deploy.

## 1. Subir tu branch

```bash
git add .
git commit -m "chore: preview deploy setup"
git push -u origin website-v2
```

Si tu branch de trabajo tiene otro nombre, cambia la línea `branches:` en [`.github/workflows/deploy-branch-preview.yml`](../.github/workflows/deploy-branch-preview.yml) para que coincida.

## 2. Activar GitHub Pages (una vez por repo)

En GitHub: **Settings → Pages → Build and deployment**

- **Source:** GitHub Actions
- Elige el workflow **“Deploy branch preview to GitHub Pages”** si te lo pide en el primer deploy.

Tras un push a `website-v2`, revisa **Actions**: el job debe terminar en verde. La URL por defecto suele ser:

`https://<owner>.github.io/<repo>/`

> Si ves 404: comprueba que el workflow se ejecutó en la branch correcta y que en Pages la fuente sea **GitHub Actions**.

## 3. Dominio personalizado (ej. `docs.geodesicworks.com`)

En **Settings → Pages → Custom domain**, introduce el hostname (ej. `docs.geodesicworks.com`) y guarda. GitHub mostrará los registros DNS que espera.

En **Cloudflare** (zona `geodesicworks.com`):

1. **DNS → Add record**
2. Tipo **CNAME**, nombre **docs**, destino **`<tu-usuario-o-org>.github.io`** (como indica GitHub para tu cuenta u organización).
3. Proxy: muchos equipos usan **DNS only** (nube gris) para evitar conflictos con certificados; si usas proxy naranja, revisa que no haya reglas que bloqueen GitHub.

Espera propagación y que GitHub marque el dominio como verificado. HTTPS lo gestiona GitHub una vez verificado el dominio.

## 4. Build local (sanidad)

```bash
npm ci
npm run build
npm run preview
```

Abre la URL que imprime Vite (por defecto `http://localhost:4173/`) y comprueba que carguen estilos, fuentes e imágenes.

## 5. Notas sobre Vite

- El sitio es una SPA estática sin router; **`base` por defecto `/`** es correcto si publicas en la raíz del subdominio o de `*.github.io/<repo>/` según la URL que GitHub asigne.
- Si en el futuro publicas bajo una **subruta** (no raíz), tendrás que configurar `base` en `vite.config.js` para esa ruta.
