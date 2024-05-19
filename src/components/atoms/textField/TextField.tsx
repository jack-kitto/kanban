import React, { useEffect, useState } from "react";
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
  rows?: number;
}

function updateText(text: string, setText: (text: string) => void): void {
  setText(text);
}

export default function TextField(props: TextFieldProps): JSX.Element {
  const [text, setText] = useState(props.text);

  useEffect((): void => {
    updateText(text, props.setText)
  }, [text]);

  const error: ValidationError = useMemo((): ValidationError => {
    if (!props.validationErrors) return { message: '', schema: z.string().min(1), active: false };
    for (const validationError of props.validationErrors) {
      if (!validationError.schema.safeParse(text).success) {
        return { ...validationError, active: true };
      }
    }
    return { message: '', schema: z.string().min(1), active: false };
  }, [text, props.validationErrors])

  const borderStyles = useMemo((): string => {
    return !error.active ? 'border-linesLight' : 'border-red';
  }, [error.active]);

  const displayError = useMemo((): string => {
    return !error.active ? 'opacity-0' : 'opacity-100'
  }, [error.active]);

  const handleInputTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  }, [setText]);

  const handleTextAreaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  }, [setText]);


  return (
    <div className="w-full">
      {
        props.label && (
          <span className="prose-bl text-mediumGray dark:text-white">
            {props.label}
          </span>
        )
      }
      <div className="relative">
        <p className={`${displayError} absolute prose-bl right-0 h-full flex justify-center ${props.rows ? 'items-end pb-2' : 'items-center'} pr-[15px] text-red transition-opacity duration-300 ease-in-out`}>
          {error.message}
        </p>
        {
          !props.rows && (
            <input
              placeholder={props.placeholder}
              className={`bg-white dark:bg-darkGray dark:border-linesDark appearance-none border outline-none dark:text-white min-h-10 min-w-40 max-w-md ${borderStyles}  rounded h-10 w-full px-3 prose-bl transition-colors duration-300 ease-in-out`}
              type="text"
              maxLength={props.maxLength}
              minLength={props.minLength}
              value={text}
              onChange={handleInputTextChange}
            />
          )
        }
        {
          props.rows && (
            <textarea
              placeholder={props.placeholder}
              className={`bg-white dark:bg-darkGray pt-2 dark:border-linesDark resize-none appearance-none border outline-none dark:text-white min-h-10 min-w-40 max-w-md ${borderStyles}  rounded min-h-10 w-full px-3 prose-bl transition-colors duration-300 ease-in-out`}
              maxLength={props.maxLength}
              rows={props.rows}
              minLength={props.minLength}
              value={text}
              onChange={handleTextAreaChange}
            />
          )
        }
      </div>
    </div>
  );
}
