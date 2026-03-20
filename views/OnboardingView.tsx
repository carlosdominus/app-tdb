
import React, { useState } from 'react';
import { Logo } from '../components/Logo.tsx';
import { GlassCard } from '../components/GlassCard.tsx';
import { Button } from '../components/Button.tsx';
import { ProblemType, UserProfile } from '../types.ts';
import { Zap, Timer, Activity, Flame, ChevronRight, Loader2 } from 'lucide-react';

interface OnboardingViewProps {
  onComplete: (profile: UserProfile) => void;
}

const PROBLEMS = [
  { id: 'broxada' as ProblemType, label: 'Broxada', desc: 'Não subir ou cair no meio do ato', LucideIcon: Zap },
  { id: 'gozo-rapido' as ProblemType, label: 'Gozo Rápido', desc: 'Ejacular em 1-3 minutos', LucideIcon: Timer },
  { id: 'pau-meia-bomba' as ProblemType, label: 'Pau Meia-Bomba', desc: 'Falta de firmeza/rigidez', LucideIcon: Activity },
  { id: 'sem-tesao' as ProblemType, label: 'Não Tenho Tesão', desc: 'Falta de vontade/disposição', LucideIcon: Flame }
];

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    age: undefined,
    weight: undefined,
    mainProblem: undefined
  });

  const isFormValid = profile.age && profile.weight && profile.mainProblem;

  const handleGenerate = () => {
    setStep(2);
    setTimeout(() => {
      onComplete(profile);
    }, 2800);
  };

  const finish = () => {
    onComplete(profile);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-10 px-4 sm:px-6 flex flex-col items-center animate-in fade-in duration-700 overflow-x-hidden">
        <div className="w-16 h-16 text-[#E63946] mb-8 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
          <Logo size={40} />
        </div>
        
        <div className="text-center mb-8 max-w-sm">
          <h1 className="text-2xl font-black text-black font-poppins uppercase tracking-tighter">Personalize seu Plano</h1>
          <p className="text-[#86868B] mt-2 text-sm font-bold">Ajustaremos as doses para o seu caso específico.</p>
        </div>

        <div className="w-full max-w-[420px] space-y-6">
          <GlassCard className="p-6 sm:p-8 space-y-6 bg-white border-none shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-1">IDADE</label>
                <input 
                  type="number" 
                  placeholder="Ex: 35"
                  value={profile.age || ''}
                  onChange={e => setProfile({...profile, age: parseInt(e.target.value)})}
                  className="w-full p-4 rounded-xl bg-[#F5F5F7] border-2 border-transparent focus:border-[#E63946] focus:bg-white transition-all outline-none font-bold text-center text-base sm:text-lg"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-1">PESO (KG)</label>
                <input 
                  type="number" 
                  placeholder="Ex: 80"
                  value={profile.weight || ''}
                  onChange={e => setProfile({...profile, weight: parseInt(e.target.value)})}
                  className="w-full p-4 rounded-xl bg-[#F5F5F7] border-2 border-transparent focus:border-[#E63946] focus:bg-white transition-all outline-none font-bold text-center text-base sm:text-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-1">3. QUAL SEU PROBLEMA PRINCIPAL?</label>
              <div className="grid gap-3">
                {PROBLEMS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setProfile({...profile, mainProblem: p.id})}
                    className={`text-left p-4 sm:p-5 rounded-[24px] border border-transparent transition-all duration-300 flex items-center gap-4 sm:gap-5 shadow-sm ${profile.mainProblem === p.id ? 'gradient-primary text-white shadow-xl scale-[1.02]' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${profile.mainProblem === p.id ? 'bg-white/20' : 'bg-[#F5F5F7] text-[#E63946]'}`}>
                       <p.LucideIcon size={24} />
                    </div>
                    <div className="flex-1">
                       <div className={`font-black text-sm sm:text-base leading-tight mb-1 uppercase tracking-tight ${profile.mainProblem === p.id ? 'text-white' : 'text-[#1D1D1F]'}`}>{p.label}</div>
                       <div className={`text-[11px] sm:text-xs leading-tight font-bold ${profile.mainProblem === p.id ? 'text-white/80' : 'text-[#86868B]'}`}>{p.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button 
              fullWidth 
              disabled={!isFormValid}
              onClick={handleGenerate}
              className="h-14 sm:h-16 text-sm sm:text-base font-black tracking-widest uppercase"
            >
              GERAR MEU PROTOCOLO
            </Button>
          </GlassCard>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 mb-8 relative flex items-center justify-center">
           <Loader2 className="text-[#E63946] animate-spin" size={64} strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-black text-black font-poppins uppercase tracking-tighter">Montando seu Guia...</h2>
        <p className="text-[#86868B] mt-2 font-black uppercase tracking-widest text-xs animate-pulse">Equilibrando Biotipo e Dosagem</p>
      </div>
    );
  }

  const selectedProb = PROBLEMS.find(p => p.id === profile.mainProblem);

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-16 px-6 flex flex-col items-center animate-in zoom-in duration-500 overflow-x-hidden">
      <div className="w-20 h-20 text-[#E63946] mb-10 bg-white p-4 rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center">
        <Logo size={48} />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-black font-poppins uppercase tracking-tighter">Tudo Pronto!</h1>
        <p className="text-[#86868B] mt-2 font-bold">Seu protocolo foi ajustado com sucesso.</p>
      </div>

      <GlassCard className="w-full max-w-[420px] p-8 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden bg-white border-none">
        <div className="absolute top-0 right-0 w-48 h-48 gradient-primary opacity-5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="space-y-3">
          <p className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-1">SEU PERFIL:</p>
          <div className="flex gap-3">
             <div className="px-4 py-2 bg-[#F5F5F7] rounded-xl text-[10px] font-black text-black uppercase tracking-widest">{profile.age} ANOS</div>
             <div className="px-4 py-2 bg-[#F5F5F7] rounded-xl text-[10px] font-black text-black uppercase tracking-widest">{profile.weight}KG</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-[32px] border-2 border-[#E63946]/10 bg-white shadow-xl relative group">
             <div className="absolute -top-3 right-4 bg-black text-white px-4 py-1.5 rounded-xl text-[10px] font-black shadow-lg uppercase tracking-widest z-20">
                Foco Elite
             </div>
             <div className="w-16 h-16 bg-[#F5F5F7] rounded-2xl flex items-center justify-center text-[#E63946] mb-6">
               {selectedProb && <selectedProb.LucideIcon size={32} />}
             </div>
             <h3 className="text-xl font-black text-black uppercase tracking-tight mb-2">
                Tônico {selectedProb?.label}
             </h3>
             <p className="text-sm text-[#86868B] font-bold leading-relaxed">
                Formulações ajustadas para o seu biotipo. Este tônico prioriza o controle arterial para {selectedProb?.label.toLowerCase()}.
             </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button fullWidth onClick={finish} className="h-16 text-lg font-black tracking-widest uppercase">COMEÇAR PROTOCOLO</Button>
          <button onClick={() => setStep(1)} className="w-full text-[11px] text-[#86868B] hover:text-black transition-colors py-2 font-black uppercase tracking-widest">
             Ajustar Parâmetros
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
