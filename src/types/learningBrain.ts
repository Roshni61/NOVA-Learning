export interface ConceptMastery {
  conceptId: string;
  domain: string;
  name: string;
  masteryScore: number;
  lastPracticed: number; // Unix timestamp
  retentionRisk: 'low' | 'medium' | 'high';
  attemptsCount: number;
  accuracyRate: number; // 0.0 - 1.0
  activeMisconceptions: string[];
}

export interface LearningEvent {
  id: string;
  timestamp: number;
  conceptId: string;
  accuracy: number;
  durationMs: number;
}

export interface LearnerBrainState {
  version: string;
  lastUpdated: number;
  learningVelocity: 'slow' | 'moderate' | 'fast';
  consistencyScore: number;
  concepts: Record<string, ConceptMastery>;
  recentEvents: LearningEvent[];
}
