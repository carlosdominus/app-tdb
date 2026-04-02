
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
                   <p className="text-gray-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase">Dia {Math.floor(Math.abs(new Date().getTime() - new Date(state.user?.createdAt || new Date()).getTime()) / (1000 * 60 * 60 * 24)) + 1} de 21</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.25em] text-gray-400">
              <span>PROGRESSO DO PROTOCOLO</span>
              <span className="text-[#E63946] animate-pulse">Ativo 🔥</span>
            </div>
            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div 
                className="h-full gradient-primary rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(100, ((Object.values(state.checklist) as DailyChecklist[]).filter(c => c.mainTonic).length / 21) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 gradient-primary opacity-10 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
      </GlassCard>

      {/* Catalog Focus Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Seu Tônico de Hoje</h3>
          <span className="badge-personalized">RECOMENDADO</span>
        </div>
        
        <GlassCard className="relative overflow-hidden border-none shadow-sm p-6 sm:p-10 bg-white rounded-[32px] sm:rounded-[40px]" onClick={() => onTonicNavigate(mainTonicId)}>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 sm:mb-10">
             <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 text-black rounded-2xl flex items-center justify-center shrink-0">
                  <MainIcon size={24} className="sm:w-8 sm:h-8" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">FOCO PERSONALIZADO</h3>
                  <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tighter leading-tight">{mainTonic.name}</h2>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
             <div className="p-6 sm:p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">MOMENTO IDEAL</p>
                  <div className="flex items-center gap-4 mb-6">
                     <Clock size={24} className="text-[#E63946]" />
                     <span className="text-lg sm:text-xl font-black text-black">{mainTonic.timing.split(' ')[0]}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-3 text-[11px] font-black tracking-[0.2em] ${todayCheck.mainTonic ? 'text-[#2ECC71]' : 'text-[#E63946]'}`}>
                   {todayCheck.mainTonic ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                   {todayCheck.mainTonic ? 'CONCLUÍDO' : 'PENDENTE'}
                </div>
             </div>
             <div className="flex flex-col gap-4">
                <Button variant="primary" fullWidth className="h-14 sm:h-16" onClick={(e) => {
                  e.stopPropagation();
                  onTonicNavigate(mainTonicId);
                }}>VER RECEITA</Button>
                {!todayCheck.mainTonic && (
                  <Button variant="secondary" fullWidth className="h-14 sm:h-16" onClick={(e) => {
                    e.stopPropagation();
                    onTonicToggle(today, 'main');
                  }}>SINALIZAR AGORA</Button>
                )}
             </div>
          </div>
        </GlassCard>
      </section>

      {/* Full Catalog Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Catálogo Completo</h3>
          <button onClick={() => onNavigate(View.CATALOG)} className="text-[#E63946] text-[10px] font-black uppercase tracking-widest flex items-center gap-2">Ver Todos <ArrowRight size={14} /></button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.values(TONICS).filter(t => t.id !== mainTonicId).slice(0, 4).map(tonic => {
            const Icon = iconMap[tonic.icon] || Beaker;
            return (
              <GlassCard 
                key={tonic.id}
                className="p-6 hover:translate-y-[-4px] group flex items-center justify-between border-none shadow-sm bg-white rounded-3xl"
                onClick={() => onTonicNavigate(tonic.id)}
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-gray-50 text-black rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm uppercase leading-tight mb-1">{tonic.name.replace('Tônico ', '')}</h4>
                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">{tonic.timing.split(' ')[0]}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-black transition-all" />
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Bonuses & Turbo - Keeping but simplified */}
      <div className="grid grid-cols-2 gap-4">
          <GlassCard onClick={() => onNavigate(View.BONUSES)} className="flex flex-col gap-4 p-6 border-none shadow-sm bg-black text-white hover:scale-[1.02] transition-all rounded-[32px]">
             <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white shadow-2xl">
                <Crown size={20} />
             </div>
             <div>
                <h3 className="text-sm font-black uppercase tracking-tight">Área VIP</h3>
                <p className="text-[9px] text-gray-400 font-medium uppercase tracking-widest">Conteúdo</p>
             </div>
          </GlassCard>

          <GlassCard onClick={() => onNavigate(View.TRACKER)} className="flex flex-col gap-4 p-6 border-none shadow-sm bg-white hover:scale-[1.02] transition-all rounded-[32px]">
             <div className="w-10 h-10 bg-gray-50 text-black rounded-xl flex items-center justify-center shadow-sm">
                <Zap size={20} className="text-[#E63946]" />
             </div>
             <div>
                <h3 className="text-sm font-black uppercase tracking-tight">Modo Turbo</h3>
                <p className="text-[9px] text-gray-400 font-medium uppercase tracking-widest">Aceleração</p>
             </div>
          </GlassCard>
      </div>
    </div>
  );
};

const QuickCard: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <GlassCard onClick={onClick} className="flex flex-col items-center justify-center py-10 gap-5 border-none shadow-sm bg-white hover:bg-gray-50 transition-all cursor-pointer rounded-[32px]">
    <div className="text-black">{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{label}</span>
  </GlassCard>
);
