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
  placeholder?: string;
  label?: string;
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
    <div>
      {
        props.label && (
          <span className="prose-bl text-mediumGray dark:text-white">
            {props.label}
          </span>
        )
      }
      <div className="relative w-fit h-fit">
        <p className={`${displayError} absolute prose-bl right-0 h-full flex justify-center items-center pr-[15px] text-red transition-opacity duration-300 ease-in-out`}>
          {error.message}
        </p>
        <input
          placeholder={props.placeholder}
          className={`bg-white dark:bg-darkGray dark:border-linesDark appearance-none border outline-none dark:text-white min-h-10 max-h-10 min-w-64 max-w-md ${borderStyles}  rounded h-10 w-full px-3 prose-bl transition-colors duration-300 ease-in-out`}
          type="text"
          maxLength={props.maxLength}
          minLength={props.minLength}
          value={text}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
}
