
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PdfViewProps {
  title: string;
  pdfUrl: string;
  onBack: () => void;
}

export const PdfView: React.FC<PdfViewProps> = ({ title, pdfUrl, onBack }) => {
  return (
    <div className="fixed inset-0 z-40 bg-[#F8F9FA] flex flex-col">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 z-50">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-[#86868B] hover:text-black transition-colors rounded-xl hover:bg-gray-50"
          title="Voltar"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="font-black uppercase tracking-widest text-[10px] text-black">{title}</span>
      </div>

      {/* PDF Iframe */}
      <div className="flex-1 w-full bg-white">
        <iframe 
          src={pdfUrl} 
          className="w-full h-full border-none"
          title={title}
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
};
