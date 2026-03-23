
import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { id?: string };
    }
  }
}

export type ProblemType = 'broxada' | 'gozo-rapido' | 'pau-meia-bomba' | 'sem-tesao';

export interface UserProfile {
  age?: number;
  weight?: number;
  mainProblem?: ProblemType;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  loginCount: number;
  currentDay: number;
  streak: number;
  completionRate: number;
  profile: UserProfile;
  onboardingCompleted: boolean;
}

export interface Ingredient {
  name: string;
  qty: string;
}

export interface Tonic {
  id: string;
  name: string;
  icon: string;
  type: 'main' | 'complementary' | 'detox';
  timing: string;
  serve: string;
  benefits: string[];
  ingredients: Ingredient[];
  instructions: string[];
  tips: string[];
  category: string;
}

export interface Bonus {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  value: string;
  badge: string;
  badgeColor: string;
  icon: string;
  locked?: boolean;
  content?: BonusContent;
  iframeUrl?: string;
}

export interface BonusContent {
  introduction: string;
  sections: BonusSection[];
  conclusion: string;
  disclaimer?: string;
}

export interface BonusSection {
  title: string;
  description?: string;
  whyError?: string;
  consequences?: string;
  stats?: string;
  caseStudy?: string;
  notToDo?: string;
  howToDo?: string[];
  extraTip?: string;
  subItems?: { label: string; items: string[] }[];
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  lessons: Lesson[];
  locked?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  type: 'text' | 'video' | 'pdf' | 'checklist';
  content?: string;
}

export interface DailyChecklist {
  date: string;
  mainTonic: boolean;
  complementary: string[];
}

export interface AppState {
  user: User | null;
  modules: Module[];
  checklist: Record<string, DailyChecklist>;
  isLoggedIn: boolean;
  hasSeenWelcomeVideo?: boolean;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  CATALOG = 'CATALOG',
  PREMIUM = 'PREMIUM',
  TRACKER = 'TRACKER',
  BONUSES = 'BONUSES',
  WARRANTY = 'WARRANTY',
  HELP = 'HELP',
  PROFILE = 'PROFILE',
  MODULE = 'MODULE',
  TONIC_DETAIL = 'TONIC_DETAIL',
  EXCLUSIVE_PACKAGE = 'EXCLUSIVE_PACKAGE',
  EXCLUSIVE_PACKAGE_2 = 'EXCLUSIVE_PACKAGE_2',
  LOGIN = 'LOGIN',
  ONBOARDING = 'ONBOARDING',
  SCIENCE = 'SCIENCE',
  CHECKLIST = 'CHECKLIST',
  UPSELL = 'UPSELL',
  ANTI_PRECOCE = 'ANTI_PRECOCE',
  GUIA_COMEDOR = 'GUIA_COMEDOR',
  TRUQUE_CUPIDO = 'TRUQUE_CUPIDO'
}
