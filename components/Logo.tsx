
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 24 }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.25" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="lucide lucide-banana"
      >
        <path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"/>
        <path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"/>
      </svg>
    </div>
  );
};
