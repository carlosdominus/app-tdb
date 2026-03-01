
import React from 'react';
import { AppState, View, ProblemType } from '../types';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { ChevronLeft, Zap, Target, Flame, ArrowRight, ShieldCheck, Crown, Clock, Heart, BookOpen } from 'lucide-react';
import { TONICS, PROBLEM_TO_TONIC } from '../constants';

interface TrackerViewProps {
  state: AppState;
  onBack: () => void;
  onNavigate: (view: View) => void;
  toggleCheck: (date: string, type: 'main' | 'complementary', tonicId?: string) => void;
}

export const TrackerView: React.FC<TrackerViewProps> = ({ state, onBack, onNavigate, toggleCheck }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayCheck = state.checklist[today] || { date: today, mainTonic: false, complementary: [] };
  const mainTonicId = (state.user?.profile?.mainProblem ? PROBLEM_TO_TONIC[state.user.profile.mainProblem as ProblemType] : 'anti-broxada') || 'anti-broxada';
  const mainTonic = TONICS[mainTonicId];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        <span className="bg-black text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          <Zap size={14} className="text-[#E63946]" /> MODO TURBO ATIVO
        </span>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-black uppercase tracking-tighter">Bônus de Aceleração</h1>
        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Acesso exclusivo aos materiais de elite.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tônico do Cavalo */}
        <GlassCard className="p-8 border-none bg-black text-white shadow-2xl space-y-6 relative overflow-hidden group cursor-pointer" onClick={() => onNavigate(View.EXCLUSIVE_PACKAGE)}>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white">
              <Flame size={24} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight">Tônico do Cavalo</h3>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              A técnica de booster de vigor mais potente para aumentar o tamanho e a firmeza do amigão.
            </p>
            <div className="flex items-center gap-2 text-[#E63946] font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              Ver Receita Secreta <ArrowRight size={14} />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        </GlassCard>

        {/* 125 Posições */}
        <GlassCard className="p-8 border-none bg-white shadow-sm space-y-6 group cursor-pointer" onClick={() => onNavigate(View.EXCLUSIVE_PACKAGE_2)}>
          <div className="w-12 h-12 bg-gray-100 text-black rounded-xl flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <h3 className="text-2xl font-black text-black uppercase tracking-tight">125 Posições</h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            Manual de domínio para usar na cama. Técnicas que garantem o prazer dela do início ao fim.
          </p>
          <div className="flex items-center gap-2 text-black font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
            Abrir Manual <ArrowRight size={14} />
          </div>
        </GlassCard>

        {/* 20 Pensamentos Eróticos */}
        <GlassCard className="p-8 border-none bg-white shadow-sm space-y-6 group cursor-pointer md:col-span-2" onClick={() => onNavigate(View.BONUSES)}>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center">
              <Heart size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-black uppercase tracking-tight">20 Pensamentos Eróticos</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Descubra o que realmente se passa na mente das mulheres durante o ato.
              </p>
            </div>
            <div className="flex items-center gap-2 text-pink-500 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              Entrar na Mente Dela <ArrowRight size={14} />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="p-8 bg-gray-50 border border-gray-100 rounded-[40px] space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Atalhos de Progresso</h3>
           <button onClick={() => onNavigate(View.CHECKLIST)} className="text-[10px] font-black text-[#E63946] uppercase tracking-widest hover:underline">Ver Checklist Completo</button>
        </div>
        
        <div 
          className={`p-6 rounded-3xl flex items-center justify-between transition-all cursor-pointer ${todayCheck.mainTonic ? 'bg-black text-white' : 'bg-white border border-gray-100 shadow-sm'}`}
          onClick={() => toggleCheck(today, 'main')}
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${todayCheck.mainTonic ? 'bg-white/10' : 'bg-gray-100 text-[#E63946]'}`}>
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase">Tônico Principal de Hoje</h4>
              <p className="text-[10px] opacity-60 font-bold uppercase">{mainTonic?.name}</p>
            </div>
          </div>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${todayCheck.mainTonic ? 'bg-[#E63946] border-[#E63946]' : 'border-gray-200'}`}>
            {todayCheck.mainTonic && <ShieldCheck size={16} className="text-white" />}
          </div>
        </div>
      </div>
    </div>
  );
};
