import { useMemo, useState } from "react";
import { Button, Modal } from "~/components/atoms";
import { TaskCard } from "~/components/molecules";
import type { Subtask, Task } from "~/components/types";
import TaskDetail from "../taskDetail/TaskDetail";

export interface TaskProps {
  task: Task;
  columns: string[];
  updateTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export default function Task(props: TaskProps): JSX.Element {
  const [showTaskDetail, setShowTaskDetail] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(false)
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
    return `${completedSubtasks} of ${totalSubtasks} subtasks completed`
  }, [completedSubtasks, totalSubtasks]);

  return (
    <>
      <Button
        btn={{ onClick: (): void => setShowTaskDetail(true) }}
      >
        <TaskCard
          title={props.task.title}
          subtitle={subtitle}
        />
      </Button>
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
              onClick: (): void => { setEditing(true) },
              text: 'Edit Task'
            },
            {
              destructive: true,
              onClick: (): void => { (): void => props.onDeleteTask(props.task) },
              text: 'Delete Task'
            }
          ]}
          saveChanges={props.updateTask}
          task={props.task}
        />
      </Modal>

    </>
  );
}
