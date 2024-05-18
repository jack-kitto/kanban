import { useMemo } from "react";
import { MenuButton, Select, TooltipMenu } from "~/components/atoms";
import { TooltipMenuOption } from "~/components/atoms/tooltipMenu/TooltipMenu";
import { Subtask } from "~/components/molecules";

export type Subtask = {
  completed: boolean;
  title: string;
  id: string;
}

export interface TaskDetailProps {
  title: string;
  description: string;
  subtasks: Subtask[];
  onSubtaskToggle: (id: string) => void;
  id: string;
  columns: string[];
  currentColumn: string;
  setCurrentColumn: (column: string) => void;
  menuOptions: TooltipMenuOption[];
}


export default function TaskDetail(props: TaskDetailProps): JSX.Element {

  const completedSubtasks = useMemo(() => {
    return props.subtasks.filter((subtask) => subtask.completed).length;
  }, [props.subtasks]);

  const totalSubtasks = useMemo(() => {
    return props.subtasks.length;
  }, [props.subtasks]);

  return (
    <div className="bg-white flex flex-col dark:bg-darkGray p-8 max-w-[480px] w-full h-full">
      <div className="flex w-full justify-between items-center gap-6">
        <h2 className="prose-hl dark:text-white">
          {props.title}
        </h2>
        <TooltipMenu options={props.menuOptions} angle="S">
          <MenuButton type="hover" />
        </TooltipMenu>
      </div>
      <span className="prose-bl text-mediumGray py-6">
        {props.description}
      </span>
      <span className="prose-bm text-mediumGray dark:text-white pb-[18px]">
        Subtasks ({completedSubtasks} of {totalSubtasks})
      </span>
      <div className="w-full flex flex-col gap-2">
        {props.subtasks.map((subtask) => (
          <div className="w-full">
            <Subtask key={subtask.id} text={subtask.title} checked={subtask.completed} setChecked={() => { props.onSubtaskToggle(subtask.id) }} />
          </div>
        ))}
      </div>
      <span className="prose-bl text-mediumGray dark:text-white py-2 pt-5">
        Current Status
      </span>
      <Select options={props.columns} selected={props.currentColumn} setSelected={props.setCurrentColumn} />
    </div>
  );
}
