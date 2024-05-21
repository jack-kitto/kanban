import { useState } from "react";
import { Button, Modal } from "~/components/atoms";
import type { ColumnType, TaskType } from "~/components/types";
import TaskDetail from "../taskDetail/TaskDetail";

export interface AddTaskButtonProps {
  task: TaskType;
  columns: ColumnType[];
  updateTask: (task: TaskType) => void;
  onDeleteTask: (task: TaskType) => void;
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
          saveChanges={(task: TaskType): void => {
            props.updateTask(task)
            setNewTask(false)

            //
            // TODO: make sure to caculate the new position based on the column chosen and the last task in that column
            //

          }}
        />
      </Modal>

    </>
  );
}
