import type { User, Course, LearningStat } from '../types';

export const mockUser: User = {
  id: 'usr_01',
  name: 'Alex Rivera',
  email: 'alex.rivera@nova.edu',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'student',
  enrolledCourses: ['c_101', 'c_102', 'c_103'],
};

export const mockCourses: Course[] = [
  {
    id: 'c_101',
    title: 'Modern UI/UX Design Systems',
    description: 'Master component-driven design, tokens, and micro-interactions.',
    category: 'Design',
    instructor: 'Elena Vance',
    duration: '14 hrs',
    lessonsCount: 24,
    rating: 4.9,
    progress: 68,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    accentColor: 'nova-lavender',
  },
  {
    id: 'c_102',
    title: 'Advanced React & TypeScript Architecture',
    description: 'Build enterprise-ready web applications with scalability in mind.',
    category: 'Engineering',
    instructor: 'Marcus Chen',
    duration: '20 hrs',
    lessonsCount: 36,
    rating: 4.95,
    progress: 42,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    accentColor: 'nova-coral',
  },
  {
    id: 'c_103',
    title: 'AI Engineering & LLM Integration',
    description: 'Explore prompt engineering, RAG, and multi-agent systems.',
    category: 'Artificial Intelligence',
    instructor: 'Dr. Sarah Connor',
    duration: '18 hrs',
    lessonsCount: 30,
    rating: 4.88,
    progress: 15,
    thumbnail: '/catalog/ai-engineering-llm.jpg',
    accentColor: 'nova-mint',
  },
];

export const mockStats: LearningStat[] = [
  { day: 'Mon', hoursSpent: 2.5, completedTasks: 4 },
  { day: 'Tue', hoursSpent: 4.0, completedTasks: 6 },
  { day: 'Wed', hoursSpent: 1.8, completedTasks: 3 },
  { day: 'Thu', hoursSpent: 3.5, completedTasks: 5 },
  { day: 'Fri', hoursSpent: 5.2, completedTasks: 8 },
  { day: 'Sat', hoursSpent: 2.0, completedTasks: 2 },
  { day: 'Sun', hoursSpent: 3.0, completedTasks: 4 },
];
