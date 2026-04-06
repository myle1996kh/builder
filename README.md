# Human-Centered Builder Landing Page

A modern, production-ready landing page built with **Swiss International Design System** (International Typographic Style). This project showcases a builder's portfolio with a focus on small, functional modules that solve real-world friction points.

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Table of Contents

- [Overview](#overview)
- [Design System](#design-system)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Internationalization](#internationalization)
- [Components](#components)
- [Customization](#customization)
- [Deployment](#deployment)

---

## Overview

**Human-Centered Builder** is a landing page for a service that transforms messy, real-world workflows into clean, automated modules. The project emphasizes:

- **Small > Big**: Building small, perfectly functioning modules instead of giant unfinished products
- **Action > Vision**: Prioritizing working 7-day launches over months-long blueprints
- **Accessibility**: Making sophisticated problem-solving accessible to anyone

### The 7-Day Protocol

The service operates on a high-velocity, high-focus model:
- **3 Slots Per Month**: Limited availability for deep focus
- **7-Day Launch**: From friction to functional module in one week
- **Modular Growth**: Each project adds to a library of reusable components

---

## Design System

This project implements the **Swiss International Style** (International Typographic Style), born in 1950s Switzerland, emphasizing objectivity, mathematical precision, and logical structure.

### Core Design Principles

| Principle | Description |
|-----------|-------------|
| **Objectivity** | Design recedes to let content speak. Every visual decision is justifiable. |
| **The Grid** | The grid is law. Asymmetrical organization creates dynamic visual rhythm. |
| **Typography** | Type is the primary structural element. Scale, weight, and position create hierarchy. |
| **Active Negative Space** | White space is an active structural element, not empty space. |
| **Flatness** | No shadows or 3D effects. Depth comes from pattern, not shadow. |

### Color Palette

```
┌─────────────────┬───────────┬─────────────────────────────────┐
│ Token           │ Value     │ Usage                           │
├─────────────────┼───────────┼─────────────────────────────────┤
│ Background      │ #FFFFFF   │ Primary canvas (pure white)     │
│ Foreground      │ #000000   │ Text (pure black)               │
│ Muted           │ #F2F2F2   │ Secondary backgrounds           │
│ Accent          │ #FF3000   │ CTAs, emphasis (Swiss Red)      │
│ Border          │ #000000   │ Visible structure               │
└─────────────────┴───────────┴─────────────────────────────────┘
```

### Typography

- **Font Family**: Inter (Google Font) - closest to Helvetica/Akzidenz-Grotesk
- **Weights**: Black (900) for headings, Regular (400) for body
- **Style**: UPPERCASE for all headings and labels
- **Tracking**: `tracking-tighter` for headlines, `tracking-widest` for labels
- **Scale**: Extreme contrast (text-5xl to text-8xl for headlines)

### Pattern Textures

The design uses CSS-based patterns for visual depth without shadows:

| Pattern | Class | Description |
|---------|-------|-------------|
| Grid | `.swiss-grid-pattern` | 24×24px grid lines at 3% opacity |
| Dots | `.swiss-dots` | Dot matrix, 16×16px spacing |
| Diagonal | `.swiss-diagonal` | 45° repeating lines |
| Noise | `.swiss-noise` | Paper grain texture overlay |

### Component Styling

#### Buttons
```css
/* Primary: Black background, white text */
.swiss-btn {
  background: #000000;
  color: #FFFFFF;
  border: 2px solid #000000;
  border-radius: 0px;  /* Strictly rectangular */
  text-transform: uppercase;
}

.swiss-btn:hover {
  background: #FF3000;  /* Swiss Red on hover */
}
```

#### Cards
```css
/* Cards with color inversion on hover */
.swiss-card {
  background: #FFFFFF;
  border: 2px solid #000000;
}

.swiss-card:hover {
  background: #FF3000;
  border-color: #FF3000;
}

/* Icon container becomes white on hover */
.swiss-card:hover .swiss-card-icon {
  background: #FFFFFF;
}

.swiss-card:hover .swiss-card-icon svg {
  color: #000000;  /* Black icon on white background */
}
```

### Animations

All animations are instant, mechanical, and purposeful:

| Animation | Timing | Description |
|-----------|--------|-------------|
| Nav Link Slide | 150ms ease-out | Vertical slide with red color |
| Card Hover | 150ms ease-out | Full color inversion (white → red) |
| Icon Rotation | 150ms ease-out | Plus icons rotate 90° |
| Scale | 150ms ease-out | Stats scale 1.0 → 1.05 |

---

## Features

- ✅ **Swiss International Design** - Bold, architectural aesthetic
- ✅ **Bilingual Support** - English and Vietnamese (Tiếng Việt)
- ✅ **Contact Form** - With database storage
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Accessible** - High contrast, proper semantics
- ✅ **Pattern Textures** - Grid, dots, diagonal, noise
- ✅ **Micro-interactions** - Hover states with color inversions
- ✅ **Numbered Sections** - 01., 02., 03., etc.
- ✅ **Geometric Compositions** - Bauhaus-style hero elements

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui |
| **Database** | SQLite (Prisma ORM) |
| **Icons** | Lucide React |
| **Fonts** | Geist Sans, Geist Mono |

---

## Project Structure

```
my-project/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── logo.svg               # Favicon/logo
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts   # Contact form API
│   │   ├── globals.css        # Global styles + Swiss design system
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main landing page
│   ├── components/
│   │   ├── contact-form.tsx   # Contact form component
│   │   └── ui/                # shadcn/ui components
│   ├── contexts/
│   │   └── language-context.tsx  # i18n context
│   ├── hooks/
│   │   ├── use-mobile.ts      # Mobile detection
│   │   └── use-toast.ts       # Toast notifications
│   └── lib/
│       ├── db.ts              # Prisma client
│       └── utils.ts           # Utility functions
├── db/
│   └── custom.db              # SQLite database
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm

### Installation

```bash
# Install dependencies
bun install

# Set up database
bun run db:push

# Start development server
bun run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with Turbopack |
| `bun run build` | Build for production |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:studio` | Open Prisma Studio |

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./db/custom.db"
```

### Theme Configuration

The design tokens are defined in `src/app/globals.css`:

```css
:root {
  --background: #FFFFFF;
  --foreground: #000000;
  --muted: #F2F2F2;
  --accent: #FF3000;
  --border: #000000;
  --radius: 0px;  /* Strictly rectangular */
}
```

---

## API Reference

### Contact Form

#### `POST /api/contact`

Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "friction": "I spend 3 hours daily on manual data entry..."
}
```

**Response:**
```json
{
  "success": true
}
```

#### `GET /api/contact`

Retrieve all contact submissions.

**Response:**
```json
[
  {
    "id": "clx123abc",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I spend 3 hours daily...",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## Database Schema

### Contact Model

```prisma
model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}
```

---

## Internationalization

The project supports **English** and **Vietnamese** (Tiếng Việt).

### Language Context

Located in `src/contexts/language-context.tsx`:

```tsx
import { useLanguage } from '@/contexts/language-context'

function MyComponent() {
  const { t, language, setLanguage } = useLanguage()
  
  return (
    <div>
      <h1>{t('hero.title1')}</h1>
      <button onClick={() => setLanguage('vi')}>Tiếng Việt</button>
    </div>
  )
}
```

### Adding New Translations

Edit `src/contexts/language-context.tsx`:

```tsx
const translations = {
  en: {
    'new.key': 'English text',
  },
  vi: {
    'new.key': 'Văn bản tiếng Việt',
  }
}
```

### Translation Keys Reference

| Key | English | Vietnamese |
|-----|---------|------------|
| `hero.badge` | Human-Centered Builder | Người Xây Dựng Hướng Con Người |
| `hero.title1` | Small Modules. | Module Nhỏ. |
| `hero.title2` | Real Solutions. | Giải Pháp Thực Tế. |
| `nav.about` | About | Giới thiệu |
| `nav.purpose` | Purpose | Mục đích |
| `nav.protocol` | Protocol | Quy trình |
| `nav.contact` | Contact | Liên hệ |
| `form.submit` | Send Message | Gửi Tin Nhắn |

---

## Components

### ContactForm

A form component with validation and database integration.

```tsx
import { ContactForm } from '@/components/contact-form'

<ContactForm onSuccess={() => console.log('Submitted!')} />
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `onSuccess` | `() => void` | Callback on successful submission |

### Swiss Pattern Classes

Apply pattern textures to any element:

```tsx
// Grid pattern
<div className="swiss-grid-pattern">...</div>

// Dot matrix
<div className="swiss-dots">...</div>

// Diagonal lines
<div className="swiss-diagonal">...</div>

// Noise texture
<div className="swiss-noise">...</div>
```

### Swiss Card Styling

Cards with hover effects:

```tsx
<Card className="swiss-card rounded-none border-2 border-black">
  <CardContent className="p-6">
    <div className="swiss-card-icon w-12 h-12 border-2 border-black flex items-center justify-center bg-muted">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="swiss-card-title font-bold uppercase tracking-wider">
      Title
    </h3>
    <p className="swiss-card-desc text-muted-foreground">
      Description
    </p>
  </CardContent>
</Card>
```

---

## Customization

### Changing the Accent Color

Update `globals.css`:

```css
:root {
  --accent: #FF3000;  /* Change to your color */
}
```

Also update the hardcoded values:
- `.swiss-btn:hover { background: #FF3000; }`
- `.swiss-card:hover { background: #FF3000; }`
- `.swiss-section-number { color: #FF3000; }`

### Adding New Sections

Follow the numbered section pattern:

```tsx
{/* Section Header */}
<div className="flex items-center gap-4 mb-12 lg:mb-16">
  <span className="swiss-section-number">06.</span>
  <div className="h-[2px] flex-1 bg-black"></div>
</div>
```

### Modifying Typography Scale

Adjust in `page.tsx`:

```tsx
// Hero headlines
<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter">

// Section titles
<h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter">

// Card titles
<h3 className="swiss-card-title font-bold uppercase tracking-wider text-sm">
```

---

## Deployment

### Build for Production

```bash
bun run build
```

### Deployment Platforms

Compatible with:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Docker**

### Docker Deployment

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run db:push
RUN bun run build
EXPOSE 3000
CMD ["bun", "start"]
```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| IE | ❌ Not supported |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Swiss International Style** - Design philosophy inspired by Josef Müller-Brockmann, Armin Hofmann, and Karl Gerstner
- **shadcn/ui** - Beautiful, accessible UI components
- **Inter Font** - Rasmus Andersson for the beautiful typeface
- **Lucide** - Beautiful open-source icons

---

<p align="center">
  <strong>Small modules. Real solutions. No fluff.</strong>
</p>
