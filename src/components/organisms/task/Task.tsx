import { memo, useMemo, useState } from "react";
import { Modal } from "~/components/atoms";
import { Confirmation, TaskCard } from "~/components/molecules";
import type { ColumnType, Subtask, TaskType as TaskType } from "~/components/types";
import TaskDetail from "../taskDetail/TaskDetail";

export interface TaskProps {
  task: TaskType;
  columns: ColumnType[];
  updateTask: (task: TaskType) => void;
  onDeleteTask: (task: TaskType) => void;
  index: number;
  id?: string;
}

function TaskComponent(props: TaskProps): JSX.Element {
  const [showTaskDetail, setShowTaskDetail] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const completedSubtasks = useMemo((): number => {
    if (!props.task.subtasks) {
      return 0;
    }
    return props.task.subtasks.filter((subtask: Subtask): boolean => subtask.completed).length;
  }, [props.task.subtasks]);

  const totalSubtasks = useMemo((): number => {
    if (!props.task.subtasks) {
      return 0;
    }
    return props.task.subtasks.length;
  }, [props.task.subtasks]);

  const subtitle = useMemo((): string => {
    return `${completedSubtasks} of ${totalSubtasks} subtasks`;
  }, [completedSubtasks, totalSubtasks])

  return (
    <>
      <button
        onClick={(): void => setShowTaskDetail(true)}
      >
        <TaskCard
          title={props.task.title}
          id={props.id}
          index={props.index}
          subtitle={subtitle} />
      </button>
      <Modal
        open={showTaskDetail}
        close={(): void => setShowTaskDetail(false)}
      >
        <TaskDetail
          columns={props.columns}
          newTask={false}
          editing={editing}
          setEditing={setEditing}
          menuOptions={[
            {
              onClick: (): void => { setEditing(true); },
              text: 'Edit Task'
            },
            {
              destructive: true,
              onClick: (): void => {
                setShowTaskDetail(false);
                setConfirmationOpen(true);
              },
              text: 'Delete Task'
            }
          ]}
          saveChanges={props.updateTask}
          task={props.task} />
      </Modal>

      <Modal
        open={confirmationOpen}
        close={(): void => setConfirmationOpen(false)}
      >
        <Confirmation
          title="Delete this task?"
          message={`Are you sure you want to delete the '${props.task.title}' task and its subtasks? This action cannot be reversed.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={(): void => {
            setShowTaskDetail(false);
            setConfirmationOpen(false);
            props.onDeleteTask(props.task);
          }}
          onCancel={(): void => {
            setShowTaskDetail(true);
            setConfirmationOpen(false);
          }} />
      </Modal>
    </>
  );
}
export const Task = memo(TaskComponent)
