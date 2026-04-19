import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  as: Component = 'div',
}) => {
  return (
    <Component
      className={[
        'bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 ease-out-quart overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Component>
  );
};

export default Card;
---