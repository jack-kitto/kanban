import React from 'react';
import { createPortal } from 'react-dom';

export type TooltipMenuOption = {
  text: string;
  onClick: () => void;
  destructive?: boolean;
};

export interface TooltipMenuProps {
  options: TooltipMenuOption[];
  children: JSX.Element;
}

export default function TooltipMenu(props: TooltipMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] = React.useState<{ top: number, left: number } | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuHeight = menuRef.current?.offsetHeight || 0;
      const menuWidth = menuRef.current?.offsetWidth || 0;

      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      const spaceRight = window.innerWidth - triggerRect.left;
      const spaceLeft = triggerRect.right;

      let top = triggerRect.bottom;
      let left = triggerRect.left;

      // Prefer below the trigger element
      if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
        top = triggerRect.top - menuHeight;
      }

      // Adjust horizontally if needed
      if (spaceRight < menuWidth && spaceLeft > menuWidth) {
        left = triggerRect.right - menuWidth;
      }

      setTooltipPosition({ top, left });
    }
  }, [isOpen]);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = (event: React.MouseEvent) => {
    // Check if mouse leaves both trigger and menu areas
    if (
      !menuRef.current?.contains(event.relatedTarget as Node) &&
      !triggerRef.current?.contains(event.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative px-4 py-2" ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="w-fit h-fit cursor-pointer">
        {props.children}
      </div>
      {isOpen && tooltipPosition && createPortal(
        <div
          ref={menuRef}
          className="fixed bg-white dark:bg-veryDarkGray flex flex-col shadow-md rounded-md px-[17px] py-5 min-w-[192px] items-start z-50"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {props.options.map((option: TooltipMenuOption, index: number): JSX.Element => (
            <button
              key={index}
              onMouseDown={(e) => {
                e.preventDefault();
                option.onClick();
                setIsOpen(false);
              }}
              className={`bg-white dark:bg-veryDarkGray p-2 select-none prose-bl w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${option.destructive ? 'text-red' : 'text-gray-700 dark:text-mediumGray'}`}
            >
              {option.text}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
