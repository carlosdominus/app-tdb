
import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { MessageCircle, Mail, ChevronRight, HelpCircle, ChevronLeft, ShieldCheck } from 'lucide-react';

export const HelpView: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const supportEmail = "contato@suportmedia.com";
  const whatsappUrl = "https://wa.me/558394186965";

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      {onBack && (
        <div className="mb-4">
          <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
            <ChevronLeft size={20} /> Voltar
          </button>
        </div>
      )}

      <div className="text-center">
        <h1 className="text-4xl font-black text-black mb-2 uppercase tracking-tighter">Suporte VIP</h1>
        <p className="text-[#86868B] font-bold text-sm uppercase tracking-widest">Estamos aqui para garantir sua evolução.</p>
      </div>

      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-10 flex flex-col items-center text-center gap-6 group hover:bg-[#2ECC71]/5 transition-colors cursor-pointer border-none shadow-sm bg-white" onClick={() => window.open(whatsappUrl, '_blank')}>
            <div className="w-20 h-20 rounded-[28px] bg-green-100 text-[#2ECC71] flex items-center justify-center group-hover:bg-[#2ECC71] group-hover:text-white transition-all shadow-sm">
              <MessageCircle size={36} />
            </div>
            <div>
              <h3 className="text-xl font-black text-black uppercase tracking-tight">WhatsApp Elite</h3>
              <p className="text-xs text-[#86868B] font-bold uppercase tracking-widest mt-2">Atendimento imediato e humano</p>
            </div>
            <div className="mt-4 px-6 py-3 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black">Abrir conversa</div>
          </GlassCard>

          <GlassCard className="p-10 flex flex-col items-center text-center gap-6 group hover:bg-black/5 transition-colors cursor-pointer border-none shadow-sm bg-white" onClick={() => window.location.href = `mailto:${supportEmail}`}>
            <div className="w-20 h-20 rounded-[28px] bg-gray-100 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm">
              <Mail size={36} />
            </div>
            <div>
              <h3 className="text-xl font-black text-black uppercase tracking-tight">E-mail Oficial</h3>
              <p className="text-xs text-[#86868B] font-bold uppercase tracking-widest mt-2">Para questões burocráticas ou PDFs</p>
            </div>
            <div className="mt-4 px-6 py-3 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black">{supportEmail}</div>
          </GlassCard>
        </div>
      </section>

      <section className="p-10 bg-black text-white rounded-[40px] flex items-start gap-8 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
          <ShieldCheck size={32} className="text-[#E63946]" />
        </div>
        <div className="relative z-10">
          <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">Compromisso com o Resultado</h4>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            Nossa equipe de suporte não apenas resolve problemas, ela orienta seu protocolo. Caso tenha dúvidas sobre dosagens ou reações, não hesite em nos contatar.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </section>
    </div>
  );
};
