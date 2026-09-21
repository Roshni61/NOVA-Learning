import React from 'react';
import { Flame, Award, Shield } from 'lucide-react';
import { Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';
import { mockUser } from '../../mock/data';

export const ProfilePage: React.FC = () => {
  const { targetGoal, streak, readiness, retention } = useGoal();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-nova-soft flex flex-col md:flex-row items-center gap-6">
        <img
          src={mockUser.avatarUrl}
          alt={mockUser.name}
          className="w-24 h-24 rounded-3xl object-cover border-2 border-nova-lavender shadow-md"
        />
        <div className="space-y-2 text-center md:text-left">
          <Badge variant="coral">Student Profile</Badge>
          <h1 className="text-2xl font-black text-nova-charcoal">{mockUser.name}</h1>
          <p className="text-xs text-nova-muted">{mockUser.email}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
            <Badge variant="lavender">Target: {targetGoal}</Badge>
            <Badge variant="mint">Streak: {streak} Days</Badge>
            <Badge variant="yellow">Readiness: {readiness}%</Badge>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white p-6 border border-gray-100 text-center space-y-2">
          <Award className="w-8 h-8 text-nova-yellow mx-auto" />
          <div className="text-2xl font-black text-nova-charcoal">Level 4</div>
          <div className="text-xs text-nova-muted">Knowledge Rank</div>
        </Card>

        <Card className="bg-white p-6 border border-gray-100 text-center space-y-2">
          <Shield className="w-8 h-8 text-nova-mint mx-auto" />
          <div className="text-2xl font-black text-nova-charcoal">{retention}%</div>
          <div className="text-xs text-nova-muted">Retention Accuracy</div>
        </Card>

        <Card className="bg-white p-6 border border-gray-100 text-center space-y-2">
          <Flame className="w-8 h-8 text-nova-coral mx-auto fill-nova-coral" />
          <div className="text-2xl font-black text-nova-charcoal">{streak} Days</div>
          <div className="text-xs text-nova-muted">Active Streak</div>
        </Card>
      </div>
    </div>
  );
};
