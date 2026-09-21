# 🌌 NOVA — Continuous AI Learning Platform

> **Your Goal. Your Knowledge. Your Next Move.**
> NOVA is a next-generation, AI-native continuous learning operating system designed to replace static video courses and rigid linear LMS paths with an adaptive, living **Learning Twin**.

---

## 🚀 Product Overview

NOVA continuously diagnoses concept gaps, predicts target completion timelines, and constructs personalized daily execution cycles based on real-time telemetry.

```
       [ Goal Setup & Baseline Diagnostic ]
                         │
                         ▼
        [ Knowledge Universe Graph (React Flow) ]
                         │
                         ▼
     [ 5-Stage Loop: Learn ➔ Practice ➔ Apply ➔ Prove ]
                         │
                         ▼
   [ Context-Aware Gemini AI Tutor & Learning Twin ]
```

---

## ✨ Key Features & Pillars

### 1. 🌌 Interactive Knowledge Universe
- **Spatial Graph Visualization**: Powered by `@xyflow/react` with custom node states (`Mastered`, `Developing`, `Needs Practice`, `Knowledge Gap`, `Locked`).
- **Dependency & Prerequisite Links**: Live animated edges indicating weak connections, prerequisites, and node mastery.
- **Concept Inspector Drawer**: Full detail panel with mastery trends, prerequisites, and instant *"Explain Concept"* modal.

### 2. ⚡ 5-Stage Execution Cycle (Learn → Practice → Apply → Prove)
- **Stage 1 (Learn)**: Educational intuition with interactive animated SVG visualizers:
  - *Neural Signal Flow* (`Input → Hidden Layer → Output`)
  - *Gradient Descent Curve* (Parabola with oscillating loss minimization point)
  - *Matrix Transformation Engine*
- **Stage 2 (Practice)**: Real-time **10-question AI drill suite** generated via Google Gemini 2.5 API with instant answer feedback and explanations.
- **Stage 3 (Apply)**: Live vectorized code execution workspace (e.g. NumPy Categorical Cross-Entropy Loss with test runner).
- **Stage 4 (Prove)**: Mastery baseline verification and Learning Twin model updates.

### 3. 🤖 Context-Aware AI Tutor
- **Animated AI Presence Orb**: Dynamic visual states for *Idle* (gentle breathing), *Thinking* (pulsing beacon), and *Generating* (flowing particles).
- **8 Interactive Tutor Modes**: *Teach Me*, *Debug My Code*, *Quiz Me*, *Explain My Mistake*, *Analyze Progress*, *Build Path*, *Quick Revision*, and *Interview Me*.

### 4. 📈 Learning Twin Telemetry & Profile
- Live telemetry tracking **Overall Mastery**, **Knowledge Retention Rate (94%)**, **Active Streak**, and **Consistency Score**.
- **Skill Domain Radar**: Animated proficiency indicators across Python, Algorithms, Deep Learning, System Design, and Math.
- **Learner Achievements**: Dynamic unlockable badges with milestone timestamps.

### 5. 🗺️ Adaptive Path & What-If Simulator
- Dynamic roadmap modules featuring AI-inserted recovery nodes when concept accuracy falls below threshold.
- Interactive schedule simulator allowing learners to test daily time commitments against target deadline months.

---

## 🛠️ Tech Stack & Libraries

- **Core**: React 18, TypeScript, Vite
- **Styling & Motion**: Tailwind CSS, Framer Motion, Custom Glassmorphism Tokens
- **Graph & Charts**: `@xyflow/react` (React Flow), Lucide Icons
- **AI Intelligence**: Google Gemini API (`@google/genai` / REST)
- **Backend & Database**: Neon PostgreSQL (Serverless DB) & Neon Auth

---

## 💻 Local Setup & Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Roshni61/NOVA-Learning.git
cd "NOVA Learning"
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build & Preview Production Bundle
```bash
npm run build
npx vite preview --port 4173
```

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── dashboard/       # Diagnostic Quiz & What-If Simulator Modals
│   ├── layout/          # Dashboard Layout & Sidebar Navigation
│   ├── tutor/          # Floating AI Tutor Drawer & Orb
│   ├── universe/       # React Flow Concept Nodes & Inspector Drawer
│   └── ui/             # Reusable UI Components (Button, Card, Badge)
├── context/
│   └── GoalContext.tsx  # Centralized Learning Twin Telemetry State
├── lib/
│   └── gemini.ts       # Gemini API Integration (10-Q Generation & Tutor)
├── pages/
│   ├── Auth/           # LoginPage & Onboarding Flow
│   ├── Dashboard/      # Today, Universe, Path, Tutor, Profile, Mission Workspace
│   └── Home/           # Landing Page with Floating Particle Atmosphere
├── types/              # TypeScript Interfaces (ConceptNode, Mission, Skill)
└── index.css           # Custom Glassmorphism, Glow Tokens & Keyframes
```

---

## 📄 License

© 2026 **NOVA Learning Inc.** All rights reserved. Built for Next-Generation AI-Native Learning.
