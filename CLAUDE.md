# CLAUDE.md

This file provides guidance to Claude Code when working with this codebase.

## Project Overview

This is a SvelteKit conference schedule app for PHP UK Conference. It displays talks, speakers, sponsors, and schedule information.

**Tech Stack**: SvelteKit 2, Svelte 5, TypeScript, Vite 6

## Common Commands

```bash
# Start development server
npm run dev

# Build for production (static site)
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `src/routes/` - SvelteKit pages (schedule, speakers, sponsors)
- `src/lib/components/` - Reusable Svelte components
- `src/lib/data/` - JSON data files for talks, speakers, sponsors
- `src/lib/styles/` - Global CSS and theme variables
- `static/` - Static assets (logos, mascot)

## Code Style

- Follow Svelte 5 conventions (use `$state`, `$derived`, `$effect` runes)
- Use TypeScript for type safety
- Keep components small and focused
- Use meaningful variable and function names

## Brand Colors

- Primary: `#4F5B93` (PHP blue)
- Primary Dark: `#3D4875`
- Primary Light: `#6B78B0`
- Dark Mode Primary: `#7B87C6`
