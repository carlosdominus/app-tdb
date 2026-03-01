
import React, { useState } from 'react';
import { Module, View } from '../types';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { Beaker, ChevronLeft, Info, Play, CheckSquare, Clock, ArrowRight, ShieldAlert, ListChecks } from 'lucide-react';

interface ModuleViewProps {
  module: Module;
  onBack: () => void;
  onNavigate: (view: View) => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({ module, onBack, onNavigate }) => {
  const isRecipeModule = module.id === 'mod2';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-black text-[11px] uppercase tracking-widest">
          <ChevronLeft size={20} /> Voltar
        </button>
        <div className="px-3 py-1 rounded-xl bg-black text-white text-[9px] font-black uppercase tracking-widest">MÓDULO ATIVO</div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-black uppercase tracking-tighter">{module.title}</h1>
        <p className="text-[#86868B] mt-2 font-bold text-sm">Siga cada etapa com precisão para consolidar resultados.</p>
      </div>

      {isRecipeModule ? (
        <div className="space-y-6">
          <GlassCard className="relative overflow-hidden border-none shadow-2xl bg-white p-10">
            <div className="absolute top-0 right-0 w-48 h-48 gradient-primary opacity-5 rounded-full -mr-24 -mt-24"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Beaker size={24} />
                </div>
                <h2 className="text-2xl font-black text-black uppercase tracking-tight">Formulações Bioativas</h2>
              </div>

              <div className="bg-black p-5 rounded-2xl mb-8 flex gap-4 border border-white/10">
                <ShieldAlert className="text-[#E63946] shrink-0" size={24} />
                <p className="text-[11px] text-gray-300 font-bold uppercase tracking-wide leading-relaxed">
                  <span className="text-white font-black">PROTOCOLO DE SEGURANÇA:</span> As proporções devem ser exatas. Alterações nas medidas podem neutralizar o equilíbrio de pH necessário.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-black text-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <ListChecks size={18} className="text-[#E63946]" /> Ingredientes de Base
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Bicarbonato de Sódio', qty: '1 colher de chá' },
                      { name: 'Mel Orgânico', qty: '2 colheres de sopa' },
                      { name: 'Suco de Limão', qty: '1/2 limão siciliano' },
                      { name: 'Água Filtrada', qty: '200ml (morninho)' }
                    ].map((ing, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <span className="text-sm font-black text-gray-500 uppercase tracking-tight">{ing.name}</span>
                        <span className="text-[11px] font-black text-black uppercase tracking-widest">{ing.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-black text-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <Clock size={18} className="text-[#E63946]" /> Janelas de Absorção
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="w-2 h-2 rounded-full bg-[#E63946]"></div>
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest"><span className="text-black font-black">MATINAL:</span> 07H - 09H (JEJUM)</span>
                      </li>
                      <li className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="w-2 h-2 rounded-full bg-[#E63946]"></div>
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest"><span className="text-black font-black">NOTURNO:</span> 20H - 22H (REPOUSO)</span>
                      </li>
                    </ul>
                  </div>
                  <Button fullWidth onClick={() => onNavigate(View.TRACKER)}>
                    CONFIGURAR TURBO
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-red-50 border-red-100 p-6">
             <h3 className="font-black text-red-800 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><ShieldAlert size={18} /> Restrições de Uso</h3>
             <ul className="text-[11px] font-bold text-red-700 space-y-2 uppercase tracking-tight ml-5">
               <li>Indivíduos com Diabetes (devido ao mel)</li>
               <li>Hipertensão arterial não controlada</li>
               <li>Patologias renais pré-existentes</li>
             </ul>
             <button className="text-[10px] font-black text-red-800 mt-6 hover:underline uppercase tracking-widest">Consultar base científica completa</button>
          </GlassCard>
        </div>
      ) : (
        <div className="space-y-4">
          {module.lessons.map((lesson, i) => (
            <GlassCard key={lesson.id} className="hoverEffect group bg-white border-none shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${lesson.completed ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-[#E63946] group-hover:text-white'}`}>
                    {lesson.completed ? <CheckSquare size={24} /> : <Play size={24} />}
                  </div>
                  <div>
                    <p className="text-[9px] text-[#86868B] uppercase font-black tracking-[0.3em]">AULA 0{i+1}</p>
                    <h4 className="font-black text-black uppercase tracking-tight">{lesson.title}</h4>
                  </div>
                </div>
                <ArrowRight size={20} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
