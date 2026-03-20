
import React from 'react';
import { X } from 'lucide-react';
import { Logo } from './Logo';
import { GlassCard } from './GlassCard';

interface WelcomeModalProps {
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-500">
      {/* Header with Close Button */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
            <Logo size={20} />
          </div>
          <span className="font-black uppercase tracking-widest text-[10px] text-black">Apresentação Elite</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 -mr-2 text-[#86868B] hover:text-black transition-colors rounded-xl hover:bg-gray-50"
          title="Fechar e ir para o Painel"
        >
          <X size={24} />
        </button>
      </div>

      {/* Full Screen Iframe */}
      <div className="flex-1 w-full bg-white">
        <iframe 
          src="https://novidadesdeagora.site/ltc/front/" 
          className="w-full h-full border-none"
          title="Apresentação"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
