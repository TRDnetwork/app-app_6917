import React, { useState } from 'react';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
}) => {
  const [visible, setVisible] = useState(false);

  const placements = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };

  return (
    <div
      className="inline-block relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={[
            'absolute z-10 whitespace-nowrap bg-[#1a2e1a] text-white text-xs rounded py-1 px-2 shadow-lg',
            placements[placement],
          ]
            .filter(Boolean)
            .join(' ')}
          role="tooltip"
        >
          {content}
          <div
            className={[
              'absolute w-2 h-2 bg-[#1a2e1a] rotate-45',
              placement === 'top' && 'top-full left-1/2 transform -translate-x-1/2',
              placement === 'right' && 'left-full top-1/2 transform -translate-y-1/2',
              placement === 'bottom' && 'top-0 left-1/2 transform -translate-x-1/2',
              placement === 'left' && 'right-full top-1/2 transform -translate-y-1/2',
            ]
              .filter(Boolean)
              .join(' ')}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
---