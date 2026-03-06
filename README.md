# Ivica Portfolio Website

Personal portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Vercel serverless function (`api/contact.ts`) with Resend

## Run Locally

```bash
npm install
npm run dev
```

The app will run at `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

## Contact API

`POST /api/contact`

Expected JSON body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Your message"
}
```

Required environment variables on deployment:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## Deployment

- Vercel config is in `vercel.json`
- SPA routes are rewritten to `index.html`
- API routes are served from `api/**/*.ts`
