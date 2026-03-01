
import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { ChevronLeft, Beaker, Zap, Heart, Info, Play, Youtube, Brain } from 'lucide-react';

export const ScienceView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        <span className="bg-black text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Base Científica</span>
      </div>

      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-white border border-gray-100 rounded-3xl mx-auto flex items-center justify-center text-[#E63946] shadow-xl">
          <Beaker size={36} />
        </div>
        <h1 className="text-4xl font-black text-black uppercase tracking-tighter">A Ciência do Homem</h1>
        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Onde a biologia encontra a alta performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="p-8 border-none bg-white shadow-sm space-y-6">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-black text-black uppercase tracking-tight">O Fator Hormonal</h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            O protocolo foca na redução drástica do Cortisol (hormônio do estresse) durante a janela matinal. Isso permite que a Testosterona livre atue sem bloqueadores bioquímicos, facilitando a resposta erétil imediata.
          </p>
        </GlassCard>

        <GlassCard className="p-8 border-none bg-white shadow-sm space-y-6">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white">
            <Heart size={24} />
          </div>
          <h3 className="text-xl font-black text-black uppercase tracking-tight">Vascularização Arterial</h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            Nossas formulações otimizam a produção de Óxido Nítrico. Diferente de soluções temporárias, o Protocolo Força Natural limpa as paredes arteriais cronicamente, garantindo que o fluxo sanguíneo seja potente e constante.
          </p>
        </GlassCard>
      </div>

      <GlassCard className="bg-black text-white border-none p-10 relative overflow-hidden shadow-2xl rounded-[40px]">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Quer se aprofundar?</h2>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              Assista aos conteúdos exclusivos do canal <b>O Médico dos Homens</b> e entenda cada detalhe da sua fisiologia masculina com quem é referência no assunto.
            </p>
            <button 
              onClick={() => window.open('https://www.youtube.com/@omedicodoshomens', '_blank')}
              className="px-8 py-4 bg-[#FF0000] text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,0,0,0.3)]"
            >
              <Youtube size={20} /> ASSISTIR NO YOUTUBE
            </button>
          </div>
          <div className="w-full md:w-64 aspect-video md:aspect-square bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group cursor-pointer" onClick={() => window.open('https://www.youtube.com/@omedicodoshomens', '_blank')}>
            <Play size={48} className="text-white group-hover:scale-125 transition-all opacity-50" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </GlassCard>

      <div className="p-8 bg-gray-50 rounded-[40px] flex items-center gap-6 border border-gray-100">
        <Brain size={32} className="text-gray-400" />
        <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Atenção: Os dados apresentados são baseados em estudos de fisiologia clínica masculina aplicados ao dia a dia.</p>
      </div>
    </div>
  );
};
