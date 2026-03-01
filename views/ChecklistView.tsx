
import React from 'react';
import { AppState, View, DailyChecklist } from '../types';
import { GlassCard } from '../components/GlassCard';
import { ChevronLeft, CheckCircle2, Circle, Clock, Target, Calendar } from 'lucide-react';

interface ChecklistViewProps {
  state: AppState;
  onBack: () => void;
  onTonicToggle: (date: string, type: 'main' | 'complementary', tonicId?: string) => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({ state, onBack, onTonicToggle }) => {
  const startDate = new Date(state.user?.createdAt || new Date());
  
  const getDayDate = (dayIndex: number) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + dayIndex);
    return d.toISOString().split('T')[0];
  };

  const days = Array.from({ length: 21 }, (_, i) => {
    const dateStr = getDayDate(i);
    const check = state.checklist[dateStr] || { mainTonic: false, complementary: [] };
    const isToday = new Date().toISOString().split('T')[0] === dateStr;
    const isPast = new Date(dateStr) < new Date(new Date().toISOString().split('T')[0]);
    
    return {
      day: i + 1,
      date: dateStr,
      completed: check.mainTonic,
      isToday,
      isPast
    };
  });

  // Fix: Added explicit type cast for Object.values to avoid 'unknown' type error
  const completedCount = (Object.values(state.checklist) as DailyChecklist[]).filter(c => c.mainTonic).length;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        <span className="bg-black text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Protocolo 21 Dias</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">Seu Checklist</h1>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Mantenha a consistência para resultados permanentes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {days.map((day) => (
              <GlassCard 
                key={day.day}
                onClick={() => onTonicToggle(day.date, 'main')}
                className={`p-6 border-none flex items-center justify-between transition-all ${day.completed ? 'bg-black text-white' : day.isToday ? 'bg-white border-2 border-red-500 ring-4 ring-red-50' : 'bg-white shadow-sm'}`}
              >
                <div className="flex flex-col">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${day.completed ? 'text-gray-400' : 'text-gray-400'}`}>DIA {day.day}</span>
                  <span className="text-lg font-black tracking-tight">{day.isToday ? 'HOJE' : day.date.split('-').reverse().slice(0, 2).join('/')}</span>
                </div>
                {day.completed ? <CheckCircle2 size={24} className="text-[#E63946]" /> : <Circle size={24} className="text-gray-200" />}
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <GlassCard className="glass-dark text-white border-none p-8 sticky top-28">
            <Target size={32} className="text-[#E63946] mb-6" />
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">Progresso Atual</h3>
            <div className="text-4xl font-black text-[#E63946] mb-2">{Math.round((completedCount/21)*100)}%</div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">{completedCount} de 21 dias concluídos</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-300">
                <Calendar size={14} className="text-[#E63946]" /> Início: {startDate.toLocaleDateString()}
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-300">
                <Clock size={14} className="text-[#E63946]" /> Frequência: Diária
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
