import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { Card, Badge } from '../../components/ui';

export const TutorPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-nova-soft space-y-2">
        <Badge variant="lavender" className="gap-1.5">
          <Bot className="w-3.5 h-3.5" />
          AI Tutor Workbench
        </Badge>
        <h1 className="text-2xl md:text-3xl font-black text-nova-charcoal">
          Interactive AI Learning Assistant
        </h1>
        <p className="text-sm text-nova-muted">
          Use the floating AI Tutor dock at the bottom-right for live contextual guidance during missions.
        </p>
      </div>

      <Card className="bg-gradient-to-br from-rose-50 via-purple-50 to-emerald-50 p-8 text-center space-y-4 border border-purple-100">
        <div className="w-16 h-16 rounded-3xl bg-nova-charcoal text-nova-coral flex items-center justify-center font-black mx-auto shadow-lg">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-nova-charcoal">AI Tutor Dock Active</h2>
        <p className="text-xs text-nova-muted max-w-md mx-auto">
          The AI Tutor launcher is available across all views. Click the bottom-right widget to trigger quick prompts or start a custom explanation session.
        </p>
      </Card>
    </div>
  );
};
