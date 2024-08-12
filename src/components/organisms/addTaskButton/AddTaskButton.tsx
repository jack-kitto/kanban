import { useState } from "react";
import { Button, Modal } from "~/components/atoms";
import type { ColumnType, TaskType } from "~/components/types";
import TaskDetail from "../taskDetail/TaskDetail";
import { generateKeyBetween } from "fractional-indexing";

export interface AddTaskButtonProps {
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
      <div className="sm:hidden">
        <Button
          btn={{ onMouseDown: (): void => setShowTaskDetail(true) }}
          type="primary"
          icon="AddIcon"
        />
      </div>
      <div className="max-sm:hidden">
        <Button
          btn={{ onMouseDown: (): void => setShowTaskDetail(true) }}
          text="+ Add New Task"
          type="primary"
        />
      </div>
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
          menuOptions={[]}
          saveChanges={(task: TaskType): void => {
            task.position = generateKeyBetween(props.columns.at(-1)?.position, null)
            props.updateTask(task)
            setShowTaskDetail(false)
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
