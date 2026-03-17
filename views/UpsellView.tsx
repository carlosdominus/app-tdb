
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface UpsellViewProps {
  onBack: () => void;
}

export const UpsellView: React.FC<UpsellViewProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-40 bg-[#F8F9FA] flex flex-col">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 z-50">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-[#86868B] hover:text-black transition-colors rounded-xl hover:bg-gray-50"
          title="Voltar ao Painel"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="font-black uppercase tracking-widest text-[10px] text-black">Acelere seus Resultados</span>
      </div>

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
