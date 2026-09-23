import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, X, Send, Trash2, ShieldAlert } from 'lucide-react';
import { useGoal } from '../../context/GoalContext';
import { useLearnerBrain } from '../../context/LearnerBrainContext';
import { getSocraticResponse } from '../../services/aiTutorService';
import type { ChatMessage, LearnerContext } from '../../services/aiTutorService';

export const NovaAiCopilot: React.FC = () => {
  const { targetGoal } = useGoal();
  const { getConceptsAtRisk } = useLearnerBrain();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const conceptsAtRisk = getConceptsAtRisk();
  const primaryRisk = conceptsAtRisk[0]?.name || 'HashMap Collision Handling';

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello! I am **NOVA**, your Socratic AI Copilot, calibrated for your target goal as an **${targetGoal || 'AI/ML Engineer'}**.\n\nInstead of just handing out raw code, I will ask guiding questions and provide 3-level progressive hints to deepen your conceptual understanding.\n\nHow can I assist your study today?`,
      timestamp: Date.now(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Global Keyboard Shortcut: Cmd+J or Ctrl+J
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    const learnerContext: LearnerContext = {
      goal: targetGoal || 'AI/ML Engineer',
      activeCourse: 'Deep Learning & Neural Architectures',
      activeMisconceptions: primaryRisk ? [primaryRisk] : [],
      weakConcepts: conceptsAtRisk.map((c) => c.name),
    };

    try {
      const responseText = await getSocraticResponse(query, messages, learnerContext);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('[NovaAiCopilot] Failed to fetch completion:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'assistant',
        text: `Chat reset! Ready for your next Socratic inquiry towards **${targetGoal || 'AI/ML Engineer'}**.`,
        timestamp: Date.now(),
      },
    ]);
  };

  const quickPrompts = [
    { label: 'Explain my HashMap gap', text: `Can you explain why I have a gap in ${primaryRisk} and test me on it?` },
    { label: 'Give me a hint', text: 'Give me a Level 1 conceptual hint for my current study topic.' },
    { label: 'Test my understanding', text: 'Ask me a tough Socratic question to test my readiness.' },
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle NOVA Socratic AI Copilot"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 group cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
        </div>
        <span className="font-bold text-sm tracking-tight hidden sm:inline">NOVA AI</span>
        <span className="text-[10px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded-full border border-white/10 group-hover:bg-white/30 transition-colors">
          ⌘J
        </span>
      </button>

      {/* Slide-Over Drawer Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="NOVA Socratic AI Copilot"
          className="fixed bottom-20 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[430px] h-[580px] max-h-[80vh] rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
                  NOVA Socratic Copilot
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Target: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{targetGoal}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Clear Chat History"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Drawer"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Telemetry Bar */}
          {primaryRisk && (
            <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs text-amber-700 dark:text-amber-300">
              <div className="flex items-center gap-1.5 font-medium truncate">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span className="truncate">Active Knowledge Gap: <strong>{primaryRisk}</strong></span>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/20 px-1.5 py-0.5 rounded font-bold">Injected</span>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 shadow-sm">
                    N
                  </div>
                )}

                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-sm font-medium'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200/60 dark:border-slate-700/60 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  N
                </div>
                <div className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.text)}
                disabled={isLoading}
                className="flex-shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer disabled:opacity-50"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask NOVA Socratic Copilot..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 rounded-xl bg-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
