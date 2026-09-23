import React from 'react';
import { Award, BookOpen, Star, CheckCircle2 } from 'lucide-react';
import { Card, Badge, InstructorBioSkeleton } from '../ui';

interface InstructorBioProps {
  name?: string;
  role?: string;
  avatarUrl?: string;
  bio?: string;
  coursesCount?: number;
  rating?: number;
  studentsCount?: number;
  isLoading?: boolean;
}

/**
 * Accessible Instructor Bio component with skeleton placeholder and WCAG AA contrast.
 */
export const InstructorBio: React.FC<InstructorBioProps> = ({
  name = 'Dr. Sarah Connor',
  role = 'Lead AI Systems Architect & Machine Learning Researcher',
  avatarUrl = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  bio = 'Former Senior Principal AI Scientist specializing in Transformer models, RAG pipelines, and high-performance neural architecture search.',
  coursesCount = 12,
  rating = 4.92,
  studentsCount = 48500,
  isLoading = false,
}) => {
  if (isLoading) {
    return <InstructorBioSkeleton />;
  }

  return (
    <Card className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-nova-soft">
      <div className="flex items-start gap-4">
        {/* Instructor Avatar Image */}
        <div className="relative">
          <img
            src={avatarUrl}
            alt={`Avatar of instructor ${name}`}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-200 dark:border-slate-700 shadow-sm"
          />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1" title="Verified Instructor">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-extrabold text-nova-charcoal dark:text-slate-100">
              {name}
            </h3>
            <Badge variant="lavender" className="text-[10px]">
              Verified Expert
            </Badge>
          </div>
          <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold leading-snug">
            {role}
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
        {bio}
      </p>

      {/* Instructor Stats Grid */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100 dark:border-slate-800 text-center">
        <div className="p-2 bg-nova-bg dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-750">
          <div className="text-xs font-black text-nova-charcoal dark:text-slate-100 flex items-center justify-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-nova-coral" />
            {coursesCount}
          </div>
          <div className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold mt-0.5">Courses</div>
        </div>

        <div className="p-2 bg-nova-bg dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-750">
          <div className="text-xs font-black text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {rating}
          </div>
          <div className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold mt-0.5">Rating</div>
        </div>

        <div className="p-2 bg-nova-bg dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-750">
          <div className="text-xs font-black text-purple-700 dark:text-purple-300 flex items-center justify-center gap-1">
            <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            {(studentsCount / 1000).toFixed(1)}k
          </div>
          <div className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold mt-0.5">Students</div>
        </div>
      </div>
    </Card>
  );
};
