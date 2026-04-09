# Portfolio Website

A modern personal portfolio for Nasimul Arafin Rounok, built with Next.js, React, and TypeScript. The application presents a full stack developer profile through a responsive single-page interface with motion design, curated project showcases, experience highlights, and a production-ready contact workflow.

## Live URL

[https://portfolio-website-one-rouge-17.vercel.app/](https://portfolio-website-one-rouge-17.vercel.app/)

## Highlights

- Responsive portfolio experience across mobile, tablet, and desktop
- Smooth scrolling with Lenis
- Motion-driven interactions using Framer Motion and GSAP
- Full stack project showcase with adaptive layouts
- Contact form validation, spam protection, and email delivery
- SEO-oriented metadata and generated app icons

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- GSAP
- Lenis
- Zod

## Application Structure

```text
src/
  app/
    api/contact/route.ts
    apple-icon.tsx
    icon.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    portfolio/
      data.ts
      icons.tsx
      portfolio-page.tsx
      portfolio-shell.tsx
  lib/
    contact-schema.ts
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

Run linting:

```bash
pnpm lint
```

If you prefer npm, use the equivalent `npm run <script>` commands.

## Environment Variables

Copy `.env.example` to `.env` and configure the following values:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

### Variable Reference

- `NEXT_PUBLIC_SITE_URL`: public site URL used for canonical and social metadata
- `RESEND_API_KEY`: Resend API key for contact form email delivery
- `CONTACT_TO_EMAIL`: recipient address for contact submissions
- `CONTACT_FROM_EMAIL`: verified sender used when sending contact emails

## Contact Form

The contact form is implemented with a Next.js route handler at `src/app/api/contact/route.ts`.

It includes:

- Zod-based request validation
- honeypot spam prevention
- basic IP-based rate limiting
- Resend email delivery

If email configuration is missing, the route returns a controlled configuration error instead of attempting to send.

## Content Management

Most portfolio content is maintained in `src/components/portfolio/data.ts`, including:

- hero copy
- navigation labels
- identity tabs
- expertise modules
- capabilities
- project entries
- work history

Primary layout, animation, and responsive behavior are implemented in `src/components/portfolio/portfolio-shell.tsx`.

## SEO and Icons

SEO metadata is configured in `src/app/layout.tsx`.

App icons are generated through:

- `src/app/icon.tsx`
- `src/app/apple-icon.tsx`

For production deployment, set `NEXT_PUBLIC_SITE_URL` so canonical URLs and social preview metadata resolve correctly.

## Notes

- The contact rate limiter uses in-memory storage and is reset when the server restarts.
- This repository is designed as a portfolio application, not a reusable component library.
- For production email delivery, ensure the sender configured in `CONTACT_FROM_EMAIL` is verified in Resend.
