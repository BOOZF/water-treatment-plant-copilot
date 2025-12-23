
import React, { useState } from 'react';
import { ModuleType } from './types';
import AlarmWorkspace from './components/AlarmWorkspace';
import MaintenanceWorkspace from './components/MaintenanceWorkspace';
import CopilotSidebar from './components/CopilotSidebar';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.ALARM_INTELLIGENCE);
  const [isCopilotOpen, setIsCopilotOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Global Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-1.5 rounded shadow-lg shadow-blue-500/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-sm tracking-widest text-white">PUB AI-COPILOT <span className="text-slate-500 font-normal ml-2">v3.2</span></h1>
            <p className="text-[9px] text-slate-400 font-mono tracking-tighter uppercase">BEDOK NEWater PLANT | OPS-UNIT-04</p>
          </div>
        </div>

        <nav className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
          <button 
            onClick={() => setActiveModule(ModuleType.ALARM_INTELLIGENCE)}
            className={`px-4 py-1.5 rounded-md transition-all text-xs font-bold uppercase tracking-wider ${activeModule === ModuleType.ALARM_INTELLIGENCE ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
          >
            Alarm Intelligence
          </button>
          <button 
            onClick={() => setActiveModule(ModuleType.PREDICTIVE_MAINTENANCE)}
            className={`px-4 py-1.5 rounded-md transition-all text-xs font-bold uppercase tracking-wider ${activeModule === ModuleType.PREDICTIVE_MAINTENANCE ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
          >
            Asset Health
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-[10px] text-emerald-400 font-mono leading-none font-bold">LIVE STREAM</span>
            <span className="text-[8px] text-slate-500 font-mono uppercase tracking-widest">Latency: 42ms</span>
          </div>
          <button 
            onClick={() => setIsCopilotOpen(!isCopilotOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all ${isCopilotOpen ? 'bg-emerald-600/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isCopilotOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Copilot</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 overflow-hidden flex flex-col min-w-0">
          {activeModule === ModuleType.ALARM_INTELLIGENCE && <AlarmWorkspace />}
          {activeModule === ModuleType.PREDICTIVE_MAINTENANCE && <MaintenanceWorkspace />}
        </div>
        
        {isCopilotOpen && (
          <aside className="w-80 xl:w-96 border-l border-slate-800 bg-slate-900 shadow-2xl z-40 shrink-0">
            <CopilotSidebar />
          </aside>
        )}
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-7 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-4 text-[9px] text-slate-500 uppercase tracking-widest shrink-0 font-mono">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,1)]"></div>
            <span>SCADA CONNECTED</span>
          </div>
          <span>HISTORIAN SYNC: 100%</span>
          <span className="hidden sm:inline">GEO-FENCE: BEDOK_HQ</span>
        </div>
        <div className="flex gap-4">
          <span className="text-blue-400 font-bold">ADVISORY MODE</span>
          <span className="hidden md:inline">OP: E. SEBASTIAN (SNR)</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
