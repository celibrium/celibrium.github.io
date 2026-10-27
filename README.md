# Charmaine Lee — Portfolio

A cinematic game-menu portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Development

```sh
npm install
npm run dev
```

Run `npm run build` for a type-checked production build, then `npm run preview` to preview it. Publish the generated `dist` directory through a GitHub Pages build workflow; the React source cannot be served directly by Pages.

## Customize

- Edit the chapter descriptions and placeholders in [src/content.ts](src/content.ts).
- Adjust typography, scenery, responsive layouts, and colors in [src/styles.css](src/styles.css).
- UI components and navigation live in [src/App.tsx](src/App.tsx).
- Availability is sample copy; update it before publishing.
- Resume and contact panels intentionally have no fabricated links or download buttons. Add your PDF and verified profile URLs when implementing those sections.

The background currently loads a photograph from Unsplash, and fonts load from Google Fonts. Replace these with locally hosted, licensed assets for fully offline operation and tighter asset control. CSS gradients provide a fallback if the photograph cannot load.

## Controls

Use Tab to reach all controls, arrow keys to select chapters, Home/End to select the first/last chapter, and Enter or Space to open the focused chapter. Escape returns to the main menu. Chapter URLs support browser back/forward and direct hash links. Sound is on by default and synthesized locally after the visitor's first interaction. Fullscreen is offered only where the browser supports it. Reduced-motion preferences disable ambient animation and parallax.

This first iteration includes the landing screen and draft section panels; full portfolio content remains to be added.
