import React from 'react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'danger';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#39A900] text-white hover:bg-[#2d8500]",
    secondary: "bg-[#00324D] text-white hover:bg-[#002438]",
    accent: "bg-[#82DEF0] text-[#00324D] hover:bg-[#68cbe0]",
    outline: "border-2 border-[#00324D] text-[#00324D] hover:bg-[#F1F5F9]",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base min-h-[44px]", // 44px for touch targets
    lg: "px-8 py-4 text-lg min-h-[56px]"
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-slate-100 p-5 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'blue' | 'yellow' | 'red' }> = ({ children, color = 'blue' }) => {
  const colors = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- ProgressBar ---
export const ProgressBar: React.FC<{ value: number; max?: number; color?: string }> = ({ value, max = 100, color = 'bg-[#39A900]' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full bg-slate-200 rounded-full h-2.5">
      <div 
        className={`${color} h-2.5 rounded-full transition-all duration-500`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};