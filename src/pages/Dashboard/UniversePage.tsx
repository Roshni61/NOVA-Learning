import React, { useState, useMemo, useCallback } from 'react';
import type { Node, Edge } from '@xyflow/react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';
import {
  Search,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  AlertTriangle,
  TrendingUp,
  BrainCircuit,
  Send,
} from 'lucide-react';
import { Button, Badge } from '../../components/ui';
import { ConceptNodeComponent } from '../../components/universe/ConceptNodeComponent';
import { ConceptInspectorDrawer } from '../../components/universe/ConceptInspectorDrawer';
import { ExplainConceptModal } from '../../components/universe/ExplainConceptModal';
import { useGoal } from '../../context/GoalContext';

const nodeTypes = {
  conceptNode: ConceptNodeComponent,
};

const FLOATING_PARTICLES = [
  'Python', 'HashMap', 'Arrays', 'Neural Networks', 'RAG', 'SQL',
  'Transformers', 'Calculus', 'FastAPI', 'Backprop', 'Embeddings', 'MLOps'
];

export const UniversePage: React.FC = () => {
  const {
    concepts,
    edges: initialEdges,
    selectedConceptId,
    selectConcept,
    mastery,
  } = useGoal();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [universeCommand, setUniverseCommand] = useState<string>('');
  const [isExplainModalOpen, setIsExplainModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Filter concepts based on search and status chips
  const filteredConcepts = useMemo(() => {
    return concepts.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.category.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      if (selectedFilter === 'All') return true;
      if (selectedFilter === 'Mastered') return c.status === 'Mastered';
      if (selectedFilter === 'Developing') return c.status === 'Developing';
      if (selectedFilter === 'Needs Practice') return c.status === 'Needs Practice';
      if (selectedFilter === 'Knowledge Gap') return c.status === 'Knowledge Gap';
      if (selectedFilter === 'Unexplored') return c.status === 'Unexplored' || c.status === 'Locked';
      return true;
    });
  }, [concepts, searchTerm, selectedFilter]);

  // Convert concepts to React Flow Nodes
  const initialNodes: Node[] = useMemo(() => {
    return filteredConcepts.map((c) => ({
      id: c.id,
      type: 'conceptNode',
      position: c.position || { x: 0, y: 0 },
      data: { ...c, selected: selectedConceptId === c.id },
    }));
  }, [filteredConcepts, selectedConceptId]);

  // Convert edges to React Flow Edges
  const initialReactFlowEdges: Edge[] = useMemo(() => {
    const validConceptIds = new Set(filteredConcepts.map((c) => c.id));
    return initialEdges
      .filter((e) => validConceptIds.has(e.source) && validConceptIds.has(e.target))
      .map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        animated: e.animated,
        style: {
          stroke: e.type === 'weak' ? '#FF6B6B' : e.type === 'prerequisite' ? '#A78BFA' : '#34D399',
          strokeWidth: e.type === 'weak' ? 2.5 : 1.8,
          strokeDasharray: e.type === 'weak' ? '5,5' : undefined,
        },
      }));
  }, [filteredConcepts, initialEdges]);

  const [, , onNodesChange] = useNodesState(initialNodes);
  const [, , onEdgesChange] = useEdgesState(initialReactFlowEdges);

  const selectedConcept = useMemo(
    () => concepts.find((c) => c.id === selectedConceptId) || null,
    [concepts, selectedConceptId]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      selectConcept(node.id);
    },
    [selectConcept]
  );

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!universeCommand.trim()) return;
    // Command execution filter or selection
    if (universeCommand.toLowerCase().includes('hashmap')) {
      selectConcept('hashmap');
    } else if (universeCommand.toLowerCase().includes('gap') || universeCommand.toLowerCase().includes('weak')) {
      setSelectedFilter('Knowledge Gap');
    }
    setUniverseCommand('');
  };

  return (
    <div className={`space-y-6 relative ${isFullscreen ? 'fixed inset-0 z-50 bg-nova-bg p-6 overflow-hidden' : ''}`}>
      {/* UNIVERSE HEADER */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-nova-soft flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="lavender" className="gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Continuous Knowledge Galaxy
          </Badge>
          <h1 className="text-3xl font-black text-nova-charcoal tracking-tight">MY UNIVERSE</h1>
          <p className="text-sm text-nova-muted font-medium">
            "Your knowledge, mapped by mastery, memory and dependency."
          </p>
        </div>

        {/* Compact Intelligence Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-nova-bg p-4 rounded-2xl border border-gray-200 text-center">
          <div>
            <div className="text-[10px] text-nova-muted font-bold">Overall Mastery</div>
            <div className="text-xl font-black text-nova-charcoal">{mastery}%</div>
          </div>
          <div>
            <div className="text-[10px] text-nova-muted font-bold">Concepts Explored</div>
            <div className="text-xl font-black text-purple-700">42 / 180</div>
          </div>
          <div>
            <div className="text-[10px] text-nova-muted font-bold">Knowledge Gaps</div>
            <div className="text-xl font-black text-nova-coral flex items-center justify-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> 7
            </div>
          </div>
          <div>
            <div className="text-[10px] text-nova-muted font-bold">Momentum</div>
            <div className="text-xl font-black text-emerald-600 flex items-center justify-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> ↑ 18%
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-[10px] text-nova-muted font-bold">Last Synced</div>
            <div className="text-xs font-bold text-nova-charcoal mt-1">Just now</div>
          </div>
        </div>
      </div>

      {/* UNIVERSE TOOLBAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search concepts..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-nova-lavender"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Mastered', 'Developing', 'Needs Practice', 'Knowledge Gap', 'Unexplored'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === f
                  ? 'bg-nova-charcoal text-white shadow-sm'
                  : 'bg-nova-bg text-nova-muted hover:bg-gray-200 hover:text-nova-charcoal'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl border border-gray-200 bg-nova-bg hover:bg-white text-nova-charcoal text-xs font-bold flex items-center gap-1"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedFilter('All');
              selectConcept(null);
            }}
            className="p-2 rounded-xl border border-gray-200 bg-nova-bg hover:bg-white text-nova-charcoal text-xs font-bold"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MAIN SPATIAL CANVAS CONTAINER */}
      <div className="relative w-full h-[620px] bg-gradient-to-br from-slate-900 via-nova-charcoal to-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Floating Particles Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30">
          {FLOATING_PARTICLES.map((particle, i) => (
            <motion.span
              key={particle}
              animate={{
                x: [0, (i % 2 === 0 ? 30 : -30), 0],
                y: [0, (i % 3 === 0 ? 40 : -40), 0],
              }}
              transition={{ repeat: Infinity, duration: 12 + i * 2, ease: 'easeInOut' }}
              className="absolute text-[11px] font-mono font-bold text-purple-300 opacity-60 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40"
              style={{
                top: `${(i * 15) % 80 + 10}%`,
                left: `${(i * 18) % 85 + 5}%`,
              }}
            >
              {particle}
            </motion.span>
          ))}
        </div>

        {/* React Flow Spatial Graph */}
        <ReactFlow
          nodes={initialNodes}
          edges={initialReactFlowEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-transparent"
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#334155" />
          <Controls className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg text-nova-charcoal" />
          <MiniMap
            nodeColor={(node) => (node.data as any)?.status === 'Mastered' ? '#10B981' : '#FF6B6B'}
            className="rounded-2xl border border-gray-800 shadow-xl overflow-hidden bg-slate-900"
          />
        </ReactFlow>

        {/* Right-Side Concept Inspector Drawer */}
        <div className="absolute top-0 right-0 bottom-0 z-30 flex">
          <ConceptInspectorDrawer
            concept={selectedConcept}
            onClose={() => selectConcept(null)}
            onExplain={() => setIsExplainModalOpen(true)}
          />
        </div>
      </div>

      {/* BOTTOM UNIVERSE AI COMMAND BAR */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-lg">
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-nova-charcoal text-nova-coral flex items-center justify-center font-bold">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={universeCommand}
            onChange={(e) => setUniverseCommand(e.target.value)}
            placeholder='Ask your Universe... (e.g. "What should I learn next?", "Why am I weak in HashMap?", "Show Knowledge Gaps")'
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-nova-lavender"
          />
          <Button variant="coral" size="sm" type="submit" className="rounded-xl px-4 py-2.5">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>

      {/* Explain Concept Modal */}
      <ExplainConceptModal
        concept={selectedConcept}
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
      />
    </div>
  );
};
