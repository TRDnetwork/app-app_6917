import React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const sizeClasses = {
  sm: 'text-sm p-3',
  md: 'text-base p-4',
  lg: 'text-lg p-6',
};

export const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  error,
  helperText,
  size = 'md',
  fullWidth = true,
  className = '',
  ...props
}) => {
  const textareaId = id || React.useId();

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-[#1a2e1a] mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={[
          'block w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#e66000] focus:ring-1 focus:ring-[#e66000] focus:outline-none transition-colors duration-300 ease-out-quart bg-white resize-none',
          sizeClasses[size],
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-[#5a5a5a]">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;
---