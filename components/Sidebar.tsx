
import React from 'react';
import { View } from '../types';
import { Home, HelpCircle, BookOpen, Gift, Beaker, Shield, User, X, LogOut, Zap, ShoppingCart, Crown } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  currentView: View;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, onLogout, currentView }) => {
  const menuItems = [
    { id: View.UPSELL, label: 'ACELERE SEUS RESULTADOS', icon: <ShoppingCart size={20} />, highlight: true },
    { id: View.DASHBOARD, label: 'Home', icon: <Home size={20} /> },
    { id: View.SCIENCE, label: 'FORÇA NATURAL', icon: <Beaker size={20} /> },
    { id: View.PREMIUM, label: 'DIAGNÓSTICO PERSONALIZADO', icon: <Crown size={20} /> },
    { id: View.BONUSES, label: 'BÔNUS ESPECIAL', icon: <Gift size={20} /> },
    { id: View.TRACKER, label: 'TÔNICO DO CAVALO', icon: <Zap size={20} /> },
    { id: View.ANTI_PRECOCE, label: 'PROTOCOLO ANTI-PRECOCE', icon: <BookOpen size={20} /> },
    { id: View.GUIA_COMEDOR, label: 'GUIA DO COMEDOR', icon: <BookOpen size={20} /> },
    { id: View.TRUQUE_CUPIDO, label: 'TRUQUE DO CUPIDO', icon: <BookOpen size={20} /> },
  ];

  const bottomItems = [
    { id: View.WARRANTY, label: 'Garantia', icon: <Shield size={20} /> },
    { id: View.PROFILE, label: 'Meu Perfil', icon: <User size={20} /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-white z-[70] shadow-2xl transition-transform duration-500 ease-apple ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white">
                <Logo size={24} />
              </div>
              <span className="font-poppins font-black text-lg text-black uppercase tracking-tighter">PROTOCOL <span className="text-[#E63946]">ELITE</span></span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 mt-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] text-left transition-all ${
                  currentView === item.id 
                    ? 'bg-[#E63946] text-white shadow-lg' 
                    : item.highlight 
                      ? 'bg-green-500 text-white hover:bg-green-600 shadow-md'
                      : 'text-[#86868B] hover:bg-gray-50 hover:text-black'
                }`}
              >
                <div className="shrink-0">{item.icon}</div>
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            ))}
            
            <div className="pt-4 pb-2">
              <div className="h-px bg-gray-100 w-full mb-4" />
              {bottomItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] text-left transition-all ${currentView === item.id ? 'bg-[#E63946] text-white shadow-lg' : 'text-[#86868B] hover:bg-gray-50 hover:text-black'}`}
                >
                  <div className="shrink-0">{item.icon}</div>
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] text-[#E63946] hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              Sair da Conta
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
