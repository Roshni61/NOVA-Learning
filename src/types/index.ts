export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'student' | 'instructor' | 'admin';
  xp?: number;
  level?: number;
  streak?: number;
  enrolledCourses?: string[];
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

export type ConceptStatus =
  | 'Mastered'
  | 'Developing'
  | 'Needs Practice'
  | 'Knowledge Gap'
  | 'Unexplored'
  | 'Unlocked'
  | 'Locked';

export interface ConceptNodeData {
  id: string;
  name: string;
  category:
    | 'FOUNDATIONS'
    | 'MATHEMATICS'
    | 'MACHINE LEARNING'
    | 'DEEP LEARNING'
    | 'AI SYSTEMS'
    | 'ENGINEERING'
    | 'PROJECTS'
    | 'CAREER';
  mastery: number; // 0 - 100
  retention: number; // 0 - 100
  status: ConceptStatus;
  prerequisites: string[]; // concept IDs
  unlocks: string[]; // concept IDs
  weakPoints: string[];
  lastPracticed: string;
  accuracy: number;
  importance: 'high' | 'medium' | 'normal';
  position?: { x: number; y: number };
}

export type DependencyType = 'prerequisite' | 'related' | 'unlocks' | 'weak';

export interface ConceptEdge {
  id: string;
  source: string;
  target: string;
  type: DependencyType;
  animated?: boolean;
}

export interface Mission {
  id: string;
  conceptId: string;
  conceptName: string;
  title: string;
  description: string;
  reason: string;
  duration: string;
  stage: 'Learn' | 'Practice' | 'Apply' | 'Prove';
  completed: boolean;
  accent: 'lavender' | 'coral' | 'mint' | 'yellow';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface SkillRadarItem {
  skill: string;
  mastery: number;
  fullMark: number;
}

export interface MissionDetail {
  id: string;
  conceptId: string;
  conceptName: string;
  title: string;
  category: 'FOUNDATIONS' | 'MATHEMATICS' | 'MACHINE LEARNING' | 'DEEP LEARNING' | 'AI SYSTEMS' | 'ENGINEERING';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  stage: 'Learn' | 'Practice' | 'Apply' | 'Prove';
  description: string;
  learningObjective: string;
  aiIntent: string;
  learnContent: {
    part1Title: string;
    part1Text: string;
    part2Title: string;
    part2Text: string;
    codeSnippet?: string;
    diagramType: 'neuralnet' | 'backprop' | 'gradient' | 'matrix' | 'hashmap' | 'code';
  };
  applyContent: {
    taskTitle: string;
    taskDescription: string;
    initialCode: string;
    expectedOutput: string;
    testCasesDescription: string;
  };
}

export interface PathMilestone {
  milestoneId: string;
  title: string;
  category: string;
  concepts: string[];
  prerequisites: string[];
  missions: string[];
  masteryRequirement: number;
  currentMastery: number;
  progress: number;
  estimatedDuration: string;
  unlockConditions: string[];
  status: 'Completed' | 'Active' | 'Unlocked' | 'Locked';
  reason?: string;
  unlockedProjects?: string[];
}

