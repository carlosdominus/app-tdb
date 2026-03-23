
import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { AppState } from '../types';
import { 
  Crown, MessageCircle, Activity, ChevronRight, Zap, Target, 
  Timer, Info, CheckCircle2, AlertTriangle, TrendingUp, 
  Clock, Play, Pause, RotateCcw, Brain, ShieldCheck,
  ChevronLeft, ArrowRight, Video
} from 'lucide-react';

interface QuizAnswer {
  age: string;
  health: string;
  symptoms: string;
  sexual_frequency: string;
  morning_erection: string;
  frequency: string;
  lifestyle: string;
  description: string;
}

export const PremiumView: React.FC<{ state: AppState; onBack: () => void }> = ({ state, onBack }) => {
  const [funnelStep, setFunnelStep] = useState<'vsl' | 'quiz' | 'redirect'>('vsl');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer>({
    age: '',
    health: '',
    symptoms: '',
    sexual_frequency: '',
    morning_erection: '',
    frequency: '',
    lifestyle: '',
    description: ''
  });

  useEffect(() => {
    if (funnelStep === 'vsl') {
      const script = document.createElement('script');
      script.src = "https://scripts.converteai.net/853c4f04-8442-44da-b89d-0541d78036bb/ab-test/69bdc134423ef7939ca5dc36/player.js";
      script.async = true;
      document.head.appendChild(script);

      const handleVideoFinish = (e: any) => {
        // VTurb event for video finished
        if (e.detail && e.detail.id === 'ab-69bdc134423ef7939ca5dc36') {
          handleStartQuiz();
        } else if (!e.detail) {
          // Fallback if detail is missing but event fired
          handleStartQuiz();
        }
      };

      window.addEventListener('vturb_video_finished', handleVideoFinish);

      return () => {
        document.head.removeChild(script);
        window.removeEventListener('vturb_video_finished', handleVideoFinish);
      };
    }
  }, [funnelStep]);

  const handleStartQuiz = () => setFunnelStep('quiz');

  const handleQuizComplete = (answers: QuizAnswer) => {
    setQuizAnswers(answers);
    setFunnelStep('redirect');
  };

  if (funnelStep === 'vsl') {
    return (
      <div className="animate-in fade-in duration-700 -mx-6 sm:-mx-10 flex flex-col items-center">
        <div className="w-full">
          {/* Vturb Smartplayer */}
          <div id="vsl-container" className="w-full overflow-hidden shadow-2xl shadow-black/20">
            <vturb-smartplayer 
              id="ab-69bdc134423ef7939ca5dc36" 
              style={{ display: 'block', margin: '0 auto', width: '100%' }}
            ></vturb-smartplayer>
          </div>
        </div>

        <div className="mt-12 px-6 w-full max-w-md animate-in slide-in-from-bottom duration-1000 delay-500">
          <Button 
            onClick={handleStartQuiz}
            className="w-full py-6 text-lg font-black uppercase tracking-tighter flex items-center justify-center gap-3 group"
          >
            Continuar para a consulta
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-center mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60">
            Clique acima para iniciar sua avaliação personalizada
          </p>
        </div>
      </div>
    );
  }

  if (funnelStep === 'quiz') {
    return <DiagnosisQuiz onComplete={handleQuizComplete} onBack={() => setFunnelStep('vsl')} />;
  }

  if (funnelStep === 'redirect') {
    return <RedirectStep answers={quizAnswers} user={state.user} />;
  }

  return null;
};

const DiagnosisQuiz: React.FC<{ onComplete: (answers: QuizAnswer) => void; onBack: () => void }> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>({
    age: '',
    health: '',
    symptoms: '',
    sexual_frequency: '',
    morning_erection: '',
    frequency: '',
    lifestyle: '',
    description: ''
  });

  const questions = [
    {
      id: 'age',
      label: 'Qual a sua idade?',
      options: ['Menos de 30 anos', 'Entre 30 e 45 anos', 'Entre 46 e 60 anos', 'Mais de 60 anos']
    },
    {
      id: 'health',
      label: 'Você possui alguma condição de saúde pré-existente?',
      options: ['Diabetes', 'Hipertensão', 'Problemas Cardíacos', 'Nenhuma das anteriores']
    },
    {
      id: 'symptoms',
      label: 'Qual o seu principal objetivo ou problema hoje?',
      options: ['Ereção fraca ou instável', 'Ejaculação precoce', 'Falta de libido/desejo', 'Cansaço e falta de energia']
    },
    {
      id: 'sexual_frequency',
      label: 'Qual a sua frequência média de atividade sexual por semana?',
      options: ['Nenhuma', '1 a 2 vezes', '3 a 5 vezes', 'Mais de 5 vezes']
    },
    {
      id: 'morning_erection',
      label: 'Com que frequência você acorda com ereções matinais?',
      options: ['Sempre', 'Frequentemente', 'Raramente', 'Nunca']
    },
    {
      id: 'frequency',
      label: 'Com que frequência você sente que seu desempenho não é o ideal?',
      options: ['Sempre', 'Frequentemente', 'Às vezes', 'Raramente']
    },
    {
      id: 'lifestyle',
      label: 'Como você classificaria seu nível de estresse e qualidade de sono?',
      options: ['Péssimo', 'Regular', 'Bom', 'Excelente']
    },
    {
      id: 'description',
      label: 'Descreva seu problema',
      type: 'text'
    }
  ];

  const handleOptionSelect = (option: string) => {
    const updatedAnswers = { ...answers, [questions[currentQuestion].id]: option };
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(updatedAnswers);
    }
  };

  const handleTextSubmit = () => {
    onComplete(answers);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black font-black text-[10px] uppercase tracking-widest">
          <ChevronLeft size={16} /> Voltar
        </button>
        <div className="flex-1 max-w-[150px] mx-4">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full gradient-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <span className="text-[10px] font-black text-gray-400 uppercase">{currentQuestion + 1}/{questions.length}</span>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-2xl font-black text-black uppercase tracking-tighter leading-tight">
          {questions[currentQuestion].label}
        </h2>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
          {questions[currentQuestion].type === 'text' ? 'Conte-nos um pouco mais sobre o que você está sentindo' : 'Selecione a opção que melhor te descreve'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {questions[currentQuestion].type === 'text' ? (
          <div className="space-y-6">
            <textarea
              value={answers.description}
              onChange={(e) => setAnswers({ ...answers, description: e.target.value })}
              placeholder="Escreva aqui..."
              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl font-bold text-sm min-h-[150px] focus:border-[#E63946] focus:ring-0 transition-all outline-none resize-none"
            />
            <Button 
              onClick={handleTextSubmit}
              disabled={!answers.description.trim()}
              className="w-full py-6 text-lg font-black uppercase tracking-tighter flex items-center justify-center gap-3 group"
            >
              Finalizar Consulta
              <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        ) : (
          questions[currentQuestion].options?.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl text-left font-bold text-sm uppercase tracking-tight hover:border-[#E63946] hover:bg-red-50 transition-all flex items-center justify-between group"
            >
              {option}
              <ChevronRight size={18} className="text-gray-300 group-hover:text-[#E63946] transition-all" />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

const RedirectStep: React.FC<{ answers: QuizAnswer; user: any }> = ({ answers, user }) => {
  useEffect(() => {
    // Construct the message
    const message = `Olá, eu me chamo ${user?.name}, meu email é ${user?.email}. Tenho ${answers.age} e os meus sintomas/problemas são: ${answers.symptoms}. Minha saúde: ${answers.health}. Frequência sexual: ${answers.sexual_frequency}. Ereções matinais: ${answers.morning_erection}. Frequência de falha: ${answers.frequency}. Estilo de vida: ${answers.lifestyle}. Descrição do problema: ${answers.description}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // The redirect URL (managed by support team on their domain)
    // This page will handle the final WhatsApp redirection with the dynamic number
    const redirectBaseUrl = "https://redehoje.site/tdb/etapa3/"; 
    const finalUrl = `${redirectBaseUrl}?name=${encodeURIComponent(user?.name)}&email=${encodeURIComponent(user?.email)}&msg=${encodedMessage}`;

    // Redirect after a short delay to show the loading state
    const timer = setTimeout(() => {
      window.location.href = finalUrl;
    }, 1200);

    return () => clearTimeout(timer);
  }, [answers, user]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-1000">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-gray-100 rounded-full"></div>
        <div className="w-24 h-24 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center text-[#E63946]">
          <Zap size={32} />
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-black text-black uppercase tracking-tighter leading-tight">Você está sendo levado para a Doutora...</h2>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest max-w-[250px] mx-auto leading-relaxed">
          Conectando ao atendimento prioritário.
        </p>
      </div>

      <GlassCard className="p-6 bg-green-50 border-green-100 flex items-center gap-4">
        <ShieldCheck className="text-green-500" size={24} />
        <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Conexão Segura Estabelecida</span>
      </GlassCard>
    </div>
  );
};

const XCircle: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
);

