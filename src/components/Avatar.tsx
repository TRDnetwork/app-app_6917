import React from 'react';

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-16 w-16 text-xl',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  fallback,
}) => {
  return (
    <div
      className={[
        'inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden flex-shrink-0',
        sizeClasses[size],
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={alt}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="text-gray-600 font-medium">
          {fallback || alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default Avatar;
---