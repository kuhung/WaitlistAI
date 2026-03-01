# WaitlistAI

WaitlistAI is a satirical, gamified waitlist experience designed to poke fun at the modern tech startup landscape. It features a series of absurd verification steps, including quantum queues, AGI verification, and existential rejection reports.

## Features

- **Quantum Queue**: Experience the uncertainty of waiting in a superposition of states.
- **AGI Verification**: Prove your humanity (or lack thereof) through a series of increasingly bizarre CAPTCHAs.
- **Existential Rejection**: Receive detailed, data-driven explanations for why you aren't getting in.
- **Easter Eggs**: Discover hidden interactions and secrets (try the Konami code!).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is optimized for deployment on Vercel.

### Git Version Tracking

The application automatically includes Git version information in the footer to help track deployments. This is handled in `next.config.ts` via `execSync` commands during the build process.

Ensure your Vercel project has access to the `.git` directory during build, which is standard for Vercel deployments connected to a Git repository.

## License

MIT
