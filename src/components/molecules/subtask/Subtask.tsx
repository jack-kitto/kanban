import { Checkbox } from "~/components/atoms";

export interface SubtaskProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  text: string;
}

export default function Subtask(props: SubtaskProps): JSX.Element {
  const { checked, setChecked, text } = props;
  const checkStyle = checked ? 'line-through' : 'none';
  return (
    <button onClick={() => setChecked(!checked)} className="flex gap-4 items-start cursor-pointer transition-colors duration-300 ease-in-out justify-start bg-linesLight dark:bg-veryDarkGray p-3 hover:bg-mainPurpleHover dark:hover:bg-mainPurple rounded w-full min-w-[295px]">
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
