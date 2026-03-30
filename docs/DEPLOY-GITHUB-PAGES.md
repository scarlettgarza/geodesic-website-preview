# Public preview repo via GitHub Pages

The private repo stays private. The public preview lives in a separate repo:

- Source repo: `GeodesicWorks/geodesic-website`
- Working branch: `website-v2`
- Public preview repo: `scarlettgarza/geodesic-website-preview`
- Public URL: `https://scarlettgarza.github.io/geodesic-website-preview/`

## Update the public preview

From the private repo, after committing your latest changes to `website-v2`, run:

```bash
npm run sync:preview
```

What it does:

- exports a clean snapshot of `website-v2`
- rewrites the Pages workflow in that snapshot to deploy from `main`
- creates a temporary Git repo from the snapshot
- force-pushes that snapshot to the `main` branch of the `preview` remote

That push triggers GitHub Pages in the public preview repo.

## Requirements

- You must be on a machine that already has GitHub access to `scarlettgarza/geodesic-website-preview`
- The private repo must contain a `preview` remote

Check it with:

```bash
git remote -v
```

You should see:

```bash
preview  https://github.com/scarlettgarza/geodesic-website-preview.git (fetch)
preview  https://github.com/scarlettgarza/geodesic-website-preview.git (push)
```

## Optional overrides

You can override defaults when needed:

```bash
PREVIEW_REMOTE=preview PREVIEW_SOURCE_REF=website-v2 PREVIEW_DEFAULT_BRANCH=main npm run sync:preview
```

## Notes

- This does not touch `main` in the private `GeodesicWorks` repo.
- This does not affect Vercel.
- The public preview repo is intentionally disposable; it is only there to host the preview site.
