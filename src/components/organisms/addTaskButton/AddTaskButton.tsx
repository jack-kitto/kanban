import { useState } from "react";
import { Button, Modal } from "~/components/atoms";
import type { Task } from "~/components/types";
import TaskDetail from "../taskDetail/TaskDetail";

export interface AddTaskButtonProps {
  task: Task;
  columns: string[];
  updateTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export default function AddTaskButton(props: AddTaskButtonProps): JSX.Element {
  const [showTaskDetail, setShowTaskDetail] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(true)
  const [newTask, setNewTask] = useState<boolean>(true)

  return (
    <>
      <Button
        btn={{ onClick: (): void => setShowTaskDetail(true) }}
        text="+ Add New Task"
        type="primary"
      />
      <Modal
        open={showTaskDetail}
        close={(): void => {
          setShowTaskDetail(false)
          setEditing(true)
          setNewTask(true)
        }}
      >
        <TaskDetail
          columns={props.columns}
          newTask={newTask}
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
          saveChanges={(task: Task): void => {
            props.updateTask(task)
            setNewTask(false)
          }}
        />
      </Modal>

    </>
  );
}
