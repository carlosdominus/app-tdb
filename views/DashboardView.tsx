
import React from 'react';
import { AppState, View, ProblemType, DailyChecklist } from '../types.ts';
import { TONICS, PROBLEM_TO_TONIC } from '../constants.tsx';
import { GlassCard } from '../components/GlassCard.tsx';
import { Button } from '../components/Button.tsx';
import { CheckCircle2, Clock, Calendar, TrendingUp, ArrowRight, Circle, ChevronRight, Zap, Timer, Activity, Flame, ShieldCheck, Beaker, BookOpen, Crown, ListChecks } from 'lucide-react';

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
  const mainTonic = TONICS[mainTonicId] || TONICS['anti-broxada'];
  const MainIcon = iconMap[mainTonic.icon] || Zap;

  const daysSinceStart = Math.floor((new Date().getTime() - new Date(state.user?.createdAt || new Date()).getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const currentDay = Math.min(21, daysSinceStart);

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Card */}
      <GlassCard className="glass-dark text-white border-none overflow-hidden relative shadow-2xl p-6 sm:p-10 rounded-[32px] sm:rounded-[40px]">
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 gradient-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(230,57,70,0.5)] shrink-0">
                <Crown size={32} className="sm:w-10 sm:h-10" />
              </div>
              <div>
                <h2 className="text-xl sm:text-3xl font-black tracking-tight uppercase leading-tight">Bem-vindo, {state.user?.name.split(' ')[0]}</h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                   <span className="bg-[#E63946] text-white text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-1 rounded shadow-lg uppercase tracking-widest">Membro Elite</span>
                   <p className="text-gray-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase">Protocolo 21 Dias — DIA {currentDay}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.25em] text-gray-400">
              <span>ESTÁGIO DE EVOLUÇÃO</span>
              <span className="text-[#E63946] animate-pulse">Ativo 🔥</span>
            </div>
            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div 
                className="h-full gradient-primary rounded-full transition-all duration-1000" 
                // Fix: Added explicit type cast for Object.values to avoid 'unknown' type error
                style={{ width: `${Math.min(100, ((Object.values(state.checklist) as DailyChecklist[]).filter(c => c.mainTonic).length / 21) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 gradient-primary opacity-10 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
      </GlassCard>

      {/* Catalog Focus Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Catálogo de Tônicos</h3>
          <button onClick={() => onNavigate(View.CATALOG)} className="text-[10px] font-black text-[#E63946] uppercase tracking-widest hover:underline">Ver Todos</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.values(TONICS).slice(0, 4).map((tonic) => {
            const Icon = iconMap[tonic.icon] || Zap;
            const isMain = tonic.id === mainTonicId;
            return (
              <GlassCard 
                key={tonic.id}
                className={`p-6 border-none shadow-sm bg-white rounded-[32px] hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden ${isMain ? 'ring-2 ring-[#E63946]/20' : ''}`}
                onClick={() => onTonicNavigate(tonic.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isMain ? 'gradient-primary text-white' : 'bg-gray-50 text-black'}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm uppercase leading-tight">{tonic.name}</h4>
                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">{tonic.timing}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Ver Receita</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
                {isMain && <div className="absolute top-4 right-4 bg-[#E63946] text-white text-[7px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Recomendado</div>}
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Quick Nav Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GlassCard onClick={() => onNavigate(View.BONUSES)} className="flex items-center gap-4 p-6 border-none shadow-sm bg-black text-white hover:scale-[1.01] transition-all rounded-[32px]">
             <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shrink-0">
                <Crown size={24} />
             </div>
             <div className="flex-1">
                <h3 className="text-lg font-black uppercase tracking-tighter">Área VIP</h3>
                <p className="text-[10px] text-gray-400 font-medium">Conteúdo de domínio.</p>
             </div>
             <ChevronRight size={20} className="ml-auto text-gray-600 shrink-0" />
          </GlassCard>

          <GlassCard onClick={() => onNavigate(View.TRACKER)} className="flex items-center gap-4 p-6 border-none shadow-sm bg-white hover:scale-[1.01] transition-all rounded-[32px]">
             <div className="w-12 h-12 bg-gray-50 text-black rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <Zap size={24} className="text-[#E63946]" />
             </div>
             <div className="flex-1">
                <h3 className="text-lg font-black uppercase tracking-tighter">Modo Turbo</h3>
                <p className="text-[10px] text-gray-400 font-medium">Aceleração.</p>
             </div>
             <ChevronRight size={20} className="ml-auto text-gray-300 shrink-0" />
          </GlassCard>
      </div>
    </div>
  );
};
