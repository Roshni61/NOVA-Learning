export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoId: string;
  summary?: string;
  missionId?: string;
}

export type CourseLesson = Lesson;

export interface Module {
  id: string;
  title: string;
  summary?: string;
  description?: string;
  lessons: Lesson[];
}

export type CourseModule = Module;

export interface DetailedCourse {
  id: string;
  title: string;
  headline: string;
  description: string;
  longDescription?: string;
  instructor: string;
  instructorRole: string;
  instructorAvatar?: string;
  duration: string;
  totalModules: number;
  totalLessons: number;
  rating?: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  access: 'Free' | 'Enrolled' | 'Premium';
  language: string;
  category: string;
  defaultVideoId: string;
  thumbnail?: string;
  accentColor?: string;
  modules: Module[];
}

export const detailedCourses: Record<string, DetailedCourse> = {
  c_101: {
    id: 'c_101',
    title: 'Modern UI/UX Design Systems',
    headline: 'Master component-driven design, tokens, and micro-interactions.',
    description:
      'An in-depth guide to help you master modern digital interface design. Learn to architect scalable design systems in Figma, structure design tokens, construct accessible micro-interactions, and build cohesive user experiences that seamlessly transition from concept to engineering.',
    instructor: 'Elena Vance',
    instructorRole: 'Principal Product Designer',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    duration: '14 hrs',
    totalModules: 4,
    totalLessons: 12,
    rating: 4.9,
    level: 'Intermediate',
    access: 'Free',
    language: 'English (EN)',
    category: 'UI/UX Design',
    defaultVideoId: 'c9Wg6Cb_YlU',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
    accentColor: '#F43F5E',
    modules: [
      {
        id: 'c101_m1',
        title: 'Design Systems Foundations & Tokens',
        summary: 'Atomic design philosophy, primitive scales, semantic colors, and design token naming architectures.',
        lessons: [
          {
            id: 'c101_m1_l1',
            title: 'Design System Architecture & Atomic Design',
            duration: '14m 20s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Understanding atoms, molecules, organisms, and enterprise system scales.',
          },
          {
            id: 'c101_m1_l2',
            title: 'Typography Hierarchies & Spacing Scales',
            duration: '18m 10s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Establishing mathematical fluid typography and 4px/8px modular layout grids.',
          },
          {
            id: 'c101_m1_l3',
            title: 'Color Palettes & Semantic Token Mapping',
            duration: '22m 15s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'WCAG AA accessible contrast ratios and light/dark theme token definitions.',
          },
        ],
      },
      {
        id: 'c101_m2',
        title: 'Component Architecture in Figma',
        summary: 'Deep dive into auto-layout rules, component properties, slots, and interactive variant matrices.',
        lessons: [
          {
            id: 'c101_m2_l1',
            title: 'Auto-Layout 5.0 & Responsive Containers',
            duration: '19m 40s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Building flex-like component wrappers with min/max bounds and truncation safety.',
          },
          {
            id: 'c101_m2_l2',
            title: 'Component Properties & Nested State Variants',
            duration: '25m 05s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Boolean flags, text properties, and instance swaps for enterprise components.',
          },
          {
            id: 'c101_m2_l3',
            title: 'Accessible Form Controls & Micro-States',
            duration: '21m 30s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Designing focus rings, error validations, disabled bounds, and active states.',
          },
        ],
      },
      {
        id: 'c101_m3',
        title: 'Micro-Interactions & Prototyping',
        summary: 'Interactive components, spring animations, timing curves, and state machines.',
        lessons: [
          {
            id: 'c101_m3_l1',
            title: 'Smart Animate & Physics-Based Transitions',
            duration: '16m 45s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Creating natural easing curves and realistic UI inertia.',
          },
          {
            id: 'c101_m3_l2',
            title: 'Interactive Accordions, Drawers & Sheets',
            duration: '23m 10s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Prototyping fluid off-canvas panels with gesture triggers.',
          },
          {
            id: 'c101_m3_l3',
            title: 'Usability Testing & Design Heuristic Audits',
            duration: '17m 50s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Running unmoderated user sessions and benchmarking task success metrics.',
          },
        ],
      },
      {
        id: 'c101_m4',
        title: 'Design-to-Code Handoff & Governance',
        summary: 'Connecting design tokens directly into Tailwind CSS and React component libraries.',
        lessons: [
          {
            id: 'c101_m4_l1',
            title: 'Exporting Tokens to JSON & CSS Variables',
            duration: '15m 30s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Bridging design decisions to automated code pipelines with Style Dictionary.',
          },
          {
            id: 'c101_m4_l2',
            title: 'Component Library Documentation in Storybook',
            duration: '20m 15s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Writing clean usage guides and visual regression testing suites.',
          },
          {
            id: 'c101_m4_l3',
            title: 'Version Control & System Release Cycles',
            duration: '14m 50s',
            videoId: 'c9Wg6Cb_YlU',
            summary: 'Managing breaking component updates across multiple product teams.',
          },
        ],
      },
    ],
  },
  c_102: {
    id: 'c_102',
    title: 'Advanced React & TypeScript Architecture',
    headline: 'Build enterprise-ready web applications with scalability in mind.',
    description:
      'A comprehensive engineering program designed for senior software developers. Master strict TypeScript configurations, custom hooks, performant rendering lifecycles, state machine architectures, and modular component design patterns.',
    instructor: 'Marcus Chen',
    instructorRole: 'Staff Frontend Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    duration: '20 hrs',
    totalModules: 4,
    totalLessons: 12,
    rating: 4.95,
    level: 'Advanced',
    access: 'Free',
    language: 'English (EN)',
    category: 'Web Architecture',
    defaultVideoId: '30LWjhZzg50',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    accentColor: '#8B5CF6',
    modules: [
      {
        id: 'c102_m1',
        title: 'Strict TypeScript Foundations in React',
        summary: 'Generic components, polymorphic props, discriminated unions, and mapped types.',
        lessons: [
          {
            id: 'c102_m1_l1',
            title: 'Setting Up Strict tsconfig & Project References',
            duration: '18m 45s',
            videoId: '30LWjhZzg50',
            summary: 'Enabling noImplicitAny, strictNullChecks, and incremental monorepo builds.',
            missionId: 'matrix-calculus-gradient-descent',
          },
          {
            id: 'c102_m1_l2',
            title: 'Discriminated Unions for UI State Modeling',
            duration: '22m 30s',
            videoId: '30LWjhZzg50',
            summary: 'Eliminating impossible states in async loaders and network requests.',
          },
          {
            id: 'c102_m1_l3',
            title: 'Polymorphic Components with "as" Props',
            duration: '26m 10s',
            videoId: '30LWjhZzg50',
            summary: 'Building flexible design system buttons and links with full type safety.',
          },
        ],
      },
      {
        id: 'c102_m2',
        title: 'Performance Profiling & Render Optimization',
        summary: 'Eliminating unwanted re-renders with React Profiler, memoization, and concurrent rendering.',
        lessons: [
          {
            id: 'c102_m2_l1',
            title: 'React Fiber Internals & Virtual DOM Lifecycles',
            duration: '24m 15s',
            videoId: '30LWjhZzg50',
            summary: 'Understanding reconciliation, commit phases, and lane priority scheduling.',
          },
          {
            id: 'c102_m2_l2',
            title: 'Profiling Components & Avoiding Memoization Traps',
            duration: '28m 40s',
            videoId: '30LWjhZzg50',
            summary: 'When useMemo and useCallback hurt performance, and how to structure pure subtrees.',
          },
          {
            id: 'c102_m2_l3',
            title: 'Concurrent Transitions & useDeferredValue',
            duration: '19m 50s',
            videoId: '30LWjhZzg50',
            summary: 'Keeping input sliders and search responsive while heavy data recalculates.',
          },
        ],
      },
      {
        id: 'c102_m3',
        title: 'Enterprise State Management & Architecture',
        summary: 'State machines, context splitting, Zustand/Jotai patterns, and server caching with React Query.',
        lessons: [
          {
            id: 'c102_m3_l1',
            title: 'Context Splitting & Custom Provider Wrappers',
            duration: '21m 20s',
            videoId: '30LWjhZzg50',
            summary: 'Preventing root re-renders by isolating dispatch actions from state subscriptions.',
          },
          {
            id: 'c102_m3_l2',
            title: 'Deterministic State Machines with XState',
            duration: '27m 15s',
            videoId: '30LWjhZzg50',
            summary: 'Modeling complex multi-step checkout and onboarding flows safely.',
          },
          {
            id: 'c102_m3_l3',
            title: 'Optimistic UI Updates & Cache Invalidation',
            duration: '23m 05s',
            videoId: '30LWjhZzg50',
            summary: 'Instant local updates with automatic rollback on network failure.',
          },
        ],
      },
      {
        id: 'c102_m4',
        title: 'Testing, Error Boundaries & Production Resilience',
        summary: 'Unit testing with Vitest, Integration with React Testing Library, and runtime crash isolation.',
        lessons: [
          {
            id: 'c102_m4_l1',
            title: 'Writing Resilient Component Integration Tests',
            duration: '25m 40s',
            videoId: '30LWjhZzg50',
            summary: 'Testing user behavior rather than implementation details with screen queries.',
          },
          {
            id: 'c102_m4_l2',
            title: 'Granular React Error Boundaries & Fallback States',
            duration: '17m 30s',
            videoId: '30LWjhZzg50',
            summary: 'Preventing single-component failures from collapsing the entire application window.',
          },
          {
            id: 'c102_m4_l3',
            title: 'CI/CD Pipelines, Linting & Bundle Size Budgets',
            duration: '20m 10s',
            videoId: '30LWjhZzg50',
            summary: 'Automating bundle analyzer checks and PR quality gates in GitHub Actions.',
          },
        ],
      },
    ],
  },
  c_103: {
    id: 'c_103',
    title: 'AI Engineering & LLM Integration',
    headline: 'Explore prompt engineering, RAG, and multi-agent systems.',
    description:
      'A cutting-edge masterclass in modern generative AI and applied LLM architecture. Learn to build context-aware Retrieval-Augmented Generation (RAG) pipelines, implement vector similarity search, manage prompt orchestration, and construct autonomous multi-agent workflows.',
    instructor: 'Dr. Sarah Connor',
    instructorRole: 'Head of AI Research',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    duration: '18 hrs',
    totalModules: 4,
    totalLessons: 12,
    rating: 4.88,
    level: 'Advanced',
    access: 'Free',
    language: 'English (EN)',
    category: 'Artificial Intelligence',
    defaultVideoId: 'p3sij8QzONQ',
    thumbnail: '/catalog/ai-engineering-llm.jpg',
    accentColor: '#10B981',
    modules: [
      {
        id: 'c103_m1',
        title: 'Transformer Mechanics & LLM Fundamentals',
        summary: 'Self-attention, positional encodings, tokenization pipelines, and model parameter scaling.',
        lessons: [
          {
            id: 'c103_m1_l1',
            title: 'Self-Attention Mechanisms & Token Embeddings',
            duration: '22m 10s',
            videoId: 'p3sij8QzONQ',
            summary: 'How transformers process language context concurrently using query, key, and value matrices.',
            missionId: 'rag',
          },
          {
            id: 'c103_m1_l2',
            title: 'Tokenization Limits & Context Window Budgets',
            duration: '19m 35s',
            videoId: 'p3sij8QzONQ',
            summary: 'Byte-pair encoding (BPE), chunking strategies, and token cost economics.',
          },
          {
            id: 'c103_m1_l3',
            title: 'Decoding Strategies: Temperature, Top-p & Penalties',
            duration: '24m 15s',
            videoId: 'p3sij8QzONQ',
            summary: 'Controlling creativity vs. deterministic response generation in production systems.',
          },
        ],
      },
      {
        id: 'c103_m2',
        title: 'Retrieval-Augmented Generation (RAG) Pipelines',
        summary: 'Vector databases, dense retrieval embeddings, semantic chunking, and metadata filtering.',
        lessons: [
          {
            id: 'c103_m2_l1',
            title: 'Vector Embeddings & Cosine Similarity Spaces',
            duration: '27m 40s',
            videoId: 'p3sij8QzONQ',
            summary: 'Transforming unstructured enterprise text into mathematical vectors for nearest-neighbor search.',
          },
          {
            id: 'c103_m2_l2',
            title: 'Document Ingestion, Chunking & Chunk Overlap',
            duration: '23m 15s',
            videoId: 'p3sij8QzONQ',
            summary: 'Preserving semantic continuity and boundary integrity across large PDFs and docs.',
          },
          {
            id: 'c103_m2_l3',
            title: 'Hybrid Search: Combining BM25 with Vector Retrieval',
            duration: '26m 50s',
            videoId: 'p3sij8QzONQ',
            summary: 'Solving exact-match keyword failures by blending sparse and dense ranking algorithms.',
          },
        ],
      },
      {
        id: 'c103_m3',
        title: 'Prompt Orchestration & Structured Outputs',
        summary: 'Few-shot patterns, chain-of-thought, function calling, and strict JSON Schema validation.',
        lessons: [
          {
            id: 'c103_m3_l1',
            title: 'Chain-of-Thought & ReAct Prompt Architectures',
            duration: '21m 30s',
            videoId: 'p3sij8QzONQ',
            summary: 'Teaching models to reason step-by-step before executing downstream actions.',
          },
          {
            id: 'c103_m3_l2',
            title: 'Function Calling & Tool Execution Protocols',
            duration: '29m 10s',
            videoId: 'p3sij8QzONQ',
            summary: 'Enabling LLMs to trigger external SQL queries, APIs, and calculators deterministically.',
          },
          {
            id: 'c103_m3_l3',
            title: 'Structured Output Enforcement with Zod Schemas',
            duration: '18m 45s',
            videoId: 'p3sij8QzONQ',
            summary: 'Guaranteeing zero hallucinated keys in downstream application code.',
          },
        ],
      },
      {
        id: 'c103_m4',
        title: 'Autonomous Multi-Agent Systems & Evaluation',
        summary: 'Agent supervisors, state graphs, evaluation benchmarks (RAGAS), and hallucination guardrails.',
        lessons: [
          {
            id: 'c103_m4_l1',
            title: 'Multi-Agent Supervision & Task Delegation',
            duration: '31m 20s',
            videoId: 'p3sij8QzONQ',
            summary: 'Building networks of specialized agents that critique and refine each other’s output.',
          },
          {
            id: 'c103_m4_l2',
            title: 'RAG Evaluation Frameworks: Faithfulness & Relevancy',
            duration: '24m 50s',
            videoId: 'p3sij8QzONQ',
            summary: 'Benchmarking factual grounding and detecting context drift automatically.',
          },
          {
            id: 'c103_m4_l3',
            title: 'Security: Prompt Injections & PII Scrubbing',
            duration: '20m 15s',
            videoId: 'p3sij8QzONQ',
            summary: 'Hardening enterprise LLM gateways against adversarial attacks and data leaks.',
          },
        ],
      },
    ],
  },
};

export const DETAILED_COURSES = detailedCourses;

export function getDetailedCourse(courseId: string | undefined): DetailedCourse | undefined {
  if (!courseId) return undefined;
  return detailedCourses[courseId];
}
