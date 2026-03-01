
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  // Updated to allow MouseEvent for compatibility with DashboardView and other views
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  disabled = false
}) => {
  const baseStyles = "px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "gradient-primary text-white shadow-[0_10px_30px_rgba(230,57,70,0.3)] hover:shadow-[0_15px_40px_rgba(230,57,70,0.4)] active:scale-95 hover:scale-[1.02]",
    secondary: "bg-black text-white shadow-xl hover:bg-[#1C1C1E] active:scale-95",
    outline: "border-2 border-black text-black hover:bg-black hover:text-white",
    ghost: "text-[#8E8E93] hover:text-black hover:bg-gray-100"
  };

  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};
