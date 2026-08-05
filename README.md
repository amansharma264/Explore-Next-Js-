# 🎵 Music Academy - Master the Art of Music

A state-of-the-art, high-performance web application designed for a premier Music Academy, crafted using **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **Aceternity UI**.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Motion-v12.0-violet?style=for-the-badge&logo=framer&logoColor=white)

---

## 🌟 Executive Summary

This repository houses a production-grade web application built to showcase modern frontend architecture, dynamic routing, component-driven design system implementation, and advanced animation techniques. The application serves as an interactive platform for aspiring musicians to discover courses, explore course curricula, register for masterclasses, and contact academy admissions.

---

## 🛠️ Complete Tech Stack

| Category | Technology / Library | Description / Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Fullstack React framework with SSR, Static Generation, and File-system Routing |
| **UI Library** | **React 19** | Modern UI framework with Concurrent React, Server Components, and Actions |
| **Language** | **TypeScript 5** | End-to-end static type safety for props, datasets, and component states |
| **Styling** | **Tailwind CSS v4** | Utility-first CSS framework configured via modern `@theme` CSS directives |
| **Animations** | **Motion (Framer Motion v12)** | Physics-based spring animations, layout transitions, and scroll hooks |
| **Design System** | **Aceternity UI** | Custom interactive UI primitives (3D Cards, Spotlights, Canvas Waveforms, Sticky Scroll) |
| **Canvas Noise** | **Simplex Noise (`simplex-noise`)** | Procedural 3D noise generation for animated interactive HTML5 canvas wave backgrounds |
| **Utilities** | **`clsx` & `tailwind-merge`** | Conditional class name joining and conflict-free Tailwind utility merging (`cn`) |

---

## ✨ Feature Breakdown & Component Architecture

### 1. 🌌 Hero Section & 3D Interactive Graphics
- **Interactive 3D Particle Sphere**: Real-time 3D Fibonacci particle sphere mesh (`Hero3DCanvas.tsx`) featuring 3D coordinate rotation, perspective projections, mouse tilt interactivity, and dynamic neon connections.
- **Floating 3D Graphic Assets**: Floating 3D Music Note and 3D Headphones render graphics with smooth 3D perspective oscillations (`hero_3d_music_note.png`, `hero_3d_headphones.png`).
- **Spotlight Beam & Dual Neon Glows**: Vector spotlight lighting effect (`Spotlight.tsx`) paired with ambient teal and purple radial backdrop blurs.
- **Moving Border CTA**: Call-To-Action button with continuous gradient border animation calculated via SVG path length interpolations (`moving-border.tsx`).
- **Floating Hover Navbar**: Glassmorphism navbar fixed at top with animated hover dropdown menus (`navbar-menu.tsx`).

### 2. 🎸 Featured Courses & Dynamic Details
- **Animated Background Gradient**: Featured course cards wrapped in animated subtle gradient borders (`background-gradient.tsx`).
- **Dynamic Course Page (`/courses/[slug]`)**: Dedicated dynamic detail pages featuring course pricing, duration, skill level tags, interactive syllabus checklist, and direct enrollment links.

### 3. 🃏 All Courses Directory (`/courses`)
- **Interactive 3D Card Effects**: 3D perspective rotation on hover with depth-translated elements (`3d-card.tsx`).
- **Rich Course Cards**: Displays title, price badge, course thumbnail image, description, and direct detail links.

### 4. 📬 Admissions & Contact Center (`/contact` & `/api/contact`)
- **Next.js Server API Route (`app/api/contact/route.ts`)**: Server-side POST route handler processing inquiries, validating payload data, and executing email dispatching via Resend API to `officialamansharma264@gmail.com`.
- **Query Parameter Pre-selection**: Automatically pre-selects interested course when navigated from a course detail link (e.g. `/contact?course=guitar-fundamentals`).
- **Interactive Form**: Features Name, Email, Course dropdown, and Message input with async server request handling and error states.
- **Academy Details**: Direct contact information including Location (`Bangalore`) and Email (`officialamansharma264@gmail.com`).

### 5. 📜 Sticky Scroll "Why Choose Us"
- **Scroll-Driven Reveal**: Smooth scroll progress tracking using Framer Motion's `useScroll` and `useMotionValueEvent` (`sticky-scroll-reveal.tsx`).
- **Dynamic Backgrounds**: Smooth background color and gradient transitions as the user scrolls through key academy selling points (`WhyChooseUs.tsx`).

### 6. 💬 Success Stories & Testimonials
- **Infinite Moving Cards**: Smooth, continuous horizontal marquee scrolling of student testimonials with configurable direction and speed (`infinite-moving-cards.tsx`).

### 7. 👨‍🏫 Instructors & Canvas Waveform Showcase
- **Animated Wavy Background**: Real-time canvas particle wave animation using procedural 3D Simplex noise (`wavy-background.tsx`).
- **Animated Tooltips**: Hoverable instructor avatars with floating spring-animated name and title tooltips (`animated-tooltip.tsx`).

### 8. 📅 Featured Webinars
- **Card Hover Background Effect**: Grid of upcoming webinars with smooth layout animation highlighting the active card (`card-hover-effect.tsx`).

---

## 🗺️ Application Route Structure

| Route Path | Type | Component File | Description |
| :--- | :--- | :--- | :--- |
| `/` | Static | `app/page.tsx` | Main landing page assembling Hero, Featured Courses, Testimonials, Webinars, and Instructors |
| `/courses` | Static | `app/courses/page.tsx` | Complete course directory with 3D perspective cards |
| `/courses/[slug]` | Dynamic | `app/courses/[slug]/page.tsx` | Dynamic course detail page with syllabus, specs, and enrollment CTA |
| `/contact` | Static (Suspense) | `app/contact/page.tsx` | Interactive contact & enrollment application page |

---

## 📂 Repository Directory Tree

```text
explorenextjs/
├── app/
│   ├── contact/
│   │   └── page.tsx              # Interactive Contact Us & Course Enrollment page
│   ├── courses/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Dynamic course detail page (Syllabus, Specs, Price)
│   │   └── page.tsx              # All Courses listing page with 3D Cards
│   ├── favicon.ico
│   ├── globals.css               # Tailwind v4 imports, theme tokens & keyframe animations
│   ├── layout.tsx                # Root layout with custom OpenGraph metadata & Navbar
│   └── page.tsx                  # Landing Page assembling all major feature sections
├── src/
│   ├── components/
│   │   ├── FeaturedCourses.tsx   # Curated featured courses grid component
│   │   ├── Footer.tsx            # Global site footer with links and contact info
│   │   ├── Instructors.tsx       # Faculty section with Wavy Canvas background
│   │   ├── Navbar.tsx           # Fixed top floating navigation menu
│   │   ├── TestimonialCards.tsx  # Infinite scrolling student testimonial carousel
│   │   ├── UpcomingWebinar.tsx   # Webinars grid with hover cards effect
│   │   ├── WhyChooseUs.tsx       # Sticky scroll reveal section
│   │   └── ui/                   # Aceternity UI design system primitives
│   │       ├── 3d-card.tsx
│   │       ├── animated-tooltip.tsx
│   │       ├── background-gradient.tsx
│   │       ├── card-hover-effect.tsx
│   │       ├── HeroSection.tsx
│   │       ├── infinite-moving-cards.tsx
│   │       ├── moving-border.tsx
│   │       ├── navbar-menu.tsx
│   │       ├── Spotlight.tsx
│   │       ├── sticky-scroll-reveal.tsx
│   │       └── wavy-background.tsx
│   ├── data/
│   │   └── music_courses.json    # Centralized JSON dataset for courses and curricula
│   └── lib/
│       └── utils.ts              # Tailwind merge & clsx utility helper (`cn`)
├── public/                       # Static images, assets, and course thumbnails
│   └── courses/
├── package.json                  # Package dependencies & scripts
├── tsconfig.json                 # TypeScript strict mode configuration
└── README.md                     # Comprehensive project documentation
```

---

## 💾 Data Model Schema (`music_courses.json`)

```json
{
  "courses": [
    {
      "id": 1,
      "title": "Guitar Fundamentals",
      "slug": "guitar-fundamentals",
      "description": "Learn the basics of playing guitar with our comprehensive beginner's course.",
      "price": 99.99,
      "instructor": "John Doe",
      "isFeatured": true,
      "image": "/courses/guitar.jpg"
    }
  ]
}
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js 18.x or higher
- npm, pnpm, or yarn package manager

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amansharma264/Explore-Next-Js-.git
   cd Explore-Next-Js-
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Launch development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

4. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## ⚙️ Engineering & Architecture Best Practices

- **60 FPS Performance Optimizations**:
  - **IntersectionObserver Off-Screen Pause**: Canvas animation render loops (`Hero3DCanvas`, `WavyBackground`) automatically pause when scrolled out of view to eliminate CPU/GPU background drain.
  - **O(N) Particle Math Batching**: Fibonacci sphere particle math optimized to 65 nodes, reducing distance pair checks from 24,000+ to 1,770 per frame (14x performance boost).
  - **GPU Hardware Acceleration**: Replaced heavy CPU 2D context canvas filters with GPU hardware-accelerated CSS `backdrop-filter` and `transform: translateZ(0)`.
- **Zero Hydration Mismatches**: Clean separation of server and client directives (`'use client'`).
- **Type Safety**: Strict TypeScript interface declarations for props, datasets, and params.
- **Responsive & Accessible**: Mobile-first grid layouts, high contrast dark theme, semantic HTML structure.
- **Production Optimized Build**: Fully static prerendering for static pages (`/`, `/courses`, `/contact`) with dynamic SSR routes (`/courses/[slug]`).

---

## 📧 Contact Information

For inquiries, recruitment opportunities, or feedback:
- **Developer**: Aman Sharma
- **Email**: `officialamansharma264@gmail.com`
- **Location**: Bangalore, India
- **Repository**: [GitHub Repository](https://github.com/amansharma264/Explore-Next-Js-)