
import React, { useState, useRef, useEffect } from 'react';
import { getCopilotResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const CopilotSidebar: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hello! I am your PUB Operational Copilot. I can answer questions about current plant conditions, SOPs, or historical incidents. How can I help you today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Mock plant context for RAG
    const context = "Current active situations: Pump P-101 degradation risk (88%). Asset FV-402 high risk (score 42). Alarm Intelligent active. User location: Bedok Plant Control Room.";
    
    const response = await getCopilotResponse(input, context);
    const aiMsg: ChatMessage = { role: 'assistant', content: response, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-800">
      <div className="p-4 border-b border-slate-700 bg-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white leading-none">Knowledge Copilot</h2>
          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Active Reasoning</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
              m.role === 'user' 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-slate-700 text-slate-200 rounded-bl-none border border-slate-600'
            }`}>
              <div className="prose prose-sm prose-invert max-w-none">
                {m.content.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-1 last:mb-0">{line}</p>
                ))}
              </div>
            </div>
            <span className="text-[9px] text-slate-500 mt-1 uppercase font-mono">
              {m.role === 'assistant' ? 'Copilot' : 'You'} • {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 p-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-700 bg-slate-800/80">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about plant conditions..."
            className="w-full bg-slate-900 border border-slate-700 rounded-full py-2.5 pl-4 pr-12 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1.5 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        <p className="text-[9px] text-slate-500 mt-3 text-center uppercase tracking-tighter">
          Advisory suggestions only. Always refer to original SOPs.
        </p>
      </div>
    </div>
  );
};

export default CopilotSidebar;
