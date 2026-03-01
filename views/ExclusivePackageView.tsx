
import React from 'react';
import { ChevronLeft, Crown, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface ExclusivePackageViewProps {
  onBack: () => void;
}

export const ExclusivePackageView: React.FC<ExclusivePackageViewProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        <span className="bg-black text-white px-4 py-1.5 rounded-xl text-[10px] font-black shadow-md uppercase tracking-widest flex items-center gap-2">
          <Crown size={12} className="text-[#E63946]" /> CONTEÚDO ELITE
        </span>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">Tônico do Cavalo</h1>
        <p className="text-[#86868B] font-black text-[10px] uppercase tracking-widest">Estratégia Avançada de Performance</p>
      </div>

      <div className="px-2">
        <GlassCard className="p-0 overflow-hidden shadow-2xl border-none bg-black rounded-[40px]">
          <div style={{ position: 'relative', paddingTop: '125%' }}>
            <iframe 
              id="panda-986c4e76-193f-494e-be5f-f907c5f07f9e" 
              src="https://player-vz-30ca375c-0dd.tv.pandavideo.com.br/embed/?v=986c4e76-193f-494e-be5f-f907c5f07f9e" 
              style={{ border: 'none', position: 'absolute', top: 0, left: 0 }} 
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
              allowFullScreen={true} 
              width="100%" 
              height="100%" 
              // @ts-ignore
              fetchpriority="high"
            ></iframe>
          </div>
        </GlassCard>
      </div>

      <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-6">
        <div className="w-14 h-14 gradient-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h4 className="font-black text-black uppercase tracking-tight">Acesso Permanente</h4>
          <p className="text-xs text-[#86868B] font-bold">Consulte esta técnica sempre que precisar de um booster de vigor.</p>
        </div>
      </div>
    </div>
  );
};
