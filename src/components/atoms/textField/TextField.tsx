import { useCallback, useMemo } from "react";
import { z } from "zod";

type ValidationError = {
  message: string;
  schema: z.ZodString;
  active: boolean;
}

export interface TextFieldProps {
  text: string;
  setText: (text: string) => void;
  schema?: z.ZodString;
  minLength?: number;
  maxLength?: number;
  errorText?: string;
  validationErrors?: ValidationError[];
}


export default function TextField(props: TextFieldProps): JSX.Element {
  const { text, setText, schema } = props;
  const valid = useMemo((): boolean => {
    return schema ? schema.safeParse(text).success : true;
  }, [text])

  const error: ValidationError = useMemo((): ValidationError => {
    if (!props.validationErrors) return { message: '', schema: z.string().min(1), active: false };
    for (const validationError of props.validationErrors) {
      if (!validationError.schema.safeParse(text).success) {
        return { ...validationError, active: true };
      }
    }
    return { message: '', schema: z.string().min(1), active: false };
  }, [text]);

  const borderStyles = useMemo((): string => {
    return !error.active ? 'border-linesLight' : 'border-red';
  }, [valid]);

  const displayError = useMemo((): string => {
    return !error.active ? 'opacity-0' : 'opacity-100'
  }, [valid]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  }, [setText]);


  return (
    <div className="relative w-fit h-fit">
      <p className={`${displayError} absolute right-0 h-full flex justify-center items-center pr-[15px] text-red transition-opacity duration-300 ease-in-out`}>
        {error.message}
      </p>
      <input
        className={`bg-white appearance-none border outline-none min-h-10 max-h-10 min-w-64 max-w-md ${borderStyles}  rounded h-10 w-full px-3 prose-hm transition-colors duration-300 ease-in-out`}
        type="text"
        maxLength={props.maxLength}
        minLength={props.minLength}
        value={text}
        onChange={handleTextChange}
      />
    </div>
  );
}
