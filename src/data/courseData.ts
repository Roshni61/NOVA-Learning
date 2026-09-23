export interface CourseLesson {
  id: string;
  title: string;
  duration: string; // e.g. "9m 27s"
  videoUrl?: string;
  completed?: boolean;
  missionId?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  duration: string; // e.g. "1h 10m"
  lessons: CourseLesson[];
}

export interface DetailedCourse {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  instructor: string;
  instructorRole?: string;
  instructorAvatar?: string;
  duration: string; // e.g. "16h 55m"
  totalModules: number;
  totalLessons: number;
  rating: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  access: string; // e.g. "Free"
  language: string; // e.g. "English (EN)"
  thumbnail: string;
  accentColor?: string;
  modules: CourseModule[];
}

export const DETAILED_COURSES: Record<string, DetailedCourse> = {
  c_101: {
    id: 'c_101',
    title: 'Modern UI/UX Design Systems',
    description: 'Master atomic design principles, dynamic typography scale, design tokens, and WCAG AA accessibility.',
    longDescription:
      'An in-depth guide to help you master modern UI/UX design systems. Learn how to transform raw user research and wireframes into enterprise-grade design systems. Covers tokenized dynamic themes, responsive spacing grids, atomic component architecture, dark mode accessibility, and fluid CSS variable setups.',
    category: 'UI/UX & Design',
    instructor: 'Elena Vance',
    instructorRole: 'Principal Design System Architect',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    duration: '14h 20m',
    totalModules: 4,
    totalLessons: 16,
    rating: 4.9,
    level: 'Intermediate',
    access: 'Free',
    language: 'English (EN)',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
    accentColor: '#F43F5E',
    modules: [
      {
        id: 'mod_101_1',
        title: 'Design Tokens & Foundations',
        description: 'Establishing scalable design primitives, tokenized color palettes, and typographic hierarchies.',
        duration: '3h 15m',
        lessons: [
          {
            id: 'les_101_1_1',
            title: 'Intro to Tokenized Design Primitives',
            duration: '8m 45s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            completed: true,
          },
          {
            id: 'les_101_1_2',
            title: 'Constructing Harmonious HSL Color Scales',
            duration: '12m 10s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
          {
            id: 'les_101_1_3',
            title: 'Fluid Typography & Spacing Systems',
            duration: '14m 30s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
          {
            id: 'les_101_1_4',
            title: 'CSS Custom Properties & Theme Synchronization',
            duration: '15m 20s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          },
        ],
      },
      {
        id: 'mod_101_2',
        title: 'Component Architecture & Atomic Design',
        description: 'Building modular, reusable React components guided by Atomic Design guidelines.',
        duration: '3h 45m',
        lessons: [
          {
            id: 'les_101_2_1',
            title: 'Atomic Design Hierarchy (Atoms to Organisms)',
            duration: '10m 15s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          },
          {
            id: 'les_101_2_2',
            title: 'Designing Accessible Button & Touch Target Components',
            duration: '14m 50s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          },
          {
            id: 'les_101_2_3',
            title: 'Input Fields, Validation States & Form Patterns',
            duration: '18m 00s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          },
          {
            id: 'les_101_2_4',
            title: 'Card Layouts & Dynamic Content Containers',
            duration: '16m 25s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          },
        ],
      },
      {
        id: 'mod_101_3',
        title: 'Micro-Animations & Motion Design',
        description: 'Enhancing visual feedback with spring physics, layout animations, and fluid transitions.',
        duration: '3h 30m',
        lessons: [
          {
            id: 'les_101_3_1',
            title: 'Principles of Functional UI Animations',
            duration: '9m 20s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreet.mp4',
          },
          {
            id: 'les_101_3_2',
            title: 'Framer Motion Spring Physics & Damping',
            duration: '13m 40s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          },
          {
            id: 'les_101_3_3',
            title: 'Shared Layout Animations & Modal Transitions',
            duration: '16m 15s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
          },
          {
            id: 'les_101_3_4',
            title: 'Gesture Handlers & Swipe Actions',
            duration: '11m 30s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
          },
        ],
      },
      {
        id: 'mod_101_4',
        title: 'Accessibility (WCAG 2.1) & System Auditing',
        description: 'Rigorous accessibility verification, screen reader testing, and automated linting.',
        duration: '3h 50m',
        lessons: [
          {
            id: 'les_101_4_1',
            title: 'WCAG 2.1 Contrast Ratios & Visual Perception',
            duration: '11m 05s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          {
            id: 'les_101_4_2',
            title: 'Keyboard Navigation & Focus Ring Traps',
            duration: '15m 30s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
          {
            id: 'les_101_4_3',
            title: 'ARIA Roles, Live Regions & Screen Reader Traversal',
            duration: '17m 40s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
          {
            id: 'les_101_4_4',
            title: 'Automated Axe Audits & CI Integration',
            duration: '12m 15s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          },
        ],
      },
    ],
  },

  c_102: {
    id: 'c_102',
    title: 'Advanced React & TypeScript Architecture',
    description: 'Deep dive into concurrent rendering, state machine patterns, dynamic imports, and memory optimization.',
    longDescription:
      'An in-depth guide to help you master React 19 and TypeScript design patterns. Dive deep into concurrent rendering, fiber reconciler internals, custom state machines, type-safe APIs, dynamic code splitting, memory leak auditing, and scalable front-end state management.',
    category: 'Web Architecture',
    instructor: 'Marcus Chen',
    instructorRole: 'Principal Software Architect',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    duration: '16h 55m',
    totalModules: 4,
    totalLessons: 15,
    rating: 4.95,
    level: 'Advanced',
    access: 'Free',
    language: 'English (EN)',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    accentColor: '#8B5CF6',
    modules: [
      {
        id: 'mod_102_1',
        title: 'Advanced TypeScript Patterns',
        description: 'Conditional types, mapped types, template literal types, and complex type guards.',
        duration: '4h 10m',
        lessons: [
          {
            id: 'les_102_1_1',
            title: 'Generics, Invariance & Covariance Deep Dive',
            duration: '14m 20s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            completed: true,
            missionId: 'matrix-calculus-gradient-descent',
          },
          {
            id: 'les_102_1_2',
            title: 'Template Literal Types & Type-Safe Event Emitters',
            duration: '18m 45s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
          {
            id: 'les_102_1_3',
            title: 'Conditional Types & Infer Keyword Magic',
            duration: '16m 10s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
          {
            id: 'les_102_1_4',
            title: 'Custom Type Guards & Discriminated Unions',
            duration: '13m 50s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          },
        ],
      },
      {
        id: 'mod_102_2',
        title: 'React Core Engine & Custom Hooks',
        description: 'React Fiber reconciler, Concurrent features, useTransition, and custom hook lifecycle.',
        duration: '4h 15m',
        lessons: [
          {
            id: 'les_102_2_1',
            title: 'React Fiber Reconciler & Scheduling Pipeline',
            duration: '19m 30s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          },
          {
            id: 'les_102_2_2',
            title: 'Mastering useTransition & useDeferredValue',
            duration: '15m 40s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          },
          {
            id: 'les_102_2_3',
            title: 'Custom Hook Abstractions & Memory Management',
            duration: '17m 15s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          },
          {
            id: 'les_102_2_4',
            title: 'Refs, Imperative Handles & DOM Mutations',
            duration: '12m 20s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          },
        ],
      },
      {
        id: 'mod_102_3',
        title: 'Scalable State Management & Context',
        description: 'Context slicing, atomic state stores, and persistence middleware.',
        duration: '3h 50m',
        lessons: [
          {
            id: 'les_102_3_1',
            title: 'Preventing Context Re-render Cascades',
            duration: '16m 00s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreet.mp4',
          },
          {
            id: 'les_102_3_2',
            title: 'Atomic State Engine vs Global Reducers',
            duration: '18m 30s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          },
          {
            id: 'les_102_3_3',
            title: 'Robust LocalStorage Persistence & Sync Hooks',
            duration: '14m 10s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
          },
        ],
      },
      {
        id: 'mod_102_4',
        title: 'Production Resilience & Testing',
        description: 'Error Boundaries, fallback UI, code splitting, dynamic imports, and memory profiling.',
        duration: '4h 40m',
        lessons: [
          {
            id: 'les_102_4_1',
            title: 'Designing Resilient Error Boundary Fallbacks',
            duration: '15m 50s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
          },
          {
            id: 'les_102_4_2',
            title: 'Bundle Splitting & Lazy Route Loading',
            duration: '17m 45s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          {
            id: 'les_102_4_3',
            title: 'Memory Leak Auditing with Chrome DevTools',
            duration: '21m 10s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
          {
            id: 'les_102_4_4',
            title: 'Integration Testing React Component Trees',
            duration: '18m 05s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
        ],
      },
    ],
  },

  c_103: {
    id: 'c_103',
    title: 'AI Engineering & LLM Integration',
    description: 'Build RAG pipelines, vector embedding indexing, tool calling agents, and production guardrails.',
    longDescription:
      'An in-depth guide to help you master AI engineering and production LLM integration. Learn how to design robust Retrieval-Augmented Generation (RAG) pipelines, construct vector database indexes, orchestrate autonomous tool-calling agents, enforce safety guardrails, and evaluate LLM responses.',
    category: 'AI / Machine Learning',
    instructor: 'Dr. Sarah Connor',
    instructorRole: 'Lead AI Research Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    duration: '18h 40m',
    totalModules: 4,
    totalLessons: 16,
    rating: 4.98,
    level: 'Advanced',
    access: 'Free',
    language: 'English (EN)',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    accentColor: '#10B981',
    modules: [
      {
        id: 'mod_103_1',
        title: 'Prompt Engineering & Vector Embeddings',
        description: 'System prompts, zero-shot/few-shot techniques, embedding models, and distance metrics.',
        duration: '4h 30m',
        lessons: [
          {
            id: 'les_103_1_1',
            title: 'System Prompt Crafting & Constraint Enforcement',
            duration: '12m 40s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            completed: true,
            missionId: 'rag',
          },
          {
            id: 'les_103_1_2',
            title: 'High-Dimensional Vector Embeddings & Math Primitives',
            duration: '18m 15s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
          {
            id: 'les_103_1_3',
            title: 'Cosine Similarity vs Euclidean & Dot Product Metrics',
            duration: '15m 50s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
          {
            id: 'les_103_1_4',
            title: 'Vector Database Indexing (HNSW & IVF)',
            duration: '21m 00s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          },
        ],
      },
      {
        id: 'mod_103_2',
        title: 'Retrieval-Augmented Generation (RAG)',
        description: 'Document chunking strategies, hybrid search, re-ranking, and context compression.',
        duration: '4h 50m',
        lessons: [
          {
            id: 'les_103_2_1',
            title: 'Semantic Document Chunking & Overlap Windows',
            duration: '16m 30s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          },
          {
            id: 'les_103_2_2',
            title: 'Hybrid BM25 + Vector Search Pipelines',
            duration: '20m 15s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          },
          {
            id: 'les_103_2_3',
            title: 'Cross-Encoder Re-Ranking & Context Compression',
            duration: '19m 40s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          },
          {
            id: 'les_103_2_4',
            title: 'Mitigating Context Window Lost-In-The-Middle Syndrome',
            duration: '14m 25s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          },
        ],
      },
      {
        id: 'mod_103_3',
        title: 'Agentic Workflows & Tool Calling',
        description: 'Tool schema definition, execution loop state machines, and structured output parsing.',
        duration: '4h 40m',
        lessons: [
          {
            id: 'les_103_3_1',
            title: 'JSON Schema Definitions for Function Calling',
            duration: '15m 10s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreet.mp4',
          },
          {
            id: 'les_103_3_2',
            title: 'ReAct Agent Loops & Tool Execution Drivers',
            duration: '22m 30s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          },
          {
            id: 'les_103_3_3',
            title: 'Error Recovery & Fallback Tool Delegation',
            duration: '17m 45s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
          },
          {
            id: 'les_103_3_4',
            title: 'Structured Output Validation with Zod & Pydantic',
            duration: '16m 20s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
          },
        ],
      },
      {
        id: 'mod_103_4',
        title: 'Production LLM Evaluation & Guardrails',
        description: 'Hallucination scoring, streaming token response handling, and moderation APIs.',
        duration: '4h 40m',
        lessons: [
          {
            id: 'les_103_4_1',
            title: 'Hallucination Detection & Faithfulness Metrics',
            duration: '18m 10s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          {
            id: 'les_103_4_2',
            title: 'Server-Sent Events (SSE) & Token Streaming UI',
            duration: '16m 50s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
          {
            id: 'les_103_4_3',
            title: 'Input Prompt Injection Safeguards & Moderation',
            duration: '19m 15s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
          {
            id: 'les_103_4_4',
            title: 'Cost Tracking, Token Budgeting & Caching Strategies',
            duration: '15m 05s',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          },
        ],
      },
    ],
  },
};

export const getDetailedCourse = (courseId: string): DetailedCourse | undefined => {
  return DETAILED_COURSES[courseId];
};
