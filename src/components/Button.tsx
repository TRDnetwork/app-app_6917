import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const baseClasses =
  'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-out-quart focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantClasses = {
  primary:
    'bg-[#e66000] text-white hover:bg-[#d45900] focus:ring-[#e66000]/50 shadow-sm hover:shadow-md',
  secondary:
    'bg-[#1a2e1a] text-white hover:bg-[#0d170d] focus:ring-[#1a2e1a]/50 shadow-sm hover:shadow-md',
  outline:
    'border border-[#e66000] text-[#e66000] hover:bg-[#e66000] hover:text-white focus:ring-[#e66000]/50',
  ghost:
    'text-[#e66000] hover:bg-[#e66000]/10 focus:ring-[#e66000]/50 hover:text-[#1a2e1a]',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50 shadow-sm hover:shadow-md',
};

const sizeClasses = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
};

const fullWidthClass = 'w-full';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? fullWidthClass : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
---