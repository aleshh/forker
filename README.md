# Forker

Really just a duplicate of the [Pitchfork latest album reviews page](https://pitchfork.com/reviews/albums/), and in fact the links point to their reviews. The benefit is that this shows the reviews on list view.

## Features

- Copy button copies artist and title to clipboard for searching in music player
- Open button attempts to open the SongWhip page for the album. As SongWhip's URIs are unpredictable, this does not work consistently.
- Artist name links directly to Pitchfork artist page.
- When returning to an open tab on a subsequent day, we attempt to detect this and automatically re-load results.

## Roadmap

- Filtering by rating and genre
- Clicking artist name returns that artist's reviews inside the app
- Server-side functionality to more consistently open albums in Spotify or other
- Maybe an I'm feeling lucky feature to show a random album based on filter criteria

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Build

```bash
npm run build
```

[https://nextjs.org/docs/pages/building-your-application/deploying/static-exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
