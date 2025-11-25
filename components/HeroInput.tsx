import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroInputProps {
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

const HeroInput: React.FC<HeroInputProps> = ({ onGenerate, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onGenerate(input);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-[120px] opacity-20 -z-10 pointer-events-none"></div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-md mb-8 animate-fade-in-up">
        <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
        <span className="text-xs font-medium text-slate-300">Nova geração de Temas IA v2.5</span>
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
        Crie algo <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Mágico</span>
      </h1>
      
      <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        Desenvolva identidades visuais completas, convites, roupas e ideias para eventos conversando com nossa IA.
      </p>

      {/* Input Area */}
      <div className="w-full max-w-2xl relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
        <form onSubmit={handleSubmit} className="relative bg-slate-950 rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 shadow-2xl border border-slate-800">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Descreva seu tema... (ex: Festa anos 80, Casamento na praia, Lançamento de Startup)"
                className="w-full bg-transparent text-lg text-white placeholder-slate-500 px-4 py-3 outline-none resize-none h-[60px] md:h-[50px] leading-relaxed"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
            />
            <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-full md:w-auto px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <>
                        <span>Gerar</span>
                        <ArrowRight size={18} />
                    </>
                )}
            </button>
        </form>
      </div>

      {/* Suggested Chips */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {['Festa Neon', 'Casamento Rústico', 'Lançamento Tech', 'Churrasco no Domingo'].map((suggestion) => (
            <button
                key={suggestion}
                onClick={() => {
                    setInput(suggestion);
                }}
                className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-colors"
            >
                {suggestion}
            </button>
        ))}
      </div>
    </div>
  );
};

export default HeroInput;