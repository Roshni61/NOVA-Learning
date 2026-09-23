import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Subtitles, RotateCcw } from 'lucide-react';
import { VideoPlayerSkeleton } from '../ui';
import { useCourseProgress } from '../../hooks';

interface VideoPlayerProps {
  lessonId?: string;
  title: string;
  posterUrl?: string;
  videoUrl?: string;
  duration?: string;
  isLoading?: boolean;
  onEnded?: () => void;
}

/**
 * Accessible, Responsive Video Player component with aspect-video container,
 * 44x44px touch targets, explicit aria-label attributes, CLS prevention, and
 * timestamp sync with useCourseProgress persistence.
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lessonId = 'l_1',
  title,
  posterUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  duration = '12:45',
  isLoading = false,
  onEnded,
}) => {
  const { getPlaybackTimestamp, savePlaybackTimestamp } = useCourseProgress();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(() => {
    const saved = getPlaybackTimestamp(lessonId);
    return saved > 0 ? saved : 35; // Default 35% or restored timestamp
  });

  // Keep state synced with hook when lessonId changes
  useEffect(() => {
    const saved = getPlaybackTimestamp(lessonId);
    if (saved > 0) {
      setProgress(saved);
    }
  }, [lessonId, getPlaybackTimestamp]);

  if (isLoading) {
    return <VideoPlayerSkeleton />;
  }

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
    if (!isPlaying && progress >= 100) {
      setProgress(0);
      savePlaybackTimestamp(lessonId, 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setProgress(val);
    savePlaybackTimestamp(lessonId, val);
    if (val >= 100 && onEnded) {
      onEnded();
    }
  };

  return (
    <div className="space-y-2">
      {/* Aspect Ratio Container (aspect-video: 16/9 ratio) to prevent CLS */}
      <div className="relative w-full aspect-video rounded-3xl bg-slate-950 overflow-hidden border border-slate-800 shadow-xl group">
        {/* Background Poster Image */}
        <img
          src={posterUrl}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isPlaying ? 'opacity-30' : 'opacity-70'
          }`}
        />

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Central Play/Pause Watermark Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTogglePlay}
            aria-label={isPlaying ? `Pause video: ${title}` : `Play video: ${title}`}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-nova-coral/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm min-h-[44px] min-w-[44px] cursor-pointer transition-all hover:bg-rose-500 hover:glow-coral"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </motion.button>
        </div>

        {/* Closed Captions Banner Overlay */}
        {showCaptions && isPlaying && (
          <div className="absolute bottom-16 left-6 right-6 text-center pointer-events-none">
            <span className="bg-black/85 text-white text-xs sm:text-sm font-medium px-4 py-1.5 rounded-xl border border-white/10 backdrop-blur-md inline-block shadow-lg">
              "The partial derivative dL/dW propagates backward across intermediate autograd nodes."
            </span>
          </div>
        )}

        {/* Video Player Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-2 opacity-95 transition-opacity duration-300">
          {/* Seek Progress Bar */}
          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={handleSeek}
              aria-label={`Seek video progress for ${title}`}
              className="w-full h-1.5 bg-slate-700 accent-nova-coral rounded-lg cursor-pointer transition-all hover:h-2"
            />
          </div>

          {/* Controls Bar Row */}
          <div className="flex items-center justify-between text-white text-xs">
            {/* Left Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Pause lesson video' : 'Play lesson video'}
                className="p-2.5 rounded-xl hover:bg-white/10 transition-all text-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                className="p-2.5 rounded-xl hover:bg-white/10 transition-all text-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <button
                onClick={() => {
                  setProgress(0);
                  savePlaybackTimestamp(lessonId, 0);
                }}
                aria-label="Replay lesson video from beginning"
                className="p-2.5 rounded-xl hover:bg-white/10 transition-all text-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer hidden sm:flex"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="text-slate-300 font-mono text-[11px] ml-1">
                {Math.floor((progress / 100) * 12)}:{String(Math.floor(((progress / 100) * 45) % 60)).padStart(2, '0')} / {duration}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                aria-label={showCaptions ? 'Disable closed captions' : 'Enable closed captions'}
                className={`p-2.5 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ${
                  showCaptions ? 'bg-nova-coral text-white' : 'hover:bg-white/10 text-slate-300'
                }`}
              >
                <Subtitles className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    const el = document.documentElement;
                    if (el.requestFullscreen) el.requestFullscreen();
                  }
                }}
                aria-label="Toggle full screen mode"
                className="p-2.5 rounded-xl hover:bg-white/10 transition-all text-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
