# 🌌 NOVA — Continuous AI Learning Platform

> **Your Goal. Your Knowledge. Your Next Move.**  
> NOVA is a state-of-the-art, AI-native continuous learning platform designed to replace static video courses and rigid linear LMS paths with an adaptive, living **Learning Twin** and an isolated **Learning Brain Calculation Engine**.

---

## 🚀 Product Architecture & Telemetry Pipeline

NOVA continuously diagnoses concept gaps, evaluates retention decay risks, and constructs personalized daily execution cycles powered by real-time telemetry.

```
       [ Goal Setup & Baseline Diagnostic ]
                         │
                         ▼
        [ Knowledge Universe Graph (@xyflow/react) ]
                         │
                         ▼
     [ 5-Stage Loop: Learn ➔ Practice ➔ Apply ➔ Prove ]
                         │
                         ▼
   [ Isolated Learning Brain Engine & Memory Telemetry ]
                         │
                         ▼
   [ Context-Aware Gemini AI Tutor & Command Palette (⌘K) ]
```

---

## ✨ Key Features & Highlights

### 1. 🎓 Infosys Springboard-Style Course Detail View (`/course/:courseId`)
- **Responsive Two-Column Layout**:
  - **Main Syllabus Area (70% Width)**: Telemetry summary bar (`16h 55m • 4 Modules • 12 Lessons`), expandable module accordions, playable sub-lesson rows `[▶]`, and completion checkmark toggles.
  - **Embedded Video Viewport**: Responsive 16:9 YouTube video player iframe (`https://www.youtube.com/embed/${videoId}`) auto-scrolling into view on selection.
  - **Sticky Right Sidebar (30% Width)**: Prominent **"Start Course" / "Resume Course"** action button and **"At a Glance"** metadata panel (Type, Duration, Level, Access, Instructor, Language, Category).

### 2. 🧠 Isolated Learning Brain Calculation Engine (`learningBrainEngine.ts`)
- **Exponential Moving Average (EMA) Mastery**:
  $$\text{NewScore} = \text{clamp}\left(0, 100, \text{round}(\text{PrevScore} \times 0.7 + (\text{Accuracy} \times 100) \times 0.3)\right)$$
- **Retention Decay Risk Evaluator**: Calculates `low`, `medium`, or `high` retention decay risks based on days elapsed since last practice and current mastery score thresholds.
- **LearnerBrainContext (`LearnerBrainProvider`)**: Safe `localStorage` hydration (`nova_learning_brain_v1`), event logging engine (`recordEvent`), and active misconception clearance.

### 3. 🎨 Creative "Motion AI" Profile Overhaul (`/profile`)
- **AI Mindscape Hero**: HTML5 canvas neural particle network matrix background, floating code snippets, and a glowing, pulsing particle halo ring around the user avatar.
- **Motion Metrics Cards**: Four core metric cards with animated SVG sparkline charts and status-coded color themes.
- **Interactive Geometric SVG Radar Mesh**: Interactive spider-web radar chart displaying live skill telemetry with hoverable vertex nodes and skill breakdown bars.
- **Animated Achievement Micro-Animations**: Micro-illustrations featuring flickering flames (Continuous Learner), glowing shields (Gap Crusher), pulsing gems (Knowledge Titan), and rotating planets (Planet Explorer).
- **Active Knowledge Gap Recovery Mission**: 2-question interactive diagnostic drill on open addressing linear probing and load factor thresholding ($\alpha = N / K$) with idempotency guards and +50 XP reward.

### 4. ⌨️ Global Command Palette & Fuzzy Search (`⌘K`)
- **Keyboard Shortcut**: Triggered by `Cmd+K` / `Ctrl+K` anywhere in the application with Chromium `e.preventDefault()` omnibar prevention.
- **Instant Search**: Fuzzy search across Courses, Lessons, Missions, and Navigation shortcuts with full keyboard controls (`↑`, `↓`, `Enter`, `Esc`).

### 5. 🌌 Interactive Knowledge Universe & 5-Stage Execution Cycle
- **Spatial Graph Visualization**: Powered by `@xyflow/react` with dynamic node states (`Mastered`, `Developing`, `Needs Practice`, `Knowledge Gap`, `Locked`).
- **5-Stage Execution Loop**: Educational intuition visualizers, 10-question AI drill suite powered by Google Gemini API, live vectorized NumPy code workspace, and mastery verification.

### 6. 🛡️ Defensive Performance & Security Guards
- **Generative Fallback Gradients**: `bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900` container and SVG neural mesh `onError` fallback handling preventing black voids and CLS layout shifts.
- **Idempotency XP Protection**: XP rewards (`addXP`) are locked to prevent infinite XP farming on repeated lesson or quiz toggles.
- **Modal Accessibility**: Automatic body scroll lock (`overflow: hidden`) and Escape key listener on active modals.

---

## 🛠️ Tech Stack & Dependencies

- **Core**: React 19, TypeScript, Vite
- **Styling & Motion**: Tailwind CSS, Framer Motion, Custom Glassmorphism Tokens
- **Graph & Visualization**: `@xyflow/react` (React Flow), Lucide Icons
- **AI Intelligence**: Google Gemini API (`@google/genai` / REST)
- **Database & Storage**: Neon PostgreSQL Serverless DB & LocalStorage Persistence

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

### 4. Build & Verify Production Bundle
```bash
npm run build
npx vite preview --port 4173
```

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── common/         # CommandPalette (⌘K) & Shared Controls
│   ├── dashboard/      # Diagnostic Quiz & What-If Simulator Modals
│   ├── layout/         # AppLayout Navigation & Global Header
│   ├── lms/            # CourseCard & Curriculum Components
│   ├── profile/        # AIMindscapeHero, MotionMetricsCard, InteractiveRadar, HashMapRecoveryModal
│   ├── tutor/          # Floating AI Tutor Drawer & Orb
│   ├── universe/       # React Flow Concept Nodes & Inspector Drawer
│   └── ui/             # Reusable Primitives (Button, Card, Badge)
├── context/
│   ├── GoalContext.tsx         # Learning Twin Telemetry & XP State
│   └── LearnerBrainContext.tsx # Learning Brain Engine Context Provider
├── data/
│   ├── courseData.ts   # Detailed Course Datasets with YouTube Video IDs
│   └── universeData.ts # Knowledge Graph Concepts & Prerequisite Edges
├── hooks/
│   └── useCourseProgress.ts # Centralized Progress & Timestamp Hook
├── services/
│   └── learningBrainEngine.ts # Exponential Moving Average & Retention Calculation Engine
├── pages/
│   ├── Auth/           # LoginPage & Onboarding Flow
│   ├── Catalog/        # CatalogPage & CourseDetailPage (Springboard View)
│   ├── Dashboard/      # TodayPage, UniversePage, PathPage, TutorPage, ProfilePage, MissionWorkspacePage
│   └── Home/           # Landing Page with Particle Atmosphere
└── types/              # TypeScript Type Interfaces (learningBrain, Course, ConceptNode)
```

---

## 📄 License

© 2026 **NOVA Learning Inc.** All rights reserved. Built for Next-Generation AI-Native Learning.
