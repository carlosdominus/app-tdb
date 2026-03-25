
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface UpsellViewProps {
  onBack: () => void;
}

export const UpsellView: React.FC<UpsellViewProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-40 bg-white flex flex-col">
      {/* Floating Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[110] w-12 h-12 bg-black/10 hover:bg-black/20 backdrop-blur-md text-black transition-all rounded-full flex items-center justify-center shadow-lg group"
        title="Voltar ao Painel"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* External Page Iframe */}
      <div className="flex-1 w-full bg-white">
        <iframe 
          src="https://novidadesdeagora.site/ltc/aba-lateral/" 
          className="w-full h-full border-none"
          title="Oferta Especial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
