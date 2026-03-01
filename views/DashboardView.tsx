
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
      <GlassCard className="glass-dark text-white border-none overflow-hidden relative shadow-2xl p-10 rounded-[40px]">
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(230,57,70,0.5)]">
                <Crown size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight uppercase">Bem-vindo, {state.user?.name.split(' ')[0]}</h2>
                <div className="flex items-center gap-3 mt-2">
                   <span className="bg-[#E63946] text-white text-[10px] font-black px-3 py-1 rounded shadow-lg uppercase tracking-widest">Membro Elite</span>
                   <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Protocolo 21 Dias</p>
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

      {/* Main Tonic Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <GlassCard className="relative overflow-hidden border-none shadow-sm p-10 bg-white rounded-[40px]" onClick={() => onTonicNavigate(mainTonicId)}>
            <div className="flex justify-between items-start mb-10">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gray-50 text-black rounded-2xl flex items-center justify-center">
                    <MainIcon size={32} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">FOCO PERSONALIZADO</h3>
                    <h2 className="text-2xl font-black text-black uppercase tracking-tighter">{mainTonic.name}</h2>
                  </div>
               </div>
               <div className="badge-personalized">HOJE</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
               <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">MOMENTO IDEAL</p>
                    <div className="flex items-center gap-4 mb-6">
                       <Clock size={24} className="text-[#E63946]" />
                       <span className="text-xl font-black text-black">{mainTonic.timing.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 text-[11px] font-black tracking-[0.2em] ${todayCheck.mainTonic ? 'text-[#2ECC71]' : 'text-[#E63946]'}`}>
                     {todayCheck.mainTonic ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                     {todayCheck.mainTonic ? 'CONCLUÍDO' : 'PENDENTE'}
                  </div>
               </div>
               <div className="flex flex-col gap-4">
                  <Button variant="primary" fullWidth className="h-16" onClick={(e) => {
                    e.stopPropagation();
                    onTonicNavigate(mainTonicId);
                  }}>VER RECEITA</Button>
                  {!todayCheck.mainTonic && (
                    <Button variant="secondary" fullWidth className="h-16" onClick={(e) => {
                      e.stopPropagation();
                      onTonicToggle(today, 'main');
                    }}>SINALIZAR AGORA</Button>
                  )}
               </div>
            </div>
          </GlassCard>
        </div>

        <div className="md:col-span-4 space-y-6">
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">SUPORTES EXTRA</h3>
           <div className="grid grid-cols-1 gap-4">
              <GlassCard 
                className="p-6 hover:translate-y-[-4px] group flex items-center justify-between border-none shadow-sm bg-white rounded-3xl"
                onClick={() => onTonicNavigate('detox-vascular')}
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-gray-50 text-black rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm uppercase leading-tight mb-1">Detox Vascular</h4>
                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Diário</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-black transition-all" />
              </GlassCard>
              
              <GlassCard 
                className="p-6 border-2 border-dashed border-gray-200 hover:border-black hover:bg-black group transition-all flex items-center justify-between rounded-3xl"
                onClick={() => onNavigate(View.CATALOG)}
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shadow-lg">
                    <Beaker size={20} />
                  </div>
                  <h4 className="font-black text-black group-hover:text-white text-xs uppercase tracking-widest">Catálogo</h4>
                </div>
                <ArrowRight size={20} className="text-black group-hover:text-white group-hover:translate-x-1 transition-all" />
              </GlassCard>
           </div>
        </div>
      </div>

      {/* Quick Nav Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <GlassCard onClick={() => onNavigate(View.BONUSES)} className="flex items-center gap-8 p-10 border-none shadow-sm bg-black text-white hover:scale-[1.01] transition-all rounded-[40px]">
             <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white shadow-2xl">
                <Crown size={36} />
             </div>
             <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Área VIP</h3>
                <p className="text-sm text-gray-400 font-medium">Conteúdo de domínio e bônus.</p>
             </div>
             <ChevronRight size={28} className="ml-auto text-gray-600" />
          </GlassCard>

          <GlassCard onClick={() => onNavigate(View.TRACKER)} className="flex items-center gap-8 p-10 border-none shadow-sm bg-white hover:scale-[1.01] transition-all rounded-[40px]">
             <div className="w-16 h-16 bg-gray-50 text-black rounded-2xl flex items-center justify-center shadow-sm">
                <Zap size={36} className="text-[#E63946]" />
             </div>
             <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Modo Turbo</h3>
                <p className="text-sm text-gray-400 font-medium">Aceleração e Guia 125 posições.</p>
             </div>
             <ChevronRight size={28} className="ml-auto text-gray-300" />
          </GlassCard>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
         <QuickCard icon={<BookOpen size={24} />} label="Ciência" onClick={() => onNavigate(View.SCIENCE)} />
         <QuickCard icon={<ShieldCheck size={24} />} label="Garantia" onClick={() => onNavigate(View.WARRANTY)} />
         <QuickCard icon={<ListChecks size={24} />} label="Checklist" onClick={() => onNavigate(View.CHECKLIST)} />
         <QuickCard icon={<Crown size={24} />} label="Premium" onClick={() => onNavigate(View.PREMIUM)} />
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
