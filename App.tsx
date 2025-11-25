import React, { useState } from 'react';
import HeroInput from './components/HeroInput';
import ThemeDashboard from './components/ThemeDashboard';
import { generateThemeText } from './services/geminiService';
import { ThemeTextData } from './types';

const App: React.FC = () => {
  // State: 'input' | 'loading' | 'results'
  const [view, setView] = useState<'input' | 'results'>('input');
  const [loading, setLoading] = useState(false);
  const [themeData, setThemeData] = useState<ThemeTextData | null>(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (topic: string) => {
    setLoading(true);
    setError(null);
    setCurrentTopic(topic);
    
    try {
      // 1. Generate the text content first (faster)
      const data = await generateThemeText(topic);
      setThemeData(data);
      setView('results');
    } catch (err) {
      console.error(err);
      setError("Não foi possível gerar o tema. Verifique sua chave API ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setView('input');
    setThemeData(null);
    setCurrentTopic('');
  };

  return (
    <div className="antialiased text-slate-200">
      {/* Global Error Toast */}
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-xl backdrop-blur-md animate-bounce">
          {error}
          <button onClick={() => setError(null)} className="ml-4 font-bold opacity-70 hover:opacity-100">✕</button>
        </div>
      )}

      {view === 'input' && (
        <HeroInput onGenerate={handleGenerate} isLoading={loading} />
      )}

      {view === 'results' && themeData && (
        <ThemeDashboard 
          data={themeData} 
          originalTopic={currentTopic} 
          onBack={handleBack} 
        />
      )}
    </div>
  );
};

export default App;