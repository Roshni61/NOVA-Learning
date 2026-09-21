import React, { createContext, useContext, useState } from 'react';

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
  setGoal: (goal: string) => void;
  setTimeline: (months: number, hours: number) => void;
  updateGoalData: (data: Partial<Omit<GoalState, 'setGoal' | 'setTimeline' | 'updateGoalData'>>) => void;
}

const GoalContext = createContext<GoalState | undefined>(undefined);

export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [targetGoal, setTargetGoal] = useState<string>('AI/ML Engineer');
  const [monthsToTarget, setMonthsToTarget] = useState<number>(6);
  const [hoursPerDay, setHoursPerDay] = useState<number>(2);
  const [readiness, setReadiness] = useState<number>(68);
  const [streak, setStreak] = useState<number>(12);
  const [retention, setRetention] = useState<number>(94);
  const [mastery, setMastery] = useState<number>(78);
  const [speed, setSpeed] = useState<string>('1.2x');
  const [consistency, setConsistency] = useState<number>(92);

  const setGoal = (goal: string) => {
    setTargetGoal(goal);
  };

  const setTimeline = (months: number, hours: number) => {
    setMonthsToTarget(months);
    setHoursPerDay(hours);
  };

  const updateGoalData = (data: Partial<Omit<GoalState, 'setGoal' | 'setTimeline' | 'updateGoalData'>>) => {
    if (data.targetGoal !== undefined) setTargetGoal(data.targetGoal);
    if (data.monthsToTarget !== undefined) setMonthsToTarget(data.monthsToTarget);
    if (data.hoursPerDay !== undefined) setHoursPerDay(data.hoursPerDay);
    if (data.readiness !== undefined) setReadiness(data.readiness);
    if (data.streak !== undefined) setStreak(data.streak);
    if (data.retention !== undefined) setRetention(data.retention);
    if (data.mastery !== undefined) setMastery(data.mastery);
    if (data.speed !== undefined) setSpeed(data.speed);
    if (data.consistency !== undefined) setConsistency(data.consistency);
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
        setGoal,
        setTimeline,
        updateGoalData,
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
