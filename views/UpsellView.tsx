
import React from 'react';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';

interface UpsellViewProps {
  onBack: () => void;
}

const KITS = [
  {
    id: '3-potes',
    title: '3 POTES',
    subtitle: 'TRATAMENTO 90 DIAS',
    badge: 'KIT INICIAL',
    badgeColor: 'bg-black',
    image: 'https://tudoprahoje.site/ltc/front/images/3potes_converted.webp',
    oldPrice: 'R$ 497,00',
    price: 'R$ 197,00',
    savings: 'R$300',
    checkoutUrl: 'https://pay.monetizze.com.br/DXB251008?mcr=AUX25704570',
  },
  {
    id: '5-potes',
    title: '5 POTES',
    subtitle: 'TRATAMENTO 150 DIAS',
    badge: 'MAIS VENDIDO',
    badgeColor: 'bg-[#C81D25]',
    image: 'https://tudoprahoje.site/ltc/front/images/5potes_converted.webp',
    oldPrice: 'R$ 797,00',
    price: 'R$ 297,00',
    savings: 'R$500',
    featured: true,
    checkoutUrl: 'https://pay.monetizze.com.br/DRM251009?mcr=AUX25704570',
  },
  {
    id: '10-potes',
    title: '10 POTES',
    subtitle: 'TRATAMENTO 300 DIAS',
    badge: 'MELHOR CUSTO',
    badgeColor: 'bg-black',
    image: 'https://tudoprahoje.site/ltc/front/images/10potes_converted.webp',
    oldPrice: 'R$ 1.297,00',
    price: 'R$ 559,90',
    savings: 'R$737',
    checkoutUrl: 'https://pay.monetizze.com.br/DUL251011?mcr=AUX25704570',
  }
];

export const UpsellView: React.FC<UpsellViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-0 pb-12">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors mb-8 font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft size={16} />
          Voltar ao Painel
        </button>

        <div className="text-center mb-12">
          <h2 className="text-sm font-black text-[#E63946] uppercase tracking-[0.3em] mb-2">Oferta Exclusiva</h2>
          <h1 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter mb-4">
            ACELERE SEUS <span className="text-[#E63946]">RESULTADOS</span>
          </h1>
          <p className="text-[#86868B] font-medium max-w-lg mx-auto leading-relaxed">
            Garanta seu estoque do Bio-Estimulador e mantenha sua vitalidade no nível máximo todos os dias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {KITS.map((kit) => (
            <div key={kit.id} className={`relative flex flex-col ${kit.featured ? 'md:-mt-4 md:mb-4' : ''}`}>
              {kit.featured && (
                <div className="absolute -top-4 left-0 right-0 z-10 flex justify-center">
                  <span className="bg-[#C81D25] text-white text-[10px] font-black px-4 py-1 rounded-full tracking-widest uppercase shadow-lg">
                    Recomendado
                  </span>
                </div>
              )}
              
              <GlassCard className={`flex-1 flex flex-col p-0 overflow-hidden border-2 ${kit.featured ? 'border-[#C81D25]' : 'border-transparent'}`}>
                {/* Header */}
                <div className={`${kit.badgeColor} text-white py-3 text-center`}>
                  <span className="text-xs font-black tracking-widest uppercase">{kit.badge}</span>
                </div>

                <div className="p-6 flex-1 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-1">{kit.title}</h3>
                  <p className="text-[10px] font-black text-[#C81D25] uppercase tracking-widest mb-6">{kit.subtitle}</p>

                  <div className="relative mb-8">
                    <img 
                      src={kit.image} 
                      alt={kit.title} 
                      className="w-48 h-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -top-2 -right-4 bg-[#C81D25] text-white w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-xl rotate-12 border-2 border-white">
                      <span className="text-[8px] font-black uppercase leading-none">ECONOMIZE</span>
                      <span className="text-xs font-black">{kit.savings}</span>
                    </div>
                  </div>

                  <div className="mt-auto w-full">
                    <p className="text-sm text-gray-400 line-through mb-1">De: {kit.oldPrice}</p>
                    <div className="flex items-baseline justify-center gap-1 mb-1">
                      <span className="text-3xl font-black text-black">{kit.price.split(',')[0]}</span>
                      <span className="text-sm font-black text-black">,{kit.price.split(',')[1]}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium mb-6">Preço à vista ou parcelado</p>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center justify-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest">
                        <ShieldCheck size={14} />
                        Compra 100% Segura
                      </div>
                      <div className="flex items-center justify-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest">
                        <Truck size={14} />
                        Frete Grátis
                      </div>
                    </div>

                    <Button 
                      fullWidth 
                      className={`h-14 text-xs font-black tracking-widest uppercase ${kit.featured ? 'bg-[#FFC107] hover:bg-[#FFB300] text-black shadow-[0_10px_20px_rgba(255,193,7,0.3)]' : 'bg-[#FFC107] hover:bg-[#FFB300] text-black'}`}
                      onClick={() => window.open(kit.checkoutUrl, '_blank')}
                    >
                      COMPRAR AGORA <ShoppingCart size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[10px] text-[#86868B] font-black uppercase tracking-[0.2em] opacity-60">
            Protocolo Força Natural © 2024 • Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
};
