
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverEffect = false 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        glass rounded-2xl p-6 
        transition-all duration-300 
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''} 
        ${hoverEffect ? 'hover:-translate-y-1 hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
