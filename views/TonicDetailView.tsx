
import React from 'react';
import { Tonic, View } from '../types.ts';
import { GlassCard } from '../components/GlassCard.tsx';
import { Button } from '../components/Button.tsx';
import { ChevronLeft, Info, CheckSquare, Clock, Download, RefreshCcw, Zap, Timer, Activity, Flame, Sparkles, ShieldCheck, Beaker } from 'lucide-react';

const iconMap: any = {
  Zap, Timer, Activity, Flame, Sparkles, ShieldCheck
};

interface TonicDetailViewProps {
  tonic: Tonic;
  isMain: boolean;
  onBack: () => void;
  onNavigate: (view: View) => void;
  onMarkDone: (tonicId: string) => void;
  isDone: boolean;
}

export const TonicDetailView: React.FC<TonicDetailViewProps> = ({ tonic, isMain, onBack, onNavigate, onMarkDone, isDone }) => {
  const TonicIcon = iconMap[tonic.icon] || Beaker;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        {isMain && <span className="bg-black text-white px-4 py-1.5 rounded-xl text-[10px] font-black shadow-md uppercase tracking-widest">SEU PRINCIPAL</span>}
      </div>

      <div className="text-center">
        <div className="w-24 h-24 bg-white rounded-3xl mx-auto flex items-center justify-center text-black shadow-xl mb-8 border border-gray-100">
           <TonicIcon size={56} />
        </div>
        <h1 className="text-4xl font-bold text-black uppercase tracking-tighter mb-4">{tonic.name}</h1>
        <div className="flex items-center justify-center gap-3">
           <span className="px-4 py-1.5 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-widest border border-black/10">{tonic.type === 'main' ? 'PROTOCOLO DIÁRIO' : 'TÔNICO EXTRA'}</span>
           <span className="px-4 py-1.5 bg-red-50 text-[#E63946] rounded-full text-[11px] font-black uppercase tracking-widest border border-red-100">{tonic.timing.split(' ')[0]}</span>
        </div>
      </div>

      <div className="space-y-10">
        <GlassCard className="border-none shadow-lg overflow-hidden relative p-8 bg-white">
           <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-5 rounded-full -mr-16 -mt-16"></div>
           <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
             <Info size={16} /> Para que serve
           </h3>
           <p className="text-lg text-[#1D1D1F] font-medium leading-relaxed mb-8 relative z-10">{tonic.serve}</p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {tonic.benefits.map((b, i) => (
               <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 text-black text-xs font-bold border border-gray-100 shadow-sm">
                  <CheckSquare size={20} className="text-[#E63946] shrink-0" />
                  {b}
               </div>
             ))}
           </div>
        </GlassCard>

        <section className="space-y-6">
          <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-2">Mesa de Preparo</h3>
          <div className="grid grid-cols-1 gap-3">
             {tonic.ingredients.map((ing, i) => (
               <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-white border border-gray-100 shadow-sm">
                  <span className="text-base font-bold text-[#1D1D1F] uppercase tracking-tight">{ing.name}</span>
                  <span className="text-sm font-black text-black bg-gray-50 px-4 py-2 rounded-xl">{ing.qty}</span>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-2">Modo de Execução</h3>
          <div className="space-y-4">
             {tonic.instructions.map((step, i) => (
               <div key={i} className="flex gap-6 p-6 rounded-3xl bg-[#F5F5F7] border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-black text-sm shrink-0 shadow-lg">
                    {i+1}
                  </div>
                  <p className="text-base font-medium text-[#1D1D1F] py-1.5 leading-relaxed">{step}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-2">Janela de Consumo</h3>
          <GlassCard className="bg-black text-white border-none p-8 shadow-xl">
             <div className="flex items-center gap-5 mb-4">
                <div className="p-3 bg-white/10 rounded-2xl shadow-sm">
                   <Clock className="text-[#E63946]" size={28} />
                </div>
                <span className="text-2xl font-bold uppercase tracking-tighter">{tonic.timing}</span>
             </div>
             <p className="text-sm text-gray-400 font-medium leading-relaxed opacity-90">Sincronize esta dose para garantir a máxima absorção dos bioativos.</p>
          </GlassCard>
        </section>

        <div className="space-y-4 pt-6">
          <Button fullWidth className="h-16 text-lg font-black tracking-widest uppercase" onClick={() => onMarkDone(tonic.id)} disabled={isDone}>
            {isDone ? 'Concluído' : 'Sinalizar Conclusão'}
          </Button>
          <div className="grid grid-cols-2 gap-4">
             <Button variant="outline" fullWidth className="h-14 text-sm font-bold"><Download size={18} /> PDF</Button>
             <Button variant="outline" fullWidth className="h-14 text-sm font-bold" onClick={() => onNavigate(View.CATALOG)}><RefreshCcw size={18} /> LISTA</Button>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border border-gray-200 rounded-3xl mt-12 space-y-2">
           <div className="flex items-start gap-4">
              <ShieldCheck size={24} className="text-[#86868B] shrink-0" />
              <div className="space-y-1">
                 <p className="text-[10px] text-[#86868B] leading-relaxed uppercase tracking-widest font-black">
                   NOTA DE SEGURANÇA
                 </p>
                 <p className="text-[9px] text-gray-400 leading-relaxed font-bold uppercase">
                   Ingredientes naturais de uso tradicional. Não exceda as quantidades indicadas. Não substitui orientação médica.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
