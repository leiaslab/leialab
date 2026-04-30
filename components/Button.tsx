import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: LucideIcon;
  iconSize?: number;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', isLoading, icon: Icon, iconSize = 18, className = '', disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 relative overflow-hidden group"; // Añadido 'relative overflow-hidden group'
    
    const variants = {
      primary: "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-purple-900/40 hover:opacity-90",
      outline: "gradient-border text-gray-200 hover:text-white hover:border-purple-600/50",
      ghost: "text-gray-400 hover:text-white hover:bg-white/5",
    };

    const sizeStyles = "px-6 py-3.5 text-sm";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizeStyles} ${className}`}
        disabled={isLoading || disabled}
        {...props}
      >
        {/* Efecto de brillo animado */}
        {variant === 'primary' && ( // Aplicar el brillo solo a la variante 'primary'
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none" />
        )}

        {/* Contenido del botón (asegurarse de que esté por encima del brillo) */}
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Cargando...</span>
          </>
        ) : (
          <>
            {Icon && <Icon size={iconSize} className={children ? '' : 'mx-auto'} />}
            {children}
          </>
        )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;