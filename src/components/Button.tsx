import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const variants = {
    primary: 'from-sunshine to-lemon hover:from-sunshine/80 hover:to-lemon/80 text-white border-sunshine',
    secondary: 'from-ocean to-deep-ocean hover:from-ocean/80 hover:to-deep-ocean/80 text-white border-ocean',
    success: 'from-mint to-emerald-400 hover:from-mint/80 hover:to-emerald-400/80 text-white border-mint',
    warning: 'from-coral to-pink-400 hover:from-coral/80 hover:to-pink-400/80 text-white border-coral',
    danger: 'from-red-400 to-red-500 hover:from-red-400/80 hover:to-red-500/80 text-white border-red-400'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`
        inline-flex items-center justify-center space-x-2
        bg-gradient-to-r ${variants[variant]}
        ${sizes[size]}
        rounded-full font-heading font-bold
        shadow-xl hover:shadow-2xl
        border-4 transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-ocean/50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;