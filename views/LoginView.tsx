
import React, { useState } from 'react';
import { Logo } from '../components/Logo.tsx';
import { User, Mail } from 'lucide-react';

interface LoginViewProps {
  onLogin: (name: string, email: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onLogin(name, email);
    }
  };

  const loginImageUrl = "https://i.ibb.co/QFGpb2M4/foto-capa-tdb-1.webp";

  return (
    <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
      {/* Background Image - Covers top portion */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-60"
          style={{ backgroundImage: `url(${loginImageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[400px] px-6 mt-auto mb-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="glass-dark rounded-[40px] p-10 flex flex-col items-center border border-white/10 shadow-2xl">
          
          <div className="mb-10 text-center">
            <div className="w-16 h-16 mx-auto gradient-primary text-white mb-6 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(230,57,70,0.5)]">
              <Logo size={40} />
            </div>
            <h1 className="text-2xl font-black text-white font-poppins tracking-tighter uppercase">PROTOCOL <span className="text-[#E63946]">ELITE</span></h1>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Alta Performance Masculina</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">IDENTIFICAÇÃO ELITE</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nome Completo"
                  className="w-full pl-14 pr-8 py-5 rounded-[22px] bg-white/5 border border-white/10 focus:border-[#E63946] focus:bg-white/10 transition-all outline-none text-white placeholder-gray-600 text-base font-bold"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">E-MAIL DE ACESSO</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-14 pr-8 py-5 rounded-[22px] bg-white/5 border border-white/10 focus:border-[#E63946] focus:bg-white/10 transition-all outline-none text-white placeholder-gray-600 text-base font-bold"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full gradient-primary text-white py-5 rounded-[22px] font-black text-sm shadow-[0_15px_35px_rgba(230,57,70,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all mt-6 uppercase tracking-[0.2em]"
            >
              ENTRAR NO PAINEL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
