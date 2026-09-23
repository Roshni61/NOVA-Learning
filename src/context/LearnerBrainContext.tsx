import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  LearnerBrainState,
  LearningEvent,
  ConceptMastery,
} from '../types/learningBrain';
import {
  getInitialBrainState,
  calculateUpdatedMastery,
  evaluateRetentionRisk,
} from '../services/learningBrainEngine';

interface LearnerBrainContextType {
  brainState: LearnerBrainState;
  recordEvent: (event: Omit<LearningEvent, 'id' | 'timestamp' | 'userId'>) => void;
  getConceptMastery: (conceptId: string) => ConceptMastery | undefined;
  getConceptsAtRisk: () => ConceptMastery[];
}

const STORAGE_KEY = 'nova_learning_brain_v1';

const LearnerBrainContext = createContext<LearnerBrainContextType | undefined>(undefined);

export const LearnerBrainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brainState, setBrainState] = useState<LearnerBrainState>(() => {
    if (typeof window === 'undefined') return getInitialBrainState();
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : getInitialBrainState();
    } catch {
      return getInitialBrainState();
    }
  });

  // Sync state to localStorage safely on state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(brainState));
    } catch (e) {
      console.warn('Unable to persist NOVA Brain state to localStorage', e);
    }
  }, [brainState]);

  const recordEvent = (eventInput: Omit<LearningEvent, 'id' | 'timestamp' | 'userId'>) => {
    const newEvent: LearningEvent = {
      ...eventInput,
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      userId: 'user_active_alex',
    };

    setBrainState((prevState) => {
      const existingConcept = prevState.concepts[newEvent.conceptId];
      const updatedConcepts = { ...prevState.concepts };

      if (existingConcept) {
        const accuracy = newEvent.accuracy !== undefined ? newEvent.accuracy : 1.0;
        const newScore = calculateUpdatedMastery(existingConcept.masteryScore, accuracy);
        const newAttempts = existingConcept.attemptsCount + 1;
        const newAccuracy = (existingConcept.accuracyRate * existingConcept.attemptsCount + accuracy) / newAttempts;
        const newRisk = evaluateRetentionRisk(newEvent.timestamp, newScore);

        // If a recovery drill completed successfully, clear active misconception
        let misconceptions = [...existingConcept.activeMisconceptions];
        if (newEvent.eventType === 'RECOVERY_DRILL_COMPLETED' && newEvent.misconceptionId) {
          misconceptions = misconceptions.filter((m) => m !== newEvent.misconceptionId);
        }

        updatedConcepts[newEvent.conceptId] = {
          ...existingConcept,
          masteryScore: newScore,
          lastPracticed: newEvent.timestamp,
          attemptsCount: newAttempts,
          accuracyRate: Number(newAccuracy.toFixed(2)),
          retentionRisk: newRisk,
          activeMisconceptions: misconceptions,
        };
      }

      return {
        ...prevState,
        lastUpdated: Date.now(),
        concepts: updatedConcepts,
        recentEvents: [newEvent, ...prevState.recentEvents].slice(0, 50), // Keep latest 50 events
      };
    });
  };

  const getConceptMastery = (conceptId: string): ConceptMastery | undefined => {
    return brainState.concepts[conceptId];
  };

  const getConceptsAtRisk = (): ConceptMastery[] => {
    return Object.values(brainState.concepts).filter((c) => c.retentionRisk === 'high');
  };

  return (
    <LearnerBrainContext.Provider
      value={{
        brainState,
        recordEvent,
        getConceptMastery,
        getConceptsAtRisk,
      }}
    >
      {children}
    </LearnerBrainContext.Provider>
  );
};

export const useLearnerBrain = (): LearnerBrainContextType => {
  const context = useContext(LearnerBrainContext);
  if (!context) {
    throw new Error('useLearnerBrain must be used within a LearnerBrainProvider');
  }
  return context;
};
