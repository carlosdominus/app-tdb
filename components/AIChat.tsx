
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { AI_SYSTEM_INSTRUCTION } from '../constants';
import { GlassCard } from './GlassCard';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Re-initialize client to ensure freshest API key from environment
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: AI_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "Desculpe, tive um problema técnico. Pode repetir?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Ocorreu um erro na conexão. Tente novamente em instantes." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-[100] w-14 h-14 gradient-primary text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
      >
        <Sparkles size={24} />
      </button>

      {/* Chat Window */}
      <div className={`fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 sm:h-[600px] z-[110] transition-all duration-500 ease-apple ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
        <GlassCard className="h-full flex flex-col p-0 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] bg-white border-none sm:rounded-[32px]">
          {/* Header */}
          <div className="gradient-primary p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold">Guia do Protocolo</h3>
                <p className="text-[10px] uppercase font-black tracking-widest opacity-70">IA de Suporte</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
            {messages.length === 0 && (
              <div className="text-center py-10 px-6">
                <div className="w-16 h-16 bg-[#E63946]/10 text-[#E63946] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bot size={32} />
                </div>
                <h4 className="font-bold text-black">Olá! Como posso te ajudar?</h4>
                <p className="text-xs text-[#86868B] mt-2 font-medium">Tire dúvidas sobre tônicos, bônus ou onde encontrar algo no app.</p>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#E63946] text-white shadow-lg' : 'bg-white shadow-sm border border-gray-100 text-[#1D1D1F]'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <Loader2 size={20} className="animate-spin text-[#E63946]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Pergunte algo..."
                className="w-full pl-6 pr-14 py-4 rounded-2xl bg-[#F5F5F7] border-none focus:ring-2 focus:ring-[#E63946] transition-all outline-none font-medium"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 gradient-primary text-white rounded-xl flex items-center justify-center active:scale-95 disabled:opacity-50 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-center text-[#86868B] mt-2 uppercase font-black tracking-tighter opacity-50">IA treinada no Protocolo Força Natural</p>
          </div>
        </GlassCard>
      </div>
    </>
  );
};
