import React, { useState, useEffect } from 'react';
import { AssetType } from '../types';
import { generateAssetImage } from '../services/geminiService';
import { RefreshCw, Download, Image as ImageIcon } from 'lucide-react';

interface AssetCardProps {
  type: AssetType;
  topic: string;
}

const AssetCard: React.FC<AssetCardProps> = ({ type, topic }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchImage = async () => {
    setLoading(true);
    setError(false);
    try {
      const url = await generateAssetImage(topic, type);
      setImageUrl(url);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, type]);

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${type}-${topic.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300 group">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/80">
        <h3 className="text-sm font-medium text-slate-200 flex items-center gap-2">
          {type === AssetType.INVITATION && <span className="text-pink-400">✉️</span>}
          {type === AssetType.SHIRT && <span className="text-blue-400">👕</span>}
          {type === AssetType.FLAG && <span className="text-yellow-400">🚩</span>}
          {type === AssetType.DECORATION && <span className="text-purple-400">✨</span>}
          {type}
        </h3>
        <div className="flex gap-2">
            {imageUrl && !loading && (
                <button 
                    onClick={handleDownload}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title="Baixar Imagem"
                >
                    <Download size={14} />
                </button>
            )}
            <button
            onClick={fetchImage}
            disabled={loading}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
            title="Regerar Imagem"
            >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
        </div>
      </div>

      <div className="relative aspect-square w-full bg-slate-950 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-slate-500 animate-pulse">Criando arte...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center text-center p-4">
            <span className="text-red-400 text-sm mb-2">Falha ao gerar</span>
            <button onClick={fetchImage} className="text-xs text-slate-400 underline">Tentar novamente</button>
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={`${type} for ${topic}`}
            className="w-full h-full object-cover"
          />
        ) : (
           <div className="text-slate-700">
               <ImageIcon size={32} />
           </div> 
        )}
      </div>
    </div>
  );
};

export default AssetCard;