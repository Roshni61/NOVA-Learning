import type { LearnerBrainState } from '../types/learningBrain';

/**
 * Calculates updated concept mastery using Exponential Moving Average (EMA).
 * Formula: NewScore = (PrevScore * 0.7) + ((Accuracy * 100) * 0.3)
 */
export function calculateUpdatedMastery(currentScore: number, accuracy: number): number {
  const normalizedAccuracy = Math.max(0, Math.min(1, accuracy));
  const newScore = Math.round(currentScore * 0.7 + (normalizedAccuracy * 100) * 0.3);
  return Math.max(0, Math.min(100, newScore));
}

/**
 * Evaluates retention risk based on elapsed time since last practice and mastery level.
 */
export function evaluateRetentionRisk(lastPracticed: number, masteryScore: number): 'low' | 'medium' | 'high' {
  const msInDay = 1000 * 60 * 60 * 24;
  const daysElapsed = Math.floor((Date.now() - lastPracticed) / msInDay);

  if (daysElapsed > 7 || (daysElapsed > 4 && masteryScore < 60)) {
    return 'high';
  }
  if (daysElapsed > 3 || masteryScore < 75) {
    return 'medium';
  }
  return 'low';
}

/**
 * Provides initial baseline state matching current profile telemetry.
 */
export function getInitialBrainState(): LearnerBrainState {
  const now = Date.now();
  const oneDayAgo = now - 1000 * 60 * 60 * 24;
  const fiveDaysAgo = now - 1000 * 60 * 60 * 24 * 5;

  return {
    version: '1.0.0',
    lastUpdated: now,
    learningVelocity: 'moderate',
    consistencyScore: 92,
    concepts: {
      'dsa.arrays': {
        conceptId: 'dsa.arrays',
        domain: 'DSA',
        name: 'Arrays',
        masteryScore: 92,
        lastPracticed: oneDayAgo,
        retentionRisk: 'low',
        attemptsCount: 18,
        accuracyRate: 0.94,
        activeMisconceptions: [],
      },
      'dsa.hashmap': {
        conceptId: 'dsa.hashmap',
        domain: 'DSA',
        name: 'HashMaps',
        masteryScore: 53,
        lastPracticed: fiveDaysAgo,
        retentionRisk: 'high',
        attemptsCount: 8,
        accuracyRate: 0.53,
        activeMisconceptions: ['collision_boundary_leak'],
      },
      'lang.python': {
        conceptId: 'lang.python',
        domain: 'Python',
        name: 'Python',
        masteryScore: 92,
        lastPracticed: oneDayAgo,
        retentionRisk: 'low',
        attemptsCount: 22,
        accuracyRate: 0.95,
        activeMisconceptions: [],
      },
      'math.linear_algebra': {
        conceptId: 'math.linear_algebra',
        domain: 'Mathematics',
        name: 'Mathematics',
        masteryScore: 78,
        lastPracticed: oneDayAgo * 2,
        retentionRisk: 'low',
        attemptsCount: 12,
        accuracyRate: 0.82,
        activeMisconceptions: [],
      },
      'ai.machine_learning': {
        conceptId: 'ai.machine_learning',
        domain: 'Machine Learning',
        name: 'Machine Learning',
        masteryScore: 78,
        lastPracticed: oneDayAgo * 3,
        retentionRisk: 'medium',
        attemptsCount: 14,
        accuracyRate: 0.79,
        activeMisconceptions: [],
      },
      'ai.deep_learning': {
        conceptId: 'ai.deep_learning',
        domain: 'Deep Learning',
        name: 'Deep Learning',
        masteryScore: 64,
        lastPracticed: oneDayAgo * 4,
        retentionRisk: 'medium',
        attemptsCount: 9,
        accuracyRate: 0.67,
        activeMisconceptions: [],
      },
      'sys.architecture': {
        conceptId: 'sys.architecture',
        domain: 'AI Systems',
        name: 'AI Systems',
        masteryScore: 28,
        lastPracticed: oneDayAgo * 6,
        retentionRisk: 'high',
        attemptsCount: 4,
        accuracyRate: 0.35,
        activeMisconceptions: [],
      },
    },
    recentEvents: [],
  };
}
