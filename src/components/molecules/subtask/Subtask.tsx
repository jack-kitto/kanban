import { Checkbox, Text } from "~/components/atoms";

export interface SubtaskProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  text: string;
}

export default function Subtask(props: SubtaskProps): JSX.Element {
  const { checked, setChecked, text } = props;
  const checkStyle = checked ? 'line-through' : 'none';
  return (
    <div className="flex gap-4 items-start transition-colors duration-300 ease-in-out justify-start bg-linesLight p-3 hover:bg-mainPurpleHover tran rounded max-w-[416px] min-w-[295px]">
      <div className="flex justify-center">
        <Checkbox checked={checked} setChecked={setChecked} />
      </div>
      <div className="flex justify-center">
        <p className={`prose-bm text-center ${checkStyle}`}>
          {text}
        </p>
      </div>
    </div>
  );
}
