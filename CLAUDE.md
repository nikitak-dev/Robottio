# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Robottio** is a React-based web application featuring a cyberpunk/Matrix-inspired UI with periodic glitch effects. The app serves as an interface for task qualification, connecting users to specialized agents via a Telegram bot integration.

## Tech Stack

- **Framework**: React 19.2
- **Build Tool**: Vite (using rolldown-vite@7.2.5)
- **Language**: JavaScript (JSX)
- **Linting**: ESLint 9.39.1
- **Styling**: CSS (index.css)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture

### Component Structure

```
src/
├── App.jsx                    # Main app component with glitch orchestration
├── main.jsx                   # Application entry point
├── index.css                  # Global styles
└── components/
    ├── QualifierAgent.jsx     # Main UI: textarea & submit button
    ├── MatrixBackground.jsx   # Animated Matrix-style background
    └── AnimatedLogo.jsx       # Robottio logo with animations
```

### Key Architectural Patterns

**Glitch System**: The app implements a coordinated glitch effect across all components:
- Triggered randomly every 15-20 seconds
- Duration: 3-5 "jerks" × 1 second each
- Affects: logo, borders, text, and background simultaneously
- State managed centrally in `App.jsx` via `isGlitching` prop

**Component Coordination**:
- `App.jsx` manages global glitch state using refs and `useEffect`
- Components receive `isGlitching` prop to synchronize visual changes
- CSS classes (`glitching`, `border-glitching`, `glitching-text`) applied/removed dynamically

### QualifierAgent Component

The main interactive component with two modes:

**Normal Mode**:
- Description: "Опишите задачу, и я подберу нужного специалиста для ее выполнения."
- Placeholder: "Жду указаний..."
- Button: "Обработать" (inactive button)

**Glitch Mode**:
- Description: "СИСТЕМА::КРИТИЧЕСКАЯ ОШИБКА"
- Placeholder: Scrambled "Система неисправна" with random symbols
- Button: "ВТОРЖЕНИЕ" (active link to https://t.me/nikitak_army_bot)

**Important behaviors**:
- Placeholder scrambling pauses when textarea is focused
- Empty placeholder on focus, restored on blur
- Button becomes clickable Telegram link only during glitch

## Integration Points

**Telegram Bot**: During glitch mode, the submit button links to `https://t.me/nikitak_army_bot`

## Styling Notes

- Uses CSS classes for glitch animations (defined in `index.css`)
- Glitch effect classes: `.glitching`, `.border-glitching`, `.glitching-text`, `.glitch-text-effect`
- Component-specific styling embedded in respective components

## Development Guidelines

- Components use React Hooks (`useState`, `useEffect`, `useRef`)
- Glitch timing controlled via `setTimeout` with cleanup in `useEffect` return
- Text scrambling uses symbol set: `%:!@#$^&*()_+-=[]{}|;<>?`
- Focus management important for placeholder behavior

## n8n Integration Context

This project is part of a larger n8n automation workflow system. The Telegram bot integration likely triggers n8n workflows for task processing and agent assignment.

For n8n workflow development, use the MCP tools or CLI tool at `C:\Users\Nikita\Projects\_tools\assistant-cli.js`.
