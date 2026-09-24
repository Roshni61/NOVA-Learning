import React, { useState, useEffect } from 'react';

export interface LessonMediaProps {
  lessonId?: string;
  title?: string;
  onEnded?: () => void;
}

export const LessonMediaViewer: React.FC<LessonMediaProps> = ({
  lessonId = '1',
  title = '1. What is Computational Graph Backpropagation?',
  onEnded,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'interactive'>('video');
  const [graphStep, setGraphStep] = useState<number>(0);

  // Video embeds mapped to syllabus lessons
  const lessonMediaMap: Record<string, { embedUrl: string; duration: string }> = {
    '1': {
      // Andrej Karpathy's building micrograd & backprop
      embedUrl: 'https://www.youtube-nocookie.com/embed/VMj-3S1tku0?start=60',
      duration: '12:45',
    },
    '2': {
      // Jacobian matrices & Weight Gradients (3Blue1Brown Essence of Calculus)
      embedUrl: 'https://www.youtube-nocookie.com/embed/Ilg3gGewQ5U',
      duration: '15:20',
    },
    '3': {
      // Vectorized Cross Entropy loss calculation
      embedUrl: 'https://www.youtube-nocookie.com/embed/6ArSys5qHAU',
      duration: '20:15',
    },
    'backpropagation-computational-graphs': {
      embedUrl: 'https://www.youtube-nocookie.com/embed/VMj-3S1tku0?start=60',
      duration: '12:45',
    },
    'matrix-calculus-gradient-descent': {
      embedUrl: 'https://www.youtube-nocookie.com/embed/Ilg3gGewQ5U',
      duration: '15:20',
    },
    'numpy-loss-function': {
      embedUrl: 'https://www.youtube-nocookie.com/embed/6ArSys5qHAU',
      duration: '20:15',
    },
    'transformers': {
      embedUrl: 'https://www.youtube-nocookie.com/embed/kCc8FmEb1nY',
      duration: '25:00',
    },
    'rag': {
      embedUrl: 'https://www.youtube-nocookie.com/embed/T-D1OfcDW1M',
      duration: '30:10',
    },
  };

  const currentMedia =
    lessonMediaMap[lessonId] ||
    lessonMediaMap[lessonId?.toLowerCase()] ||
    lessonMediaMap['1'];

  // Reset graph step when active lesson changes
  useEffect(() => {
    setGraphStep(0);
  }, [lessonId]);

  return (
    <div className="w-full bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-800">
      {/* Media Mode Switcher Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
          <span className="text-xs font-medium text-slate-300 truncate max-w-[200px] sm:max-w-xs">
            Live Lesson Module • {currentMedia.duration}
          </span>
        </div>
        <div className="flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('video')}
            aria-label="Switch to video lecture stream"
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer min-h-[36px] ${
              activeTab === 'video'
                ? 'bg-rose-500 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Video Stream
          </button>
          <button
            onClick={() => setActiveTab('interactive')}
            aria-label="Switch to interactive computational graph visualizer"
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer min-h-[36px] ${
              activeTab === 'interactive'
                ? 'bg-rose-500 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Graph
          </button>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className="relative aspect-video w-full bg-black">
        {activeTab === 'video' ? (
          <iframe
            src={currentMedia.embedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          /* Interactive Computational Graph Fallback */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-200 overflow-y-auto">
            <h4 className="text-sm font-semibold text-rose-400 mb-2 text-center">
              Interactive Reverse Topological Sort Visualizer
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-3 my-auto">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-center min-w-[70px]">
                <p className="text-xs text-slate-400">Input X</p>
                <p className="font-mono text-emerald-400">2.0</p>
              </div>
              <span className="text-slate-500 font-bold">→ [*] →</span>
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-center min-w-[90px]">
                <p className="text-xs text-slate-400">Node (X * W)</p>
                <p className="font-mono text-indigo-400">{graphStep >= 1 ? '6.0' : '?'}</p>
              </div>
              <span className="text-slate-500 font-bold">→ [+] →</span>
              <div className="p-3 bg-slate-800 rounded-xl border border-rose-500/50 text-center min-w-[110px]">
                <p className="text-xs text-rose-400">Loss (L)</p>
                <p className="font-mono text-rose-400">{graphStep >= 2 ? 'dL/dx = 3.0' : '?'}</p>
              </div>
            </div>

            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => setGraphStep((s) => (s > 0 ? s - 1 : 0))}
                aria-label="Previous graph step"
                className="px-3.5 py-1.5 text-xs bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 cursor-pointer transition-colors min-h-[44px]"
              >
                ← Prev Node
              </button>
              <button
                onClick={() => {
                  setGraphStep((s) => (s < 2 ? s + 1 : 2));
                  if (graphStep === 1 && onEnded) {
                    onEnded();
                  }
                }}
                aria-label="Propagate gradient forward"
                className="px-3.5 py-1.5 text-xs bg-rose-600 rounded-lg text-white hover:bg-rose-500 cursor-pointer transition-colors font-medium min-h-[44px]"
              >
                Propagate Gradient →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonMediaViewer;
