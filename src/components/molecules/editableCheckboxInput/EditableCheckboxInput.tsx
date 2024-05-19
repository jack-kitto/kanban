import { z } from "zod";
import { Checkbox, TextField } from "~/components/atoms";
import { Icon } from "~/components/atoms/icon";
import { colors } from "~/styles";

export interface EditableCheckboxInputProps {
  checked?: boolean;
  setChecked?: (checked: boolean) => void;
  text: string;
  editing: boolean;
  setText: (text: string) => void;
  onDelete: () => void;
  placeholder?: string;
}

export default function EditableCheckboxInput(props: EditableCheckboxInputProps): JSX.Element {
  const { checked, setChecked, text, setText } = props;
  const checkStyle = checked ? 'line-through' : 'none';

  if (props.editing) {
    return (
      <div className="flex gap-2 justify-between w-full items-center ">
        <TextField
          placeholder={props.placeholder ?? 'e.g. Make coffee'}
          text={text}
          validationErrors={[{ message: 'Required', schema: z.string().min(1), active: false }]}
          setText={setText}
        />
        <Icon
          onClick={props.onDelete}
          icon="Close"
          color={colors.mediumGray}
          size="small"
        />
      </div>
    )
  }

  if (!setChecked || !checked) throw new Error('setChecked and checked must be defined');
  return (
    <button
      onClick={(): void => setChecked && setChecked(!checked)}
      className="flex gap-4 items-start cursor-pointer transition-colors duration-300 ease-in-out justify-start bg-linesLight dark:bg-veryDarkGray p-3 hover:bg-mainPurpleHover dark:hover:bg-mainPurple rounded w-full min-w-[295px]"
    >
      <div className="flex justify-center">
        <Checkbox checked={checked} setChecked={setChecked} />
      </div>
      <div className="flex justify-center">
        <p className={`prose-bm cursor-pointer text-center dark:text-white ${checkStyle}`}>
          {text}
        </p>
      </div>
    </button>
  );
}
