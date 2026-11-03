# Kostas Vasilopoulos - Personal Website

A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- 🎨 Modern and clean UI
- ⚡ Fast and optimized performance
- 🎯 Interactive skill graphs
- 🔄 Smooth animations
- 📊 Professional project showcase
- 📝 Detailed experience timeline

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- next-themes

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/kvasilopoulos/kvasilopoulos.com.git
   cd personal-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                # Next.js app directory
│   ├── about/         # About page
│   ├── contact/       # Contact page
│   ├── experience/    # Experience page
│   ├── projects/      # Projects page
│   ├── skills/        # Skills page
│   └── page.tsx       # Home page
├── components/        # Reusable components
└── styles/           # Global styles
```

## Customization

1. Update personal information in respective page components
2. Modify theme colors in `tailwind.config.ts`
3. Add/modify animations in page components
4. Update social links in the Contact page
5. Add your own projects in the Projects page

## Building for Production

```bash
npm run build
```

This creates a static export in the `out/` directory (`output: 'export'` in `next.config.js`; the site uses no server features).

## Deployment

The site is deployed on Cloudflare Workers as static assets (`wrangler.jsonc`, serving `out/`). Every push to `main` is built and deployed by Cloudflare Workers Builds (`npm run build`, then `npx wrangler deploy`). To deploy by hand: `npm run build && npx wrangler deploy`.

## License

MIT License - feel free to use this template for your own personal website! 