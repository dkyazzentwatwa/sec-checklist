# Deployment Guide (Vercel)

Rights Shield is built for static hosting with Vite and can be deployed directly to Vercel.

## Prerequisites

- Node.js 18+
- Vercel account

## Steps

1. Import the repository in Vercel.
2. Configure the project:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy the project.

## Security Headers

`vercel.json` already includes security headers (CSP, HSTS, X-Frame-Options, etc.).
Verify them after deployment using a headers scanner such as `securityheaders.com`.

## Preview Builds

Vercel automatically creates preview builds for pull requests. Use these previews to validate:

- PWA install flow
- AI model downloads (WebGPU)
- Offline support

## Local Production Preview

```bash
npm run build
npm run preview
```

## Troubleshooting

- If CSP blocks WebGPU or worker usage, review the `Content-Security-Policy` in `vercel.json`.
- If assets are missing, confirm the build output is `dist` and the project root matches the repo.
