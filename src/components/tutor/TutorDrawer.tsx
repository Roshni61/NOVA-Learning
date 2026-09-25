import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Sparkles,
  Bot,
  Lightbulb,
  Code,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { Button } from '../ui';
import { useGoal } from '../../context/GoalContext';
import { askGeminiTutor } from '../../lib/gemini';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const ACTION_CHIPS = [
  { label: 'Teach Me', icon: Lightbulb, mode: 'teach' },
  { label: 'Give Me a Hint', icon: HelpCircle, mode: 'teach' },
  { label: 'Explain Differently', icon: Sparkles, mode: 'teach' },
  { label: 'Debug My Code', icon: Code, mode: 'debug' },
  { label: 'Simplify It', icon: Zap, mode: 'teach' },
];

export const TutorDrawer: React.FC = () => {
  const { concepts, selectedConceptId, targetGoal, streak, userXP, userLevel } = useGoal();
  const activeConcept = concepts.find((c) => c.id === selectedConceptId) || concepts[0];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hey there! I'm NOVA AI, your continuous learning tutor. Active Context: '${activeConcept.name}' (${activeConcept.mastery}% mastery). How can I guide your next move?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleSendMessage = async (textToSend?: string, modeOverride?: string) => {
    const rawQuery = textToSend || input;
    if (!rawQuery.trim()) return;

    let actualQuery = rawQuery;
    let mode = modeOverride || 'teach';

    // Map Action Chips to specific contextual requests
    if (rawQuery === 'Teach Me') {
      actualQuery = `Teach me the core concepts of ${activeConcept.name} step-by-step.`;
      mode = 'teach';
    } else if (rawQuery === 'Give Me a Hint') {
      actualQuery = `Give me a subtle hint to solve ${activeConcept.name} without giving away the full answer.`;
      mode = 'teach';
    } else if (rawQuery === 'Explain Differently') {
      actualQuery = `Explain ${activeConcept.name} using a completely different mental model or real-world analogy.`;
      mode = 'teach';
    } else if (rawQuery === 'Debug My Code') {
      actualQuery = `Analyze and debug my code for ${activeConcept.name}. Identify errors and show corrected code.`;
      mode = 'debug';
    } else if (rawQuery === 'Simplify It') {
      actualQuery = `Simplify ${activeConcept.name} in plain language so a beginner can understand.`;
      mode = 'teach';
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: rawQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsThinking(true);

    // Format conversation history for memory
    const history = messages.map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      parts: m.text,
    }));

    // Call Central Gemini AI Tutor Engine
    const aiResponseText = await askGeminiTutor(actualQuery, {
      conceptName: activeConcept.name,
      mastery: activeConcept.mastery,
      weakPoints: activeConcept.weakPoints,
      targetGoal,
      tutorMode: mode,
      history,
      userXP,
      userLevel,
      streak,
    });

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiResponseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsThinking(false);
  };

  return (
    <>
      {/* Floating Action Launcher Dock (Bottom-Right) */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Quick Action Chips when Dock is closed */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden sm:flex flex-wrap items-center justify-end gap-2 max-w-md bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-gray-200/80 shadow-xl"
          >
            {ACTION_CHIPS.slice(0, 3).map((chip) => {
              const Icon = chip.icon;
              return (
                <button
                  key={chip.label}
                  onClick={() => {
                    setIsOpen(true);
                    handleSendMessage(chip.label, chip.mode);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-nova-bg hover:bg-purple-100 text-xs font-semibold text-nova-charcoal flex items-center gap-1.5 transition-all border border-gray-200/60 cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-nova-coral" />
                  {chip.label}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Main Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 px-5 rounded-2xl bg-gradient-to-r from-nova-coral via-rose-500 to-purple-600 text-white font-bold shadow-nova-soft hover:shadow-nova-hover hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-3 border border-white/20 cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 ring-2 ring-nova-charcoal" />
          </div>
          <span className="text-sm">Contextual AI Tutor</span>
        </button>
      </div>

      {/* Slide-over Drawer Container */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Slide-over Panel */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-gray-200"
              >
                {/* Drawer Header */}
                <div className="p-5 border-b border-gray-100 bg-nova-bg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-nova-charcoal text-nova-coral flex items-center justify-center font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-nova-charcoal text-sm">NOVA AI Tutor</h3>
                      <p className="text-[11px] text-nova-muted flex items-center gap-1">
                        Active Topic: <strong className="text-purple-700">{activeConcept.name}</strong> ({activeConcept.mastery}%)
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-200 text-nova-muted cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages List */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex gap-3 text-xs ${
                        m.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {m.sender === 'ai' && (
                        <div className="w-7 h-7 rounded-lg bg-nova-coral text-white flex items-center justify-center font-bold flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3.5 rounded-2xl ${
                          m.sender === 'user'
                            ? 'bg-nova-charcoal text-white rounded-br-none'
                            : 'bg-nova-bg border border-gray-200/80 text-nova-charcoal rounded-bl-none'
                        }`}
                      >
                        <div className="leading-relaxed font-medium whitespace-pre-wrap">{m.text}</div>
                        <span className="text-[10px] text-nova-muted mt-1 block text-right">
                          {m.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isThinking && (
                    <div className="flex items-center gap-2 text-xs text-purple-700 font-bold bg-purple-50 p-3 rounded-2xl w-fit">
                      <Bot className="w-4 h-4 text-nova-coral animate-bounce" />
                      <span>NOVA AI is thinking...</span>
                    </div>
                  )}
                </div>

                {/* Action Chips Strip inside Drawer */}
                <div className="px-4 py-2 bg-nova-bg/60 border-t border-gray-100 flex items-center gap-2 overflow-x-auto">
                  {ACTION_CHIPS.map((chip) => {
                    const Icon = chip.icon;
                    return (
                      <button
                        key={chip.label}
                        onClick={() => handleSendMessage(chip.label, chip.mode)}
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-purple-100 text-[11px] font-semibold text-nova-charcoal flex items-center gap-1 transition-all border border-gray-200 flex-shrink-0 cursor-pointer"
                      >
                        <Icon className="w-3 h-3 text-nova-coral" />
                        {chip.label}
                      </button>
                    );
                  })}
                </div>

                {/* Input Bar */}
                <div className="p-4 border-t border-gray-200 bg-white flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask AI Tutor anything..."
                    className="flex-1 px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-nova-lavender"
                  />
                  <Button
                    variant="coral"
                    size="sm"
                    onClick={() => handleSendMessage()}
                    className="rounded-2xl p-2.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TutorDrawer;
