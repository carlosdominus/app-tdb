
import React from 'react';
import { TONICS, PROBLEM_TO_TONIC } from '../constants';
import { View, ProblemType, Tonic } from '../types';
import { GlassCard } from '../components/GlassCard';
import { ChevronLeft, ChevronRight, Droplet, Zap, Timer, Activity, Flame, Sparkles, ShieldCheck, Beaker } from 'lucide-react';

const iconMap: any = { Zap, Timer, Activity, Flame, Sparkles, ShieldCheck, Droplet, Beaker };

interface CatalogViewProps {
  onBack: () => void;
  onTonicNavigate: (id: string) => void;
  onNavigate: (view: View) => void;
  mainProblem: ProblemType;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ onBack, onTonicNavigate, onNavigate, mainProblem }) => {
  const mainTonicId = PROBLEM_TO_TONIC[mainProblem];
  const allTonics = Object.values(TONICS);
  const detox = allTonics.find(t => t.type === 'detox');
  const mainOnes = allTonics.filter(t => t.type === 'main');
  const complementaries = allTonics.filter(t => t.type === 'complementary');

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-black uppercase tracking-tighter">Catálogo Elite</h1>
        <button onClick={onBack} className="text-[#86868B] hover:text-black font-black text-[10px] uppercase tracking-widest">Fechar</button>
      </div>

      {detox && (
        <section className="space-y-6">
          <h2 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.3em] ml-2">CORE: Limpeza Vascular</h2>
          <GlassCard 
            className="gradient-primary p-10 relative overflow-hidden group cursor-pointer shadow-2xl rounded-[40px] text-white"
            onClick={() => onTonicNavigate(detox.id)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-8 relative z-10">
               <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[28px] flex items-center justify-center shadow-inner">
                  <Droplet size={40} />
               </div>
               <div className="flex-1">
                  <h3 className="text-3xl font-black uppercase tracking-tight">{detox.name}</h3>
                  <p className="text-sm font-bold opacity-80 mt-1 italic">O "Viagra Natural" para desintoxicação e circulação.</p>
               </div>
            </div>
            <ChevronRight size={32} className="absolute right-8 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-all" />
          </GlassCard>
        </section>
      )}

      <section className="space-y-6">
        <h2 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.3em] ml-2">Tônicos Específicos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mainOnes.map(t => (
            <TonicSmallCard key={t.id} tonic={t} isHighlight={t.id === mainTonicId} onClick={() => onTonicNavigate(t.id)} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.3em] ml-2">Sincronizadores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {complementaries.map(t => (
            <TonicSmallCard key={t.id} tonic={t} onClick={() => onTonicNavigate(t.id)} />
          ))}
        </div>
      </section>
    </div>
  );
};

const TonicSmallCard: React.FC<{ tonic: Tonic; isHighlight?: boolean; onClick: () => void }> = ({ tonic, isHighlight, onClick }) => {
  const Icon = iconMap[tonic.icon] || Beaker;
  return (
    <GlassCard onClick={onClick} className={`group flex items-center gap-6 p-6 transition-all ${isHighlight ? 'border-2 border-black bg-white' : 'bg-white border-none shadow-sm'}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isHighlight ? 'bg-black text-white' : 'bg-gray-50 text-black group-hover:bg-black group-hover:text-white'}`}>
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <h4 className="font-black text-black text-sm uppercase tracking-tight">{tonic.name.replace('Tônico ', '')}</h4>
        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mt-1">{tonic.timing.split(' ')[0]}</p>
      </div>
      <ChevronRight size={18} className="text-gray-200 group-hover:text-black" />
    </GlassCard>
  );
};
