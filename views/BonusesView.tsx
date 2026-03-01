
import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { BONUSES_DATA } from '../constants';
import { Bonus } from '../types';
import { ChevronLeft, Flame, Crown, Shield } from 'lucide-react';

export const BonusesView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const bonus = BONUSES_DATA[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-black uppercase tracking-tighter">Bônus Exclusivos</h1>
        <button onClick={onBack} className="text-[#86868B] hover:text-black font-black text-[10px] uppercase tracking-widest">Home</button>
      </div>

      <GlassCard className="bg-white border-none shadow-sm p-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center gap-8 border-b border-gray-100 pb-8">
          <div className="w-16 h-16 gradient-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
             <Flame size={32} />
          </div>
          <div className="flex-1">
             <h3 className="text-2xl font-black uppercase tracking-tight">{bonus.title}</h3>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{bonus.subtitle}</p>
          </div>
          <span className="bg-[#E63946] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest self-start md:self-auto">LIBERADO</span>
        </div>

        <p className="text-gray-500 font-medium leading-relaxed italic">
          "{bonus.description}"
        </p>

        <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-black">
          <iframe 
            src={bonus.iframeUrl} 
            width="100%" 
            height="600" 
            allow="autoplay"
            className="w-full border-none"
          ></iframe>
        </div>
      </GlassCard>

      <div className="p-8 bg-black text-white rounded-[40px] flex items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
          <Shield size={28} className="text-[#E63946]" />
        </div>
        <div>
          <h4 className="font-black uppercase tracking-tight">Conteúdo VIP</h4>
          <p className="text-xs text-gray-400 font-medium">Este material é restrito e não pode ser compartilhado externamente.</p>
        </div>
      </div>
    </div>
  );
};
