
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
      {/* Floating Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-[110] w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all rounded-full flex items-center justify-center shadow-lg group border border-white/20"
        title="Fechar e ir para o Painel"
      >
        <X size={24} className="group-hover:scale-110 transition-transform" />
      </button>

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
