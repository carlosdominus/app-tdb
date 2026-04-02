
import React from 'react';
import { AppState, View } from '../types';
import { GlassCard } from '../components/GlassCard';
import { User, Shield, LogOut, HelpCircle, ChevronRight, Crown, Activity, ListChecks, BookOpen } from 'lucide-react';

interface ProfileViewProps {
  state: AppState;
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (view: View) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ state, onBack, onLogout, onNavigate }) => {
  // Cálculo baseado em datas do calendário (zerando as horas)
  const getDiffDays = () => {
    const createdDate = new Date(state.user?.createdAt || new Date());
    createdDate.setHours(0, 0, 0, 0);
    
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(todayDate.getTime() - createdDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const diffDays = getDiffDays();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center py-6">
        <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-4xl font-black shadow-2xl mb-4">
           {state.user?.name.charAt(0)}
        </div>
        <h2 className="text-2xl font-black text-black uppercase tracking-tighter">{state.user?.name}</h2>
        <p className="text-[#86868B] text-xs font-bold uppercase tracking-widest">{state.user?.email}</p>
        
        <div className="mt-6 flex gap-3">
           <span className="px-4 py-1.5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Membro Premium</span>
           <span className="px-4 py-1.5 bg-red-50 text-[#E63946] rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100 flex items-center gap-2">
             <Activity size={12} /> {diffDays} {diffDays === 1 ? 'DIA ATIVO' : 'DIAS ATIVOS'}
           </span>
        </div>
      </div>

      <div className="space-y-4">
        <GlassCard className="p-0 overflow-hidden divide-y divide-gray-100 bg-white border-none shadow-sm">
          <MenuLink icon={<Crown size={18} />} label="Diagnóstico Premium" onClick={() => onNavigate(View.PREMIUM)} />
          <MenuLink icon={<ListChecks size={18} />} label="Checklist Diário" onClick={() => onNavigate(View.CHECKLIST)} />
          <MenuLink icon={<BookOpen size={18} />} label="Ciência por Trás" onClick={() => onNavigate(View.SCIENCE)} />
          <MenuLink icon={<Shield size={18} />} label="Garantia 90 Dias" onClick={() => onNavigate(View.WARRANTY)} />
          <MenuLink icon={<HelpCircle size={18} />} label="Suporte e Ajuda" onClick={() => onNavigate(View.HELP)} />
          <button 
            onClick={onLogout}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-4 text-red-500 font-bold uppercase tracking-widest text-[11px]">
              <LogOut size={18} /> Sair da Conta
            </div>
          </button>
        </GlassCard>
      </div>
    </div>
  );
};

const MenuLink: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors group text-left"
  >
    <div className="flex items-center gap-4 text-black font-black uppercase tracking-widest text-[11px]">
      <div className="text-gray-400 group-hover:text-black transition-colors">{icon}</div>
      {label}
    </div>
    <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-all" />
  </button>
);
