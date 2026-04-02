
import { Tonic, ProblemType, Bonus, Module } from './types';

export const COLORS = {
  primary: '#E63946',
  secondary: '#000000',
  accent: '#FF1F1F',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  mediumGray: '#8E8E93',
  darkGray: '#1C1C1E'
};

export const TONICS: Record<string, Tonic> = {
  'anti-broxada': {
    id: 'anti-broxada',
    name: 'Tônico Anti-Broxada',
    icon: 'Zap',
    type: 'main',
    category: 'broxada',
    timing: 'Manhã (jejum leve)',
    serve: 'Esse tônico ajuda o corpo a funcionar melhor na hora H, apoiando a circulação e a resposta natural do organismo.',
    benefits: ['Máxima Circulação', 'Prontidão Nervosa', 'Sustentação do Ato'],
    ingredients: [
      { name: 'Água Morna', qty: '1 copo' },
      { name: 'Limão Tahiti', qty: '1/2 unidade (suco)' },
      { name: 'Bicarbonato (APENAS 1X POR SEMANA - DIAS 1, 8, 15)', qty: '1 colher café rasa' },
      { name: 'Mel Puro', qty: '1 colher chá' }
    ],
    instructions: [
      'Aqueça a água até ficar morna (não ferva).',
      'Esprema o suco de meio limão na água.',
      'Se for dia de bicarbonato, adicione-o e espere a reação passar.',
      'Finalize com o mel e misture bem.',
      'Beba em seguida, preferencialmente em jejum leve.'
    ],
    tips: ['Ingredientes naturais de uso tradicional.', 'Não exceda as quantidades.', 'Não substitui orientação médica.']
  },
  'anti-gozada': {
    id: 'anti-gozada',
    name: 'Tônico Anti-Gozada',
    icon: 'Timer',
    type: 'main',
    category: 'gozo-rapido',
    timing: 'Noite (1h antes de dormir)',
    serve: 'Muito usado pra acalmar o corpo, reduzir tensão e ajudar no controle durante o sexo.',
    benefits: ['Controle Neuro-Muscular', 'Redução de Ansiedade', 'Performance Prolongada'],
    ingredients: [
      { name: 'Água', qty: '1 copo' },
      { name: 'Chá de Camomila ou Erva-Doce', qty: '1 xícara (morno)' },
      { name: 'Mel Puro', qty: '1 colher chá' },
      { name: 'Otimizador de pH (Bicarbonato)', qty: '1 colher café rasa (Opcional - 1x por semana)' }
    ],
    instructions: [
      'Prepare o chá de camomila ou erva-doce normalmente.',
      'Deixe amornar até uma temperatura agradável.',
      'Se for usar o Otimizador de pH, adicione-o agora e misture.',
      'Adicione a colher de mel.',
      'Beba relaxando a respiração.',
      'Pode ser tomado todos os dias à noite.'
    ],
    tips: ['Ideal para quem sente muita ansiedade na hora H.', 'Uso tradicional para relaxamento muscular.']
  },
  'pau-de-rocha': {
    id: 'pau-de-rocha',
    name: 'Tônico Pau de Rocha',
    icon: 'Activity',
    type: 'main',
    category: 'pau-meia-bomba',
    timing: 'Meio da Tarde',
    serve: 'Esse tônico dá suporte à energia corporal e à firmeza natural do desempenho masculino.',
    benefits: ['Suporte à Rigidez', 'Densidade Tecidual', 'Vitalidade Corporal'],
    ingredients: [
      { name: 'Água', qty: '1 copo' },
      { name: 'Gengibre Ralado', qty: '1 colher chá' },
      { name: 'Canela em pó', qty: '1 pitada' },
      { name: 'Mel Puro', qty: '1 colher chá' },
      { name: 'Otimizador de pH (Bicarbonato)', qty: '1 colher café rasa (Opcional - 1x por semana)' }
    ],
    instructions: [
      'Misture o gengibre ralado na água.',
      'Adicione a pitada de canela.',
      'Se for usar o Otimizador de pH, adicione-o agora e misture.',
      'Finalize com o mel para equilibrar o sabor.',
      'Beba no meio da tarde.',
      'NÃO usar à noite para não afetar o sono.'
    ],
    tips: ['O gengibre e a canela são conhecidos termogênicos naturais.', 'Promove sensação de prontidão.']
  },
  'tesao-de-touro': {
    id: 'tesao-de-touro',
    name: 'Tônico Tesão de Touro',
    icon: 'Flame',
    type: 'main',
    category: 'sem-tesao',
    timing: 'Manhã ou 1h antes do encontro',
    serve: 'Tradicionalmente usado pra aumentar disposição, energia e presença masculina.',
    benefits: ['Libido Elevada', 'Foco Dominante', 'Energia de Base'],
    ingredients: [
      { name: 'Água', qty: '1 copo' },
      { name: 'Limão Tahiti', qty: '1/2 unidade (suco)' },
      { name: 'Mel Puro', qty: '1 colher chá' },
      { name: 'Aveia Fina', qty: '1 colher sopa' },
      { name: 'Otimizador de pH (Bicarbonato)', qty: '1 colher café rasa (Opcional - 1x por semana)' }
    ],
    instructions: [
      'Coloque a aveia na água e misture bem.',
      'Adicione o suco de limão.',
      'Se for usar o Otimizador de pH, adicione-o agora e misture.',
      'Finalize com o mel.',
      'Beba pela manhã ou uma hora antes da atividade física ou sexual.'
    ],
    tips: ['A aveia fornece energia de liberação lenta.', 'O limão ajuda na vitalidade geral.']
  },
  'detox-vascular': {
    id: 'detox-vascular',
    name: 'Detox de Limpeza Vascular',
    icon: 'Droplet',
    type: 'detox',
    category: 'all',
    timing: 'Manhã ou Pré-Treino',
    serve: 'O "Viagra Natural". Promove desintoxicação e melhora drástica da potência erétil através do óxido nítrico.',
    benefits: ['Limpeza Vascular', 'Vasodilatação Potente', 'Fluxo Sanguíneo Otimizado'],
    ingredients: [
      { name: 'Melancia com parte branca', qty: '1/4 unidade' },
      { name: 'Beterraba crua', qty: '1/2 unidade' },
      { name: 'Pepino inteiro', qty: '1 unidade' },
      { name: 'Limão com casca (sem semente)', qty: '1 unidade' },
      { name: 'Água de coco', qty: '200ml' },
      { name: 'Mel (Opcional)', qty: '1 colher sopa' }
    ],
    instructions: [
      'Lave bem todos os ingredientes, pois usaremos a casca.',
      'Bata tudo no liquidificador até ficar homogêneo.',
      'NÃO COE. As fibras ajudam na desintoxicação.',
      'Beba um copo por dia.'
    ],
    tips: ['Incluir a parte branca da melancia é o segredo da Citrulina.']
  }
};

export const BONUSES_DATA: Bonus[] = [
  {
    id: 'bonus-erotic',
    title: "Pensamentos Eróticos das Mulheres",
    subtitle: "Acesso Exclusivo",
    description: "Entenda o que se passa na mente feminina durante a intimidade.",
    value: "Inestimável",
    badge: "VIP",
    badgeColor: "bg-[#E63946]",
    icon: "Flame",
    iframeUrl: "https://drive.google.com/file/d/1sMc71po4ZwZu4OXTwjnS3RZ2mQQf7lRE/preview"
  }
];

export const PROBLEM_TO_TONIC: Record<ProblemType, string> = {
  'broxada': 'anti-broxada',
  'gozo-rapido': 'anti-gozada',
  'pau-meia-bomba': 'pau-de-rocha',
  'sem-tesao': 'tesao-de-touro'
};

export const MOCK_USER = {
  id: 'user_123',
  name: 'Membro Elite',
  email: 'elite@protocolo.com',
  createdAt: new Date().toISOString(),
  loginCount: 1,
  currentDay: 1,
  streak: 0,
  completionRate: 0,
  onboardingCompleted: false,
  profile: {}
};

export const INITIAL_MODULES: Module[] = [
  {
    id: 'mod-kegel',
    title: 'GUIA DE EXERCÍCIOS KEGEL',
    icon: 'Activity',
    lessons: [
      { id: 'l1', title: 'Identificando os Músculos', completed: false, type: 'text' },
      { id: 'l2', title: 'Técnica e Rotina', completed: false, type: 'text' },
      { id: 'l3', title: 'Benefícios e Progressão', completed: false, type: 'text' }
    ]
  }
];

export const AI_SYSTEM_INSTRUCTION = "Você é um assistente especialista no Protocolo Força Natural.";
