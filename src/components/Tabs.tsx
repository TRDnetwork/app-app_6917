import React, { useState } from 'react';

export interface TabProps {
  label: string;
  children: React.ReactNode;
}

export interface TabsProps {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  defaultIndex?: number;
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={[
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ease-out-quart whitespace-nowrap',
                activeIndex === index
                  ? 'border-[#e66000] text-[#e66000]'
                  : 'border-transparent text-[#5a5a5a] hover:text-[#1a2e1a] hover:border-[#e66000]/50',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActiveIndex(index)}
              role="tab"
              aria-selected={activeIndex === index}
              tabIndex={activeIndex === index ? 0 : -1}
            >
              {tab.props.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {tabs[activeIndex]}
      </div>
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export default Tabs;
---