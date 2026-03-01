
import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { ChevronLeft, ShieldCheck, Mail, MessageCircle, Info } from 'lucide-react';

export const WarrantyView: React.FC<{ onBack: () => void; firstAccessDate: string }> = ({ onBack, firstAccessDate }) => {
  const refundUrl = "https://nen.auto-jornada.space/webhook/refund";
  const whatsappUrl = "https://wa.me/15558648988";
  const supportEmail = "contato@suportmedia.com";
  
  const created = new Date(firstAccessDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const remainingDays = 90 - diffDays;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        <h1 className="text-xl font-black text-black uppercase tracking-tighter">Garantia Elite</h1>
      </div>

      <GlassCard className="bg-black text-white border-none p-10 relative overflow-hidden shadow-2xl rounded-[40px]">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 gradient-primary rounded-[28px] flex items-center justify-center text-white shadow-xl mb-8">
             <ShieldCheck size={40} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">90 Dias de Segurança</h2>
          <p className="text-gray-400 text-sm font-medium max-w-sm mb-10 leading-relaxed">
            Sua satisfação absoluta ou seu dinheiro de volta. Sem burocracia, direto no ponto.
          </p>

          <div className="w-full grid grid-cols-2 gap-6 mb-10">
             <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">DIAS DESDE O ACESSO</p>
                <p className="text-3xl font-black text-[#E63946]">{diffDays}</p>
             </div>
             <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">RESTANTE</p>
                <p className="text-3xl font-black text-white">{Math.max(0, remainingDays)}d</p>
             </div>
          </div>

          <div className="w-full p-4 bg-white/5 rounded-2xl border border-white/10 mb-8">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">E-MAIL DE SUPORTE</p>
            <p className="text-sm font-bold text-white lowercase">{supportEmail}</p>
          </div>

          <div className="w-full space-y-4">
            <Button fullWidth onClick={() => window.open(refundUrl, '_blank')} variant="ghost" className="bg-white/5 border border-white/10 text-white hover:bg-white/10">
               SOLICITAR REEMBOLSO (FORMS)
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <Button fullWidth onClick={() => window.open(whatsappUrl, '_blank')} className="bg-[#2ECC71] border-none text-white font-black">
                 WHATSAPP
              </Button>
              <Button fullWidth onClick={() => window.location.href = `mailto:${supportEmail}`} className="bg-white text-black border-none font-black">
                 EMAIL
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 gradient-primary opacity-20 rounded-full -mr-32 -mb-32 blur-3xl"></div>
      </GlassCard>

      <div className="p-8 bg-white border border-gray-100 rounded-[40px] flex gap-6 shadow-sm">
         <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
            <Info size={24} />
         </div>
         <p className="text-sm text-gray-500 font-medium leading-relaxed">
           <b className="text-black uppercase tracking-tight block mb-1">Compromisso em Dobro:</b> Se em 90 dias você seguiu o checklist e não teve resultados, nós triplicamos o suporte ou devolvemos o valor integral.
         </p>
      </div>
    </div>
  );
};
