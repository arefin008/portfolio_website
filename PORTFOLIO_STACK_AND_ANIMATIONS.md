# Portfolio Stack And Animations

## Packages Used

### Runtime dependencies

- `next@16.2.2`
  Used as the application framework and App Router runtime.

- `react@19.2.4`
  Used to build the component tree and client-side UI behavior.

- `react-dom@19.2.4`
  Used for React rendering in the browser.

- `framer-motion@12.38.0`
  Used for section reveals, hover transitions, layout transitions, card motion, mobile menu animation, and the back-to-top button animation.

- `lenis@1.3.21`
  Used for smooth scrolling behavior across the portfolio page.

### Development dependencies

- `tailwindcss@^4`
  Used for utility-first styling.

- `@tailwindcss/postcss@^4`
  Used to connect Tailwind CSS with PostCSS.

- `typescript@^5`
  Used for static typing across the project.

- `eslint@^9`
  Used for linting and code quality checks.

- `eslint-config-next@16.2.2`
  Used for Next.js-specific lint rules.

- `@types/node@^20`
  Used for Node.js TypeScript types.

- `@types/react@^19`
  Used for React TypeScript types.

- `@types/react-dom@^19`
  Used for React DOM TypeScript types.

## Animations Used

### Global motion behavior

- Smooth scroll is handled by `Lenis`.
- Page progress is shown with a top progress line driven by Framer Motion `useScroll`.
- Reduced motion support is respected with `useReducedMotion`.

### Hero section

- Typewriter reveal for the main heading using a timed `useEffect`.
- Blinking caret animation via CSS keyframes.
- Floating blurred background orbs tied to scroll position with `useTransform`.
- Hero content fades up on entry.
- CTA buttons lift slightly on hover.

### Navigation

- Mobile menu opens and closes with animated height and opacity.
- Header stays fixed and layered above the page.

### Cursor effects

- Custom dot cursor follows pointer position.
- Outline cursor eases behind the dot and expands on interactive elements.

### Section reveal system

- Shared fade-up pattern for major sections.
- IntersectionObserver-based `.reveal` class for selected cards.
- Hover lift is used on interactive cards and buttons.

### Identity section

- Active tab background uses Framer Motion layout animation.
- Tab panel content swaps with `AnimatePresence`.
- Supporting point items fade in with staggered timing.

### Expertise, services, projects, protocol

- Cards animate upward into view.
- Hover states use small vertical lifts and light 3D tilt.
- Some decorative background glow elements use scroll-based parallax.

### Work history

- Rebuilt as a cleaner timeline with one card per role.
- Each timeline item fades upward into view with staggered delays.
- Bullet points reveal one by one with a short horizontal slide.
- Cards use a restrained hover lift to keep the section readable.

### Contact and footer controls

- Social icons animate on hover.
- Submit button scales slightly on interaction.
- Back-to-top button appears after scrolling down and animates in with opacity, translate, and scale.

## Files Where Animation Logic Lives

- `src/components/portfolio/portfolio-shell.tsx`
  Main Framer Motion and Lenis usage.

- `src/app/globals.css`
  CSS keyframes and non-JavaScript visual effects such as the caret blink and pulse.
