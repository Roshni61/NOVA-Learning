export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledCourses: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  lessonsCount: number;
  rating: number;
  progress?: number;
  thumbnail: string;
  accentColor?: string;
}

export interface LearningStat {
  day: string;
  hoursSpent: number;
  completedTasks: number;
}
