import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  ConceptNodeData,
  ConceptEdge,
  Mission,
  Achievement,
  SkillRadarItem,
  ConceptStatus,
  PathMilestone,
} from '../types';
import { INITIAL_CONCEPTS, INITIAL_EDGES } from '../data/universeData';

export interface GoalState {
  targetGoal: string;
  monthsToTarget: number;
  hoursPerDay: number;
  readiness: number;
  streak: number;
  retention: number;
  mastery: number;
  speed: string;
  consistency: number;
  userXP: number;
  userLevel: number;
  concepts: ConceptNodeData[];
  edges: ConceptEdge[];
  selectedConceptId: string | null;
  focusConceptId: string | null;
  missions: Mission[];
  achievements: Achievement[];
  skillRadar: SkillRadarItem[];
  pathMilestones: PathMilestone[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setGoal: (goal: string) => void;
  setTimeline: (months: number, hours: number) => void;
  updateGoalData: (data: Partial<GoalState>) => void;
  selectConcept: (conceptId: string | null) => void;
  setFocusMode: (conceptId: string | null) => void;
  updateConceptMastery: (conceptId: string, deltaOrAbsolute: number, isAbsolute?: boolean) => void;
  completeMission: (missionId: string, scorePct: number) => void;
  generateMissionForConcept: (conceptId: string) => Mission;
}

const GoalContext = createContext<GoalState | undefined>(undefined);

export const INITIAL_MILESTONES: PathMilestone[] = [
  {
    milestoneId: 'python-ds',
    title: 'Python & Data Structures',
    category: 'FOUNDATIONS',
    concepts: ['python', 'data-structures', 'hashmap'],
    prerequisites: [],
    missions: ['python-data-structures', 'hashmap-hashing'],
    masteryRequirement: 70,
    currentMastery: 75,
    progress: 100,
    estimatedDuration: '2 weeks',
    unlockConditions: ['Initial unlocked foundational milestone'],
    status: 'Completed',
    reason: 'Prerequisite foundation for all data structures and machine learning algorithms.',
    unlockedProjects: ['CLI Data Pipeline'],
  },
  {
    milestoneId: 'statistics',
    title: 'Statistics',
    category: 'MATHEMATICS',
    concepts: ['probability'],
    prerequisites: ['python-ds'],
    missions: ['matrix-calculus-gradient-descent'],
    masteryRequirement: 70,
    currentMastery: 72,
    progress: 100,
    estimatedDuration: '2 weeks',
    unlockConditions: ['Complete Python & Data Structures with >= 70% mastery'],
    status: 'Completed',
    reason: 'Core probability distributions, Bayesian inference, and statistical hypothesis testing.',
    unlockedProjects: ['Statistical A/B Test Suite'],
  },
  {
    milestoneId: 'linear-algebra',
    title: 'Linear Algebra',
    category: 'MATHEMATICS',
    concepts: ['linear-algebra', 'calculus'],
    prerequisites: ['statistics'],
    missions: ['linear-algebra-calculus', 'matrix-calculus-gradient-descent'],
    masteryRequirement: 70,
    currentMastery: 75,
    progress: 100,
    estimatedDuration: '3 weeks',
    unlockConditions: ['Complete Statistics with >= 70% mastery'],
    status: 'Completed',
    reason: 'Essential for matrix transformations, vector spaces, and gradient propagation.',
    unlockedProjects: ['NumPy Neural Net Engine'],
  },
  {
    milestoneId: 'machine-learning',
    title: 'Machine Learning',
    category: 'MACHINE LEARNING',
    concepts: ['supervised-learning', 'regression', 'decision-trees'],
    prerequisites: ['linear-algebra'],
    missions: ['supervised-learning', 'numpy-loss-function'],
    masteryRequirement: 75,
    currentMastery: 78,
    progress: 100,
    estimatedDuration: '4 weeks',
    unlockConditions: ['Complete Linear Algebra with >= 70% mastery'],
    status: 'Completed',
    reason: 'Supervised learning, classification metrics, feature engineering, and ensemble methods.',
    unlockedProjects: ['Predictive Analytics Dashboard'],
  },
  {
    milestoneId: 'deep-learning',
    title: 'Deep Learning',
    category: 'DEEP LEARNING',
    concepts: ['neural-networks', 'backprop', 'optimization', 'transformers'],
    prerequisites: ['machine-learning'],
    missions: ['backpropagation-computational-graphs', 'transformers'],
    masteryRequirement: 75,
    currentMastery: 64,
    progress: 30,
    estimatedDuration: '5 weeks',
    unlockConditions: ['Complete Machine Learning with >= 75% mastery'],
    status: 'Active',
    reason: 'Neural network autograd, backpropagation, and Transformer self-attention architectures.',
    unlockedProjects: ['PyTorch Transformer Engine'],
  },
  {
    milestoneId: 'advanced-ai',
    title: 'Advanced AI',
    category: 'AI SYSTEMS',
    concepts: ['llms', 'embeddings', 'rag', 'agents'],
    prerequisites: ['deep-learning'],
    missions: ['rag'],
    masteryRequirement: 80,
    currentMastery: 24,
    progress: 0,
    estimatedDuration: '4 weeks',
    unlockConditions: ['Complete Deep Learning with >= 75% mastery'],
    status: 'Locked',
    reason: 'Retrieval Augmented Generation (RAG), vector indexing, and multi-agent systems.',
    unlockedProjects: ['Enterprise Autonomous RAG Agent'],
  },
];

export function computeMilestoneProgression(
  milestones: PathMilestone[],
  concepts: ConceptNodeData[],
  missions: Mission[]
): PathMilestone[] {
  const updated = milestones.map((m) => {
    const mConcepts = concepts.filter((c) => m.concepts.includes(c.id));
    const currentMastery =
      mConcepts.length > 0
        ? Math.round(mConcepts.reduce((acc, c) => acc + c.mastery, 0) / mConcepts.length)
        : m.currentMastery;

    const mMissions = m.missions;
    let completedCount = 0;
    mMissions.forEach((mId) => {
      const found = missions.find((mItem) => mItem.id === mId || mItem.conceptId === mId);
      if (found && found.completed) {
        completedCount++;
      }
    });

    const totalMissions = mMissions.length || 1;
    let progress = Math.round((completedCount / totalMissions) * 100);

    if (completedCount === 0) {
      progress = Math.min(95, Math.round((currentMastery / m.masteryRequirement) * 100));
    } else if (currentMastery >= m.masteryRequirement) {
      progress = 100;
    }

    return {
      ...m,
      currentMastery,
      progress,
    };
  });

  return updated.map((m) => {
    if (m.prerequisites.length === 0) {
      const isComplete = m.currentMastery >= m.masteryRequirement;
      return {
        ...m,
        status: isComplete ? ('Completed' as const) : ('Active' as const),
      };
    }

    const prereqsSatisfied = m.prerequisites.every((prereqId) => {
      const prereqMilestone = updated.find((item) => item.milestoneId === prereqId);
      return prereqMilestone && prereqMilestone.currentMastery >= prereqMilestone.masteryRequirement;
    });

    if (prereqsSatisfied) {
      const isComplete = m.currentMastery >= m.masteryRequirement;
      return {
        ...m,
        status: isComplete ? ('Completed' as const) : ('Active' as const),
      };
    } else {
      return {
        ...m,
        status: 'Locked' as const,
      };
    }
  });
}


const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'backpropagation-computational-graphs',
    conceptId: 'backprop',
    conceptName: 'Backpropagation & Autograd',
    title: 'Backpropagation & Computational Graphs',
    description: 'Master forward pass graph construction and chain rule derivative propagation.',
    reason: 'Prerequisite for Deep Learning Architecture mastery.',
    duration: '25 mins',
    stage: 'Learn',
    completed: false,
    accent: 'lavender',
  },
  {
    id: 'matrix-calculus-gradient-descent',
    conceptId: 'calculus',
    conceptName: 'Multivariate Calculus',
    title: 'Matrix Calculus for Gradient Descent',
    description: 'Interactive drill calculating Jacobian matrix shapes for linear layers.',
    reason: 'Required for gradient optimization stability.',
    duration: '15 mins',
    stage: 'Practice',
    completed: false,
    accent: 'coral',
  },
  {
    id: 'numpy-loss-function',
    conceptId: 'neural-networks',
    conceptName: 'Neural Networks',
    title: 'Implement Loss Function in NumPy',
    description: 'Write a vectorized Categorical Cross-Entropy loss module from scratch.',
    reason: 'Essential numeric stability before PyTorch modeling.',
    duration: '30 mins',
    stage: 'Apply',
    completed: false,
    accent: 'mint',
  },
  {
    id: 'hashmap-hashing',
    conceptId: 'hashmap',
    conceptName: 'HashMap & Hashing',
    title: 'HashMap Collision Handling & Load Factor',
    description: 'Master open addressing, chaining, and load factor rehashing to resolve system design bottlenecks.',
    reason: 'Detected 48% gap in open addressing collision handling.',
    duration: '10 mins',
    stage: 'Prove',
    completed: false,
    accent: 'yellow',
  },
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach_1', title: 'Continuous Learner', description: 'Maintain a 12-day learning streak', icon: '🔥', unlocked: true, unlockedAt: '2 days ago' },
  { id: 'ach_2', title: 'Math Foundations', description: 'Achieve >80% in Linear Algebra', icon: '📐', unlocked: true, unlockedAt: '1 week ago' },
  { id: 'ach_3', title: 'Knowledge Explorer', description: 'Explore 40+ nodes in Universe', icon: '🪐', unlocked: true, unlockedAt: 'Yesterday' },
  { id: 'ach_4', title: 'Gap Crusher', description: 'Turn a Knowledge Gap node into Mastered', icon: '⚡', unlocked: false },
  { id: 'ach_5', title: 'AI Systems Architect', description: 'Unlock Retrieval Augmented Generation (RAG)', icon: '🚀', unlocked: false },
];

const INITIAL_SKILL_RADAR: SkillRadarItem[] = [
  { skill: 'Python', mastery: 92, fullMark: 100 },
  { skill: 'DSA', mastery: 72, fullMark: 100 },
  { skill: 'Mathematics', mastery: 78, fullMark: 100 },
  { skill: 'Machine Learning', mastery: 78, fullMark: 100 },
  { skill: 'Deep Learning', mastery: 64, fullMark: 100 },
  { skill: 'AI Systems', mastery: 28, fullMark: 100 },
  { skill: 'Engineering', mastery: 55, fullMark: 100 },
];

export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [targetGoal, setTargetGoal] = useState<string>('AI/ML Engineer');
  const [monthsToTarget, setMonthsToTarget] = useState<number>(6);
  const [hoursPerDay, setHoursPerDay] = useState<number>(2);
  const [readiness, setReadiness] = useState<number>(68);
  const [streak] = useState<number>(12);
  const [retention] = useState<number>(94);
  const [mastery, setMastery] = useState<number>(72);
  const [speed] = useState<string>('1.2x');
  const [consistency] = useState<number>(92);
  const [userXP, setUserXP] = useState<number>(3420);
  const [userLevel] = useState<number>(4);

  const [concepts, setConcepts] = useState<ConceptNodeData[]>(INITIAL_CONCEPTS);
  const [edges] = useState<ConceptEdge[]>(INITIAL_EDGES);
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>('hashmap');
  const [focusConceptId, setFocusConceptId] = useState<string | null>(null);
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [skillRadar] = useState<SkillRadarItem[]>(INITIAL_SKILL_RADAR);
  const [pathMilestones, setPathMilestones] = useState<PathMilestone[]>(() =>
    computeMilestoneProgression(INITIAL_MILESTONES, INITIAL_CONCEPTS, INITIAL_MISSIONS)
  );

  useEffect(() => {
    setPathMilestones(computeMilestoneProgression(INITIAL_MILESTONES, concepts, missions));
  }, [concepts, missions]);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('nova_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nova_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setGoal = (goal: string) => setTargetGoal(goal);
  const setTimeline = (months: number, hours: number) => {
    setMonthsToTarget(months);
    setHoursPerDay(hours);
  };

  const selectConcept = (conceptId: string | null) => setSelectedConceptId(conceptId);
  const setFocusMode = (conceptId: string | null) => setFocusConceptId(conceptId);

  const updateGoalData = (data: Partial<GoalState>) => {
    if (data.targetGoal !== undefined) setTargetGoal(data.targetGoal);
    if (data.monthsToTarget !== undefined) setMonthsToTarget(data.monthsToTarget);
    if (data.hoursPerDay !== undefined) setHoursPerDay(data.hoursPerDay);
    if (data.readiness !== undefined) setReadiness(data.readiness);
    if (data.mastery !== undefined) setMastery(data.mastery);
    if (data.userXP !== undefined) setUserXP(data.userXP);
  };

  const updateConceptMastery = (conceptId: string, val: number, isAbsolute = false) => {
    setConcepts((prevConcepts) => {
      const updated = prevConcepts.map((c) => {
        if (c.id === conceptId) {
          const newMastery = isAbsolute ? Math.min(100, Math.max(0, val)) : Math.min(100, Math.max(0, c.mastery + val));
          let newStatus: ConceptStatus = c.status;
          if (newMastery >= 80) newStatus = 'Mastered';
          else if (newMastery >= 60) newStatus = 'Developing';
          else if (newMastery >= 45) newStatus = 'Needs Practice';
          else newStatus = 'Knowledge Gap';

          return {
            ...c,
            mastery: newMastery,
            status: newStatus,
            accuracy: Math.min(100, c.accuracy + 5),
            lastPracticed: 'Just now',
          };
        }
        return c;
      });

      // Recalculate unlocks for downstream concepts
      const targetConcept = updated.find((c) => c.id === conceptId);
      if (targetConcept && targetConcept.mastery >= 60) {
        return updated.map((c) => {
          if (targetConcept.unlocks.includes(c.id) && c.status === 'Locked') {
            return { ...c, status: 'Unlocked' as ConceptStatus, mastery: 25 };
          }
          return c;
        });
      }

      return updated;
    });

    setMastery((prev) => Math.min(98, prev + 2));
    setReadiness((prev) => Math.min(98, prev + 3));
    setUserXP((prev) => prev + 250);
  };

  const completeMission = (missionId: string, scorePct: number) => {
    setMissions((prevMissions) => {
      const targetMission = prevMissions.find((m) => m.id === missionId);
      if (targetMission && targetMission.conceptId) {
        const delta = scorePct >= 80 ? 18 : scorePct >= 60 ? 10 : 4;
        updateConceptMastery(targetMission.conceptId, delta);
      }
      return prevMissions.map((m) => (m.id === missionId ? { ...m, completed: true } : m));
    });

    setAchievements((prev) =>
      prev.map((ach) => (ach.id === 'ach_4' ? { ...ach, unlocked: true, unlockedAt: 'Just now' } : ach))
    );
  };

  const generateMissionForConcept = (conceptId: string): Mission => {
    const existing = missions.find((m) => m.conceptId === conceptId && !m.completed);
    if (existing) return existing;

    const concept = concepts.find((c) => c.id === conceptId);
    const newMission: Mission = {
      id: `m_${conceptId}_${Date.now()}`,
      conceptId: conceptId,
      conceptName: concept?.name || conceptId,
      title: `${concept?.name || conceptId} Adaptive Practice`,
      description: `Targeted practice mission to raise mastery from ${concept?.mastery || 48}% to 75%+.`,
      reason: `NOVA identified ${concept?.name} as an active priority node blocking downstream unlocks.`,
      duration: '15 mins',
      stage: 'Practice',
      completed: false,
      accent: 'coral',
    };

    setMissions((prev) => [newMission, ...prev]);
    return newMission;
  };

  return (
    <GoalContext.Provider
      value={{
        targetGoal,
        monthsToTarget,
        hoursPerDay,
        readiness,
        streak,
        retention,
        mastery,
        speed,
        consistency,
        userXP,
        userLevel,
        concepts,
        edges,
        selectedConceptId,
        focusConceptId,
        missions,
        achievements,
        skillRadar,
        pathMilestones,
        theme,
        toggleTheme,
        setGoal,
        setTimeline,
        updateGoalData,
        selectConcept,
        setFocusMode,
        updateConceptMastery,
        completeMission,
        generateMissionForConcept,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoal = (): GoalState => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoal must be used within a GoalProvider');
  }
  return context;
};
