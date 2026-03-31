# Login Critter Demo - Advanced Animation Experience

An advanced login interaction demo built with **Next.js 14** and **Framer Motion**. Inspired by CareerCompass, this project features fluid, physics-based character animations that react to user inputs in real-time.

[简体中文 README](./README.md)

## ✨ Core Features

- **Physics-based Skewing**:
  - Characters use `skewX` transformations with `transform-origin: center bottom` to simulate an organic, "growing from the ground" swaying motion.
  - Skew angles dynamically adjust based on input focus and text length.

- **Dynamic Height Stretching**:
  - While typing in the Email field, characters' heights stretch vertically as the character count increases, creating a "curious peering" effect.

- **Individual Eyelid System**:
  - Each character features its own eyelid layer inside the eye sockets, eliminating previous "disappearing eyes" layering bugs.
  - **Privacy Mode**: When "Show Password" is toggled, characters blink closed and look to the LEFT to respect user privacy.
  - **Peeking Cycle**: In hidden password mode, the purple character periodically half-opens its eyelids (40%) to "sneak a peek" at the input.

- **Global Random Blinking**:
  - Characters blink their eyes randomly every 3-7 seconds, making the interface feel alive and breathing.

- **Precise Pupil Clamping**:
  - Pupils track the mouse cursor in real-time with built-in physical collision logic (clamping) to ensure they never "fall out" of the eye sockets.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: Inter, Google Fonts

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd login-critter-demo
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to preview.

## 📝 Interaction Guide

1. **Email Input**: Watch how the leftmost character "grows" taller and leans forward as you type longer addresses.
2. **Password Input**: Characters feel shy and close their eyelids; the big purple guy will peek at you occasionally.
3. **Toggle Password**: Click the eye icon; critters quickly shrink back and look away to the left, simulating a "looking away for privacy" behavioral logic.
4. **Natural Idle**: Even when idle, the critters will blink their eyes naturally.

---
