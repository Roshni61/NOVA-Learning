import React, { useState, useEffect } from 'react';
import { ExternalLink, AlertTriangle, VideoOff } from 'lucide-react';
import { VideoPlayerSkeleton, Button } from '../ui';

/**
 * Reusable mapping of lesson IDs to their corresponding YouTube video IDs and titles.
 */
export const LESSON_YOUTUBE_VIDEOS: Record<string, { youtubeId: string; title: string }> = {
  'backpropagation-computational-graphs': {
    youtubeId: '5s4pERJ0VZo',
    title: 'Automatic Differentiation — Computational Graphs and Reverse Mode',
  },
  'matrix-calculus-gradient-descent': {
    youtubeId: 'c9Wg6Cb_YlU',
    title: 'Matrix Calculus for Gradient Descent',
  },
  'numpy-loss-function': {
    youtubeId: '30LWjhZzg50',
    title: 'Implement Categorical Cross-Entropy Loss in NumPy',
  },
  'transformers': {
    youtubeId: 'p3sij8QzONQ',
    title: 'Scaled Dot-Product Self-Attention',
  },
  'rag': {
    youtubeId: 'T-D1OfcDW1M',
    title: 'Retrieval Augmented Generation (RAG) Architecture',
  },
  'hashmap-hashing': {
    youtubeId: 'shs0KM3w0zs',
    title: 'Hash Tables & Collision Resolution',
  },
  'python-data-structures': {
    youtubeId: 'k9TUPpGqYTo',
    title: 'Python Data Structures & Memory Model',
  },
  'linear-algebra-calculus': {
    youtubeId: 'fNk_zzaMoSs',
    title: 'Vectors & Linear Transformations',
  },
  'supervised-learning': {
    youtubeId: 'aircAruvnKk',
    title: 'Supervised Learning & Model Evaluation Metrics',
  },
};

interface VideoPlayerProps {
  lessonId?: string;
  youtubeId?: string;
  title: string;
  posterUrl?: string;
  videoUrl?: string;
  duration?: string;
  isLoading?: boolean;
  onEnded?: () => void;
}

/**
 * Accessible, Responsive YouTube Lesson Video Player.
 * Replaces fake controls with real embedded YouTube player inside NOVA's 16:9 aspect ratio card.
 * Supports dynamic video mapping, clean placeholders for unconfigured lessons, and error fallback.
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lessonId = 'backpropagation-computational-graphs',
  youtubeId: explicitYoutubeId,
  title,
  isLoading = false,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);

  // Resolve YouTube video ID dynamically from props or lesson mapping
  const mappedConfig = LESSON_YOUTUBE_VIDEOS[lessonId];
  const activeYoutubeId = explicitYoutubeId || mappedConfig?.youtubeId;
  const activeVideoTitle = mappedConfig?.title || title;

  // Reset error state when lessonId or activeYoutubeId changes
  useEffect(() => {
    setHasError(false);
  }, [lessonId, activeYoutubeId]);

  if (isLoading) {
    return <VideoPlayerSkeleton />;
  }

  // 1. Placeholder for lessons without a configured YouTube video
  if (!activeYoutubeId) {
    return (
      <div className="space-y-2">
        <div className="relative w-full aspect-video rounded-3xl bg-slate-950 overflow-hidden border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center p-6 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 shadow-inner">
            <VideoOff className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-200">Lesson video coming soon</h3>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-medium">
              Our AI curriculum team is creating a high-quality video explanation for "{title}".
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Fallback error UI if YouTube fails to load
  if (hasError) {
    return (
      <div className="space-y-2">
        <div className="relative w-full aspect-video rounded-3xl bg-slate-950 overflow-hidden border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center p-6 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400 shadow-inner">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-200">Unable to load this lesson video</h3>
            <p className="text-xs text-slate-400 max-w-md font-medium">
              YouTube could not be embedded directly in this viewport.
            </p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${activeYoutubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} video directly on YouTube`}
          >
            <Button variant="coral" size="sm" className="gap-2 min-h-[44px]">
              <span>Open on YouTube</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    );
  }

  // 3. Embedded YouTube Iframe Player
  const embedUrl = `https://www.youtube.com/embed/${activeYoutubeId}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`;

  return (
    <div className="space-y-2">
      <div className="relative w-full aspect-video rounded-3xl bg-slate-950 overflow-hidden border border-slate-800 shadow-xl group">
        <iframe
          src={embedUrl}
          title={activeVideoTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full border-0 rounded-3xl"
        />
      </div>
    </div>
  );
};

