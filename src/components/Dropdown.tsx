import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <button
        type="button"
        className={[
          'inline-flex justify-between items-center w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-left text-sm font-medium text-[#1a2e1a] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#e66000] focus:border-[#e66000] transition-colors duration-300 ease-out-quart',
          disabled ? 'opacity-60 cursor-not-allowed' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={[
            'h-5 w-5 text-gray-400 transition-transform duration-300 ease-out-quart',
            isOpen ? 'transform rotate-180' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-gray-100"
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant={value}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={[
                'text-[#1a2e1a] cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-[#e66000]/10',
                value === option.value
                  ? 'bg-[#e66000]/10 font-semibold'
                  : 'font-normal',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={value === option.value}
            >
              <span
                className={[
                  'block truncate',
                  value === option.value ? 'font-semibold' : 'font-normal',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {option.label}
              </span>
              {value === option.value && (
                <span className="text-[#e66000] absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
---