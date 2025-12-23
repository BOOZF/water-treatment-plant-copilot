
import React, { useState } from 'react';
import { MOCK_ASSETS } from '../constants';
import { AssetHealth } from '../types';

const MaintenanceWorkspace: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<AssetHealth | null>(MOCK_ASSETS[0]);

  // Simulated Health Trend (SVG)
  const renderTrend = (score: number) => {
    const points = score > 70 
      ? "0,20 20,18 40,22 60,15 80,18 100,20" 
      : score > 50 
        ? "0,20 20,25 40,30 60,45 80,55 100,60" 
        : "0,20 20,40 40,65 60,85 80,95 100,98";
    
    return (
      <div className="h-24 w-full bg-slate-900/50 rounded-lg border border-slate-800 p-2 relative overflow-hidden group">
        <div className="absolute top-2 left-2 text-[8px] font-bold text-slate-500 uppercase">30-Day Health Forecast</div>
        <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={score < 50 ? "#f87171" : score < 80 ? "#fbbf24" : "#34d399"}
            strokeWidth="2"
            points={points}
            className="transition-all duration-1000"
          />
          <path
            d={`M${points} L100,100 L0,100 Z`}
            fill={score < 50 ? "rgba(248,113,113,0.1)" : score < 80 ? "rgba(251,191,36,0.1)" : "rgba(52,211,153,0.1)"}
          />
        </svg>
        <div className="absolute bottom-2 right-2 flex gap-1 items-center">
            <span className="text-[8px] text-slate-500 uppercase font-mono tracking-tighter">Est. Failure</span>
            <span className={`text-[10px] font-black ${score < 50 ? 'text-red-400' : 'text-slate-400'}`}>{selectedAsset?.operatingWindow}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full bg-slate-950 overflow-hidden min-w-0">
      {/* LEFT: Flexible Asset Grid */}
      <div className="flex-1 overflow-y-auto p-4 xl:p-6 bg-slate-950 min-w-0">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight underline decoration-blue-500/50 underline-offset-8">Predictive Asset Management</h2>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-2">Active Learning Model: G-RUL-V3</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
             <div className="flex flex-col items-end">
                <span className="text-[9px] text-slate-500 font-bold uppercase">Sync Status</span>
                <span className="text-[10px] text-emerald-400 font-mono">Real-time (Active)</span>
             </div>
             <button className="bg-slate-800 hover:bg-slate-700 text-[10px] text-white font-bold py-1.5 px-3 rounded border border-slate-700 uppercase tracking-widest">
                Refresh Models
             </button>
          </div>
        </div>

        {/* Improved Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {MOCK_ASSETS.map(asset => (
            <button
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 relative group ${
                selectedAsset?.id === asset.id 
                ? 'bg-blue-600/5 border-blue-500 shadow-xl shadow-blue-900/10 scale-[1.02]' 
                : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-600 hover:bg-slate-900/60 shadow-lg shadow-black/20'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-1.5 rounded-lg border ${
                  asset.riskLevel === 'High' ? 'bg-red-500/10 border-red-500/30 text-red-400' : asset.riskLevel === 'Medium' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-black font-mono leading-none ${
                    asset.healthScore < 50 ? 'text-red-400' : asset.healthScore < 80 ? 'text-orange-400' : 'text-emerald-400'
                  }`}>
                    {asset.healthScore}
                  </div>
                  <div className="text-[9px] mt-1 font-black uppercase tracking-widest text-slate-500">
                    Health Pct
                  </div>
                </div>
              </div>

              <h3 className={`text-sm font-bold truncate tracking-tight mb-1 ${selectedAsset?.id === asset.id ? 'text-white' : 'text-slate-300'}`}>
                {asset.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${asset.riskLevel === 'High' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {asset.riskLevel} Risk
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">Conf: {(asset.confidence * 100).toFixed(0)}%</span>
              </div>
              
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
                <span className="flex items-center gap-1">
                    <div className={`w-1 h-1 rounded-full ${asset.direction === 'degrading' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                    Remaining Useful Life
                </span>
                <span className={`font-black ${asset.riskLevel === 'High' ? 'text-red-400' : 'text-blue-400'}`}>
                   {asset.operatingWindow}
                </span>
              </div>
              
              <div className="mt-2 w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/50">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    asset.healthScore < 50 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : asset.healthScore < 80 ? 'bg-orange-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${asset.healthScore}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Detail Panel */}
      <div className="hidden lg:flex flex-col w-80 xl:w-[400px] border-l border-slate-800 bg-slate-900 shrink-0">
        {selectedAsset ? (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-5 border-b border-slate-800 bg-slate-900/80">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Asset Diagnostics</h3>
                <span className="text-[9px] font-mono text-blue-400 px-1.5 py-0.5 border border-blue-500/30 rounded uppercase bg-blue-500/5">AI Analysis Complete</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-4 tracking-tight">{selectedAsset.name}</h2>
              
              <div className="space-y-4">
                {renderTrend(selectedAsset.healthScore)}
                
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                  <div className="text-[10px] font-black text-slate-500 uppercase mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                      Intelligence Brief
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    The predictive engine has identified a <span className="text-blue-400 font-bold underline decoration-blue-500/50">non-linear degradation</span> pattern in {selectedAsset.drivers[0].name.toLowerCase()} trends.
                    Failure is estimated in <span className="text-white font-bold">{selectedAsset.operatingWindow}</span> with a confidence level of <span className="text-emerald-400">{(selectedAsset.confidence * 100).toFixed(1)}%</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-8 scrollbar-thin">
              {/* Feature Metrics */}
              <section>
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leading Failure Indicators</h4>
                    <span className="text-[9px] text-slate-500 font-mono italic">Source: IoT Gateway 04</span>
                </div>
                <div className="space-y-3">
                  {selectedAsset.drivers.map(driver => (
                    <div key={driver.name} className="p-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-600 transition-all group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-200 uppercase tracking-tighter">{driver.name}</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${driver.deviation > 15 ? 'bg-red-500' : 'bg-blue-500'}`} 
                                    style={{ width: `${Math.min(driver.deviation * 2, 100)}%` }}
                                ></div>
                            </div>
                            <span className={`text-[10px] font-mono font-black w-10 text-right ${driver.deviation > 15 ? 'text-red-400' : 'text-emerald-500'}`}>
                            {driver.deviation > 0 ? '+' : ''}{driver.deviation}%
                            </span>
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-2">
                        <span>Current: {driver.currentValue}</span>
                        <span>Model Mean: {driver.baseline}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight border-t border-slate-800 pt-2 mt-1">
                        <span className="text-blue-400 font-bold">RATIONALE:</span> {driver.importance}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Maintenance Timeline */}
              <section className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Asset History & Forecasting</h4>
                <div className="space-y-4 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
                    <div className="relative pl-6">
                        <div className="absolute left-0 top-1 w-3.5 h-3.5 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="text-[10px] font-bold text-slate-300">Last Service Completed</div>
                        <div className="text-[9px] text-slate-500 font-mono">18 Days Ago (Routine)</div>
                    </div>
                    <div className="relative pl-6">
                        <div className="absolute left-0 top-1 w-3.5 h-3.5 bg-slate-900 border border-emerald-500 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        </div>
                        <div className="text-[10px] font-bold text-emerald-400">Current Health Analysis</div>
                        <div className="text-[9px] text-slate-500 font-mono">Real-time Anomaly Detected</div>
                    </div>
                    <div className="relative pl-6">
                        <div className="absolute left-0 top-1 w-3.5 h-3.5 bg-red-900 border border-red-500 rounded-full flex items-center justify-center animate-ping">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        </div>
                        <div className="text-[10px] font-bold text-red-400 uppercase">Estimated Critical Point</div>
                        <div className="text-[9px] text-slate-500 font-mono">Approx. {selectedAsset.operatingWindow} from today</div>
                    </div>
                </div>
              </section>

              {/* Advisory Actions */}
              <section className="bg-blue-600/5 p-4 rounded-xl border border-blue-500/20">
                 <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Prescriptive Recommendations
                </h4>
                <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors group">
                        <div className="text-[10px] font-bold text-white mb-1 group-hover:text-blue-400">Schedule Physical Inspection</div>
                        <div className="text-[9px] text-slate-500 leading-tight">Generate work order for Unit-04 Mechanical Team. Reference predictive case #{selectedAsset.id}.</div>
                    </button>
                    <button className="w-full text-left p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors group">
                        <div className="text-[10px] font-bold text-white mb-1 group-hover:text-blue-400">Review Similar Assets</div>
                        <div className="text-[9px] text-slate-500 leading-tight">Compare with P-102 and P-103 performance to verify plant-wide stressors.</div>
                    </button>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-600 p-8 text-center space-y-4">
             <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
             </div>
             <div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-700">No Asset Selected</div>
                <p className="text-[10px] mt-1 font-mono">Select a unit from the grid for neural diagnostics</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceWorkspace;
