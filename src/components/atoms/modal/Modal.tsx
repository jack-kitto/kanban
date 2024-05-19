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

export function Modal(props: ModalProps): JSX.Element {
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

  return (
    <div className={`${displayStyles} absolute w-full h-full`}>
      <button onClick={props.close} className={`${displayStyles} absolute z-0 cursor-default bg-black bg-opacity-50 w-full h-full`} />
      <div className="z-10 align-middle w-1/3 m-auto p-4 rounded-lg">
        {props.children}
      </div>
    </div>
  );
}
