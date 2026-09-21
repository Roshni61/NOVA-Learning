import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  Send,
  Lightbulb,
  Code,
  HelpCircle,
  Brain,
  BarChart3,
  MapPin,
  RefreshCw,
  Mic,
  ArrowRight,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';

interface TutorMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  visualType?: 'hashmap' | 'tree' | 'linkedlist' | 'stack' | 'neuralnet' | 'graph';
  timestamp: string;
}

const TUTOR_MODES = [
  { id: 'teach', title: 'Teach Me', icon: Brain, color: 'bg-purple-100 text-purple-900 border-purple-200', prompt: 'Teach me the core concepts of HashMap collision handling step-by-step.' },
  { id: 'debug', title: 'Debug My Code', icon: Code, color: 'bg-rose-100 text-rose-900 border-rose-200', prompt: 'Here is my code for Cross Entropy Loss. Can you debug why I am getting NaN values?' },
  { id: 'quiz', title: 'Quiz Me', icon: HelpCircle, color: 'bg-emerald-100 text-emerald-900 border-emerald-200', prompt: 'Generate a 3-question quiz testing my knowledge on Backpropagation.' },
  { id: 'explain_mistake', title: 'Explain My Mistake', icon: Lightbulb, color: 'bg-amber-100 text-amber-900 border-amber-200', prompt: 'Why did I get question #2 wrong on matrix calculus?' },
  { id: 'analyze', title: 'Analyze My Progress', icon: BarChart3, color: 'bg-blue-100 text-blue-900 border-blue-200', prompt: 'Analyze my learning speed, retention, and weak areas across all Universe nodes.' },
  { id: 'path', title: 'Build My Path', icon: MapPin, color: 'bg-indigo-100 text-indigo-900 border-indigo-200', prompt: 'Recommend the optimal 30-day learning path for AI/ML Engineer role.' },
  { id: 'revision', title: 'Quick Revision', icon: RefreshCw, color: 'bg-teal-100 text-teal-900 border-teal-200', prompt: 'Give me a 5-minute refresher on Scaled Dot-Product Attention.' },
  { id: 'interview', title: 'Interview Me', icon: Mic, color: 'bg-pink-100 text-pink-900 border-pink-200', prompt: 'Ask me a real Machine Learning system design interview question.' },
];

export const TutorPage: React.FC = () => {
  const location = useLocation();
  const { concepts } = useGoal();

  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'm0',
      sender: 'ai',
      text: `Hello Roshni! I'm NOVA AI, your personal learning intelligence. I track your mastery across all ${concepts.length} Universe nodes. I noticed your HashMap node is currently at 48% (Knowledge Gap). What would you like to explore or solve together?`,
      visualType: 'hashmap',
      timestamp: 'Just now',
    },
  ]);

  useEffect(() => {
    if (location.state && (location.state as any).prompt) {
      handleSendMessage((location.state as any).prompt);
    }
  }, [location.state]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: TutorMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Simulated AI Intelligence Engine Response
    setTimeout(() => {
      let aiText = `I analyzed your telemetry for '${query}'. In computational graphs and machine learning architecture, parameters update according to the negative gradient direction multiplied by learning rate α.`;
      let visual: TutorMessage['visualType'] = undefined;

      if (query.toLowerCase().includes('hashmap') || query.toLowerCase().includes('teach')) {
        aiText = "Here is an interactive structural visualization of HashMap collision resolution via Chaining. Keys map to hash indexes, and colliding items form linked bucket chains:";
        visual = 'hashmap';
      } else if (query.toLowerCase().includes('neural') || query.toLowerCase().includes('backprop')) {
        aiText = "Here is the Neural Network computational flow diagram showing forward activation pass and backward error propagation:";
        visual = 'neuralnet';
      } else if (query.toLowerCase().includes('tree')) {
        aiText = "Here is the Binary Tree hierarchy visualization:";
        visual = 'tree';
      }

      const aiMsg: TutorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        visualType: visual,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 700);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-8">
      {/* AI TUTOR HERO BANNER */}
      <Card className="bg-gradient-to-br from-nova-charcoal via-slate-900 to-purple-950 p-8 rounded-3xl border border-slate-800 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-nova-coral/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-nova-lavender/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          {/* Animated AI Orb */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-nova-coral via-nova-lavender to-nova-mint p-1 shadow-2xl animate-pulse">
              <div className="w-full h-full bg-nova-charcoal rounded-[22px] flex items-center justify-center">
                <Bot className="w-10 h-10 text-nova-coral" />
              </div>
            </div>
          </div>

          <Badge variant="lavender" className="bg-white/10 text-purple-200 border-white/20">
            NOVA AI • Continuous Learning Engine
          </Badge>

          <h1 className="text-3xl font-black tracking-tight text-white">
            Your Personal Learning Intelligence
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed">
            "I know what you're learning, where you're struggling, and what to explain next."
          </p>
        </div>
      </Card>

      {/* 8 TUTOR MODES GRID */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-nova-charcoal uppercase tracking-wider">
          Select Tutor Mode
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TUTOR_MODES.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                onClick={() => handleSendMessage(mode.prompt)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between space-y-3 ${mode.color}`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-white/80 flex items-center justify-center font-bold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </div>
                <h4 className="text-xs font-bold">{mode.title}</h4>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHAT SESSION CONTAINER */}
      <Card className="bg-white p-6 border border-gray-100 rounded-3xl shadow-nova-soft space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-nova-coral" />
            <span className="text-xs font-black text-nova-charcoal">Active AI Tutor Session</span>
          </div>
          <Badge variant="mint">Synced with Universe</Badge>
        </div>

        {/* Message Thread */}
        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-nova-charcoal text-nova-coral flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-2xl space-y-3 ${
                  m.sender === 'user'
                    ? 'bg-nova-charcoal text-white rounded-br-none shadow-md'
                    : 'bg-nova-bg border border-gray-200 text-nova-charcoal rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed font-medium text-xs">{m.text}</p>

                {/* AI VISUAL DIAGRAM RENDERER */}
                {m.sender === 'ai' && m.visualType === 'hashmap' && (
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-[11px] text-center my-2">
                    <div className="text-purple-300 font-bold uppercase text-[10px]">
                      HashMap Structural Diagram
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="p-2 bg-slate-800 rounded-lg text-nova-coral">Key: "name"</span>
                      <span>→</span>
                      <span className="p-2 bg-purple-900 rounded-lg text-purple-200">Hash: 0x8F</span>
                      <span>→</span>
                      <span className="p-2 bg-emerald-950 rounded-lg text-emerald-300">Bucket [4]</span>
                    </div>
                  </div>
                )}

                {m.sender === 'ai' && m.visualType === 'neuralnet' && (
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-[11px] text-center my-2">
                    <div className="text-purple-300 font-bold uppercase text-[10px]">
                      Neural Network Forward/Backward Pass
                    </div>
                    <div className="flex items-center justify-around gap-2 text-slate-300">
                      <div className="p-2 bg-slate-800 rounded-lg">Input [X]</div>
                      <span>→</span>
                      <div className="p-2 bg-purple-950 rounded-lg border border-purple-700">Hidden Layer [W1*X + b1]</div>
                      <span>→</span>
                      <div className="p-2 bg-rose-950 rounded-lg border border-rose-700">Loss [L]</div>
                    </div>
                  </div>
                )}

                {/* Response Action Chips */}
                {m.sender === 'ai' && (
                  <div className="flex items-center gap-1.5 pt-2 border-t border-gray-200/60 overflow-x-auto">
                    {['Explain Simpler', 'Give Example', 'Show Diagram', 'Quiz Me'].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => handleSendMessage(`${chip} for this topic`)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-purple-100 text-[10px] font-bold text-nova-charcoal border border-gray-200 transition-all flex-shrink-0"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-nova-muted block text-right">{m.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask NOVA AI anything about your concepts or code..."
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-nova-lavender"
          />
          <Button variant="coral" size="md" onClick={() => handleSendMessage()} className="rounded-2xl px-5 py-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
