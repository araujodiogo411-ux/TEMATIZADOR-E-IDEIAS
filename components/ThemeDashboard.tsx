import React from 'react';
import { ThemeTextData, AssetType } from '../types';
import AssetCard from './AssetCard';
import { Music, Lightbulb, Palette, ArrowLeft, Star, Sparkles } from 'lucide-react';

interface ThemeDashboardProps {
  data: ThemeTextData;
  originalTopic: string;
  onBack: () => void;
}

const ThemeDashboard: React.FC<ThemeDashboardProps> = ({ data, originalTopic, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 truncate max-w-[200px] md:max-w-md">
                    {data.title}
                </h1>
            </div>
            <div className="text-xs font-mono text-slate-500 border border-slate-800 px-3 py-1 rounded-full hidden md:block">
                TEMA: {originalTopic.toUpperCase()}
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Intro Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Star className="text-yellow-400" size={24} />
                    <h2 className="text-2xl font-semibold text-white">Conceito</h2>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed">
                    {data.description}
                </p>
                
                <div className="mt-8">
                    <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                        <Palette size={16} /> PALETA DE CORES
                    </h3>
                    <div className="flex gap-4 flex-wrap">
                        {data.colorPalette.map((color, idx) => (
                            <div key={idx} className="group relative">
                                <div 
                                    className="w-16 h-16 rounded-xl shadow-lg transform transition-transform group-hover:scale-110 border border-white/10 cursor-pointer"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                ></div>
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                                    {color}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Music Playlist */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Music size={120} />
                </div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 relative z-10">
                    <Music className="text-pink-500" /> Playlist Vibe
                </h2>
                <ul className="space-y-4 relative z-10">
                    {data.musicPlaylist.map((song, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-xs font-bold text-slate-400">
                                {idx + 1}
                            </span>
                            <span className="text-sm font-medium">{song}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        {/* Visual Assets Grid */}
        <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-blue-500 rounded-full mr-2"></span>
                Identidade Visual & Assets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AssetCard type={AssetType.INVITATION} topic={originalTopic} />
                <AssetCard type={AssetType.SHIRT} topic={originalTopic} />
                <AssetCard type={AssetType.FLAG} topic={originalTopic} />
                <AssetCard type={AssetType.DECORATION} topic={originalTopic} />
            </div>
        </section>

        {/* Ideas & Activities */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900/50 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Lightbulb className="text-yellow-400" />
                    Atividades e Ideias
                </h3>
                <ul className="space-y-3">
                    {data.eventIdeas.map((idea, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                            <span className="text-blue-400 mt-1">•</span>
                            {idea}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900/50 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="text-purple-400" />
                    Dicas de Decoração
                </h3>
                <ul className="space-y-3">
                    {data.decorationTips.map((tip, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                            <span className="text-purple-400 mt-1">•</span>
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
      </main>
    </div>
  );
};

export default ThemeDashboard;