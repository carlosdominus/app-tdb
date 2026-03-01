
import React from 'react';
import { X } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface WelcomeModalProps {
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-500">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Modal Content */}
      <GlassCard className="relative w-full max-w-5xl h-[90vh] bg-white border-none shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-0 overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-all backdrop-blur-sm"
          title="Fechar"
        >
          <X size={24} />
        </button>

        <div className="flex-1 w-full h-full">
          <iframe 
            src="https://novidadesdeagora.site/ltc/front/" 
            className="w-full h-full border-none"
            title="Oferta Especial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Subtle close hint for mobile if needed, or just rely on the X */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-black/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10"
          >
            Continuar para o Painel
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
