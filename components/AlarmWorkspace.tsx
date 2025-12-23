
import React, { useState, useEffect } from 'react';
import { AlarmSituation, AlarmItem } from '../types';
import { MOCK_SITUATIONS, MOCK_ALARM_ITEMS } from '../constants';
import { getRCAExplanation } from '../services/geminiService';

const AlarmWorkspace: React.FC = () => {
  const [situations] = useState<AlarmSituation[]>(MOCK_SITUATIONS);
  const [selectedId, setSelectedId] = useState<string>(MOCK_SITUATIONS[0].id);
  const [alarms, setAlarms] = useState<AlarmItem[]>(MOCK_ALARM_ITEMS[MOCK_SITUATIONS[0].id] || []);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string>("Initializing analysis engine...");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setAlarms(MOCK_ALARM_ITEMS[selectedId] || []);
    setIsConfirmed(false);
    generateExplanation(selectedId);
  }, [selectedId]);

  const generateExplanation = async (id: string) => {
    setIsGenerating(true);
    const situation = situations.find(s => s.id === id);
    const evidence = MOCK_ALARM_ITEMS[id]?.map(a => `${a.assetName}: ${a.description}`).join(', ') || "";
    const res = await getRCAExplanation(situation?.title || "", evidence);
    setAiExplanation(res);
    setIsGenerating(false);
  };

  const selectedSituation = situations.find(s => s.id === selectedId);

  return (
    <div className="flex h-full w-full bg-slate-950 min-w-0">
      {/* LEFT PANEL: Situations - Fixed width but slightly narrower */}
      <div className="w-64 xl:w-72 border-r border-slate-800 flex flex-col overflow-hidden bg-slate-900/30 shrink-0">
        <div className="p-3 border-b border-slate-800 bg-slate-900/50">
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Situations</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {situations.map(sit => (
            <button
              key={sit.id}
              onClick={() => setSelectedId(sit.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                selectedId === sit.id 
                ? 'bg-blue-600/10 border-blue-500/50 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]' 
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex justify-between items-start mb-1.5">
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${
                  sit.riskScore > 80 ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                }`}>
                  Risk {sit.riskScore}%
                </span>
                <span className="text-[9px] text-slate-600 font-mono">#{sit.id}</span>
              </div>
              <h3 className={`text-xs font-bold leading-tight mb-2 ${selectedId === sit.id ? 'text-white' : 'text-slate-400'}`}>
                {sit.title}
              </h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 bg-slate-950/50 px-1.5 py-0.5 rounded border border-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <span className="text-[9px] text-slate-400 font-bold">{sit.criticalCount}</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-950/50 px-1.5 py-0.5 rounded border border-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span className="text-[9px] text-slate-400 font-bold">{sit.warningCount}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CENTER PANEL: Root Cause Analysis - FLEX GROW */}
      <div className="flex-1 flex flex-col border-r border-slate-800 overflow-hidden min-w-0">
        <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">RCA Evidence Chain</h2>
            {isConfirmed && (
              <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded uppercase font-bold tracking-widest animate-pulse">
                Suppression Active
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-500 font-mono italic">Topology Correlation: Enabled</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950">
          {alarms.map(alarm => (
            <div 
              key={alarm.id} 
              className={`p-4 rounded-xl border relative transition-all duration-300 ${
                alarm.isRootCause 
                ? 'bg-blue-600/5 border-blue-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
                : isConfirmed 
                  ? 'bg-slate-900/20 border-slate-800 opacity-30 scale-[0.98]' 
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-xs font-black uppercase tracking-widest ${alarm.isRootCause ? 'text-blue-400' : 'text-slate-500'}`}>
                      {alarm.isRootCause ? 'Primary Root Cause' : 'Downstream Symptom'}
                    </h4>
                    <span className="text-[9px] text-slate-600 font-mono">{alarm.timestamp}</span>
                  </div>
                  <h5 className="font-bold text-slate-100 text-sm tracking-tight">{alarm.assetName}</h5>
                  <p className="text-xs text-red-500 font-mono mt-0.5 font-bold">{alarm.description}</p>
                </div>
                {alarm.isRootCause && !isConfirmed && (
                   <button 
                    onClick={() => setIsConfirmed(true)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-black rounded uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
                  >
                    Confirm & Suppress
                  </button>
                )}
              </div>
              
              <div className="mt-3 p-3 bg-slate-950/80 rounded-lg border border-slate-800/50">
                <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                  "{alarm.explanation}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: Explanation - Flexible width with max constraint */}
      <div className="hidden 2xl:flex flex-col w-80 xl:w-96 overflow-hidden bg-slate-900/20 shrink-0">
        <div className="p-3 border-b border-slate-800 bg-slate-900/50">
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logic Visualization</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Consulting Topology Graph...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">AI Narrative Reasoning</h4>
                <div className="text-xs text-slate-400 leading-relaxed space-y-3 font-light">
                  {aiExplanation.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Confidence Metrics</h4>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                   <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Model Confidence</span>
                      <span className="text-[10px] text-blue-400 font-mono font-bold">94.2%</span>
                   </div>
                   <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[94.2%] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlarmWorkspace;
