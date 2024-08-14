import { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

export interface ModalProps {
  open: boolean;
  close: () => void;
  children: JSX.Element;
}

function handleEscape(e: KeyboardEvent, onClose: () => void): void {
  if (e.key === 'Escape') {
    onClose();
  }
}

export function Modal(props: ModalProps): JSX.Element | null {
  const displayStyles = useMemo(() => {
    if (props.open) {
      return 'flex';
    }
    return 'hidden';
  }, [props.open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleEscape(e, props.close);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.close]);

  if (!props.open) return null;

  const modalContent = (
    <div className={`${displayStyles} fixed z-50 top-0 left-0 right-0 bottom-0 w-full h-full`}>
      <button
        onMouseDown={props.close}
        className="absolute z-10 cursor-default bg-black bg-opacity-75 w-full h-full"
      />
      <div className="z-20 align-middle w/full sm:w-2/3 md:w-1/3 m-auto p-4 rounded-lg">
        {props.children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
