import { useEffect, useMemo } from "react";

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
      return 'flex'
    }
    if (!props.open) {
      return 'hidden'
    }
  }, [props.open])

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleEscape(e, props.close));
    return () => {
      window.removeEventListener('keydown', (e) => handleEscape(e, props.close));
    };
  }, [props.open, props.close])
  if (!props.open) return null

  return (
    <div className={`${displayStyles} fixed z-50 top-0 left-0 right-0 bottom-0 w-full h-full`}>
      <button onMouseDown={props.close} className={`${displayStyles} absolute z-10 cursor-default bg-black bg-opacity-50 w-full h-full`} />
      <div className="z-20 align-middle w/full sm:2/3 md:w-1/3 m-auto p-4 rounded-lg">
        {props.children}
      </div>
    </div>
  );
}
