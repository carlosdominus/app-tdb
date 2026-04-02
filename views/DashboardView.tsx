
import React from 'react';
import { AppState, View, ProblemType, DailyChecklist, Tonic } from '../types.ts';
import { TONICS, PROBLEM_TO_TONIC } from '../constants.tsx';
import { GlassCard } from '../components/GlassCard.tsx';
import { Button } from '../components/Button.tsx';
import { CheckCircle2, Clock, Calendar, TrendingUp, ArrowRight, Circle, ChevronRight, Zap, Timer, Activity, Flame, ShieldCheck, Beaker, BookOpen, Crown, ListChecks, Droplet } from 'lucide-react';

const iconMap: any = { Zap, Timer, Activity, Flame, ShieldCheck, Droplet: ShieldCheck };

interface DashboardViewProps {
  state: AppState;
  onNavigate: (view: View) => void;
  onTonicNavigate: (id: string) => void;
  onTonicToggle: (date: string, type: 'main' | 'complementary', tonicId?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ state, onNavigate, onTonicNavigate, onTonicToggle }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayCheck = state.checklist[today] || { mainTonic: false, complementary: [] };

  const mainTonicId = PROBLEM_TO_TONIC[state.user?.profile?.mainProblem as ProblemType] || 'anti-broxada';
  const allTonics = Object.values(TONICS);
  const detox = allTonics.find(t => t.type === 'detox');
  const mainOnes = allTonics.filter(t => t.type === 'main');
  const complementaries = allTonics.filter(t => t.type === 'complementary');

  return (
    <div className="space-y-10 pb-12">
      {/* Header Info */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-black text-black uppercase tracking-tighter">Catálogo Elite</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Selecione seu tônico diário</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Seu Objetivo</p>
              <p className="text-[11px] font-black text-[#E63946] uppercase tracking-tight">{TONICS[mainTonicId]?.name || 'Geral'}</p>
           </div>
        </div>
      </div>

      {/* Detox Section (Highlight) */}
      {detox && (
        <section className="space-y-6">
          <h2 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.3em] ml-2">CORE: Limpeza Vascular</h2>
          <GlassCard 
            className="gradient-primary p-8 relative overflow-hidden group cursor-pointer shadow-2xl rounded-[32px] text-white"
            onClick={() => onTonicNavigate(detox.id)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 relative z-10">
               <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                  <Droplet size={32} />
               </div>
               <div className="flex-1">
                  <h3 className="text-2xl font-black uppercase tracking-tight">{detox.name}</h3>
                  <p className="text-xs font-bold opacity-80 mt-1 italic">O "Viagra Natural" para desintoxicação e circulação.</p>
               </div>
            </div>
            <ChevronRight size={28} className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-all" />
          </GlassCard>
        </section>
      )}

      {/* Main Tonics Section */}
      <section className="space-y-6">
        <h2 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.3em] ml-2">Tônicos Específicos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mainOnes.map(t => (
            <TonicSmallCard 
              key={t.id} 
              tonic={t} 
              isHighlight={t.id === mainTonicId} 
              isDone={t.id === mainTonicId ? todayCheck.mainTonic : todayCheck.complementary.includes(t.id)}
              onClick={() => onTonicNavigate(t.id)} 
            />
          ))}
        </div>
      </section>

      {/* Complementary Section */}
      <section className="space-y-6">
        <h2 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.3em] ml-2">Sincronizadores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {complementaries.map(t => (
            <TonicSmallCard 
              key={t.id} 
              tonic={t} 
              isDone={todayCheck.complementary.includes(t.id)}
              onClick={() => onTonicNavigate(t.id)} 
            />
          ))}
        </div>
      </section>

      {/* Quick Access Grid (Simplified) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GlassCard onClick={() => onNavigate(View.BONUSES)} className="flex items-center gap-6 p-8 border-none shadow-sm bg-black text-white hover:scale-[1.01] transition-all rounded-[32px]">
             <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white shadow-2xl shrink-0">
                <Crown size={24} />
             </div>
             <div className="flex-1">
                <h3 className="text-lg font-black uppercase tracking-tighter">Área VIP</h3>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Bônus Exclusivos</p>
             </div>
             <ChevronRight size={20} className="ml-auto text-gray-600 shrink-0" />
          </GlassCard>

          <GlassCard onClick={() => onNavigate(View.TRACKER)} className="flex items-center gap-6 p-8 border-none shadow-sm bg-white hover:scale-[1.01] transition-all rounded-[32px]">
             <div className="w-12 h-12 bg-gray-50 text-black rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <Zap size={24} className="text-[#E63946]" />
             </div>
             <div className="flex-1">
                <h3 className="text-lg font-black uppercase tracking-tighter">Modo Turbo</h3>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Aceleração</p>
             </div>
             <ChevronRight size={20} className="ml-auto text-gray-300 shrink-0" />
          </GlassCard>
      </div>
    </div>
  );
};

const TonicSmallCard: React.FC<{ tonic: Tonic; isHighlight?: boolean; isDone?: boolean; onClick: () => void }> = ({ tonic, isHighlight, isDone, onClick }) => {
  const Icon = iconMap[tonic.icon] || Beaker;
  return (
    <GlassCard onClick={onClick} className={`group flex items-center gap-6 p-6 transition-all ${isHighlight ? 'border-2 border-black bg-white' : 'bg-white border-none shadow-sm'} rounded-[28px]`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isHighlight ? 'bg-black text-white' : 'bg-gray-50 text-black group-hover:bg-black group-hover:text-white'}`}>
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
           <h4 className="font-black text-black text-sm uppercase tracking-tight">{tonic.name.replace('Tônico ', '')}</h4>
           {isDone && <CheckCircle2 size={14} className="text-green-500" />}
        </div>
        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mt-1">{tonic.timing.split(' ')[0]}</p>
      </div>
      <ChevronRight size={18} className="text-gray-200 group-hover:text-black" />
    </GlassCard>
  );
};
