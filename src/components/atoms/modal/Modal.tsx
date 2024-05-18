import { useCallback, useEffect, useMemo } from "react";

export interface ModalProps {
  open: boolean;
  close: () => void;
  children: JSX.Element;
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

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.close();
    }
  }, [props.close]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [props.open])

  return (
    <div className={`${displayStyles} absolute w-full h-full`}>
      <button onClick={props.close} className={`${displayStyles} absolute z-0 cursor-default bg-black bg-opacity-50 w-full h-full`} />
      <div className="z-10 align-middle w-1/3 m-auto p-4 rounded-lg">
        {props.children}
      </div>
    </div>
  );
}
