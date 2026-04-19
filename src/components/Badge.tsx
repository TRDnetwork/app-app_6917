import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'neutral' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-gray-100 text-gray-800',
  accent: 'bg-[#e66000] text-white',
  neutral: 'bg-gray-200 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
}) => {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
};

export default Badge;
---