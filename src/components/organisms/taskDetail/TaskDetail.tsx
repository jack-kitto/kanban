import { useEffect, useMemo, useReducer, useState } from "react";
import { createId } from '@paralleldrive/cuid2';
import { ActionTypes, reducer } from "./reducer";
import { z } from "zod";
import { Button, MenuButton, Select, TextField, TooltipMenu } from "~/components/atoms";
import type { TooltipMenuOption } from "~/components/atoms/tooltipMenu/TooltipMenu";
import { EditableCheckboxInput } from "~/components/molecules";
import { Icon } from "~/components/atoms/icon";
import { colors } from "~/styles";
import type { Subtask, Task } from "~/components/types";

export interface TaskDetailProps {
  task?: Task;
  menuOptions: TooltipMenuOption[];
  editing: boolean;
  newTask: boolean;
  columns: string[];
  setNewTask?: (newTask: boolean) => void;
  setEditing: (editing: boolean) => void;
  saveChanges: (task: Task) => void;
}

function createSubtask(title?: string): Subtask {
  return {
    title: title ?? '',
    completed: false,
    id: createId()
  }
}

function createNewTask(): Task {
  return {
    title: '',
    description: '',
    subtasks: [],
    id: createId(),
    currentColumn: '',
  }
}

export default function TaskDetail(props: TaskDetailProps): JSX.Element {
  const [task, dispatch] = useReducer<typeof reducer>(reducer, props.task ?? createNewTask());
  const [newSubtask, setNewSubtask] = useState<string>('');
  const completedSubtasks = useMemo((): number => {
    if (!task.subtasks) {
      return 0;
    }
    return task.subtasks.filter((subtask: Subtask): boolean => subtask.completed).length;
  }, [task.subtasks]);
  const totalSubtasks = useMemo((): number => {
    if (!task.subtasks) {
      return 0;
    }
    return task.subtasks.length;
  }, [task.subtasks]);
  useEffect((): void => {
    if (props.task)
      dispatch({ type: ActionTypes.SET_TASK, payload: props.task });
  }, [props.task]);
  const canSave = useMemo((): boolean => {
    return task.title.length > 0;
  }, [task]);

  return (
    <div className="bg-white flex flex-col dark:bg-darkGray md:w-[480px] w-[280px] p-2 md:p-8 min-w-[280px] max-w-[480px] h-full">
      {
        props.newTask || props.editing
          ? (
            <div className="flex w-full flex-col gap-2">
              <h2 className="prose-hl dark:text-white">
                {props.newTask ? 'Add New Task' : 'Edit Task'}
              </h2>
              <TextField
                placeholder="e.g. Take coffee break"
                text={task.title}
                label="Title"
                validationErrors={[{ message: 'Required', schema: z.string().min(1), active: false }]}
                setText={(text: string): void => dispatch({ type: ActionTypes.SET_TITLE, payload: text })}
              />
              <TextField
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                text={task.description}
                label="Description"
                rows={5}
                validationErrors={[]}
                setText={(text: string): void => dispatch({ type: ActionTypes.SET_DESCRIPTION, payload: text })}
              />
            </div>
          )
          : (
            <>
              <div className="flex w-full justify-between items-center gap-6">
                <h2 className="prose-hl dark:text-white">
                  {task.title}
                </h2>
                <TooltipMenu options={props.menuOptions} angle="S">
                  <MenuButton type="hover" />
                </TooltipMenu>
              </div>
              <span className="prose-bl text-mediumGray py-6">
                {task.description}
              </span>
            </>
          )
      }
      {
        task.subtasks.length > 0 && (
          <span className="prose-bm text-mediumGray dark:text-white py-4">
            Subtasks {
              props.newTask
                ? ''
                : props.editing
                  ? ''
                  : `(${completedSubtasks} of ${totalSubtasks})`
            }
          </span>
        )
      }
      <div className="w-full flex flex-col gap-2">
        {task.subtasks.map((subtask: Subtask, index: number): JSX.Element => (
          <div key={`${subtask.id} ${index}`} className="w-full">
            <EditableCheckboxInput
              text={subtask.title}
              setText={(text: string): void => { dispatch({ type: ActionTypes.UPDATE_SUBTASK, payload: { ...subtask, title: text } }) }}
              onDelete={(): void => { if (subtask.id) dispatch({ type: ActionTypes.REMOVE_SUBTASK, payload: subtask.id }) }}
              editing={props.editing}
              checked={subtask.completed}
              setChecked={(): void => {
                const newTask = { ...task }
                newTask.subtasks = newTask.subtasks.map((st: Subtask): Subtask => {
                  if (st.id === subtask.id) {
                    st.completed = !st.completed
                  }
                  return st
                })
                dispatch({ type: ActionTypes.SET_TASK, payload: newTask })
                props.saveChanges(newTask)
              }} />
          </div>
        ))}
        {props.newTask && task.subtasks.length < 1 && (
          <div className="flex gap-2 justify-between w-full items-center ">
            <TextField
              placeholder="e.g. Make coffee"
              text={newSubtask}
              setText={setNewSubtask}
            />
            <Icon icon="Save" onClick={(): void => {
              dispatch({ type: ActionTypes.ADD_SUBTASK, payload: createSubtask(newSubtask) })
              setNewSubtask('')
            }} color={colors.mediumGray} size="small" />
          </div>
        )}
        {
          props.editing && (
            <div className="pt-6">
              <Button
                text="+ Add New Subtask"
                btn={{
                  onClick: (): void => dispatch({ type: ActionTypes.ADD_SUBTASK, payload: createSubtask() })
                }}
                type="secondary"
                size="sm"
              />
            </div>
          )
        }
      </div>
      <span className="prose-bl text-mediumGray dark:text-white py-2 pt-5">
        {props.newTask ? 'Status' : 'Current Status'}
      </span>
      {props.columns && (
        <Select
          options={props.columns}
          selected={task.currentColumn}
          setSelected={(column: string): void => dispatch({ type: ActionTypes.SET_COLUMN, payload: column })}
        />
      )}
      {
        props.editing && (
          <div className="pt-6">
            <Button
              text={!props.newTask ? `Save Changes` : "Create Task"}
              disabled={!canSave}
              btn={{
                onClick: (): void => {
                  props.saveChanges(task)
                  if (props.setNewTask)
                    props.setNewTask(false)
                  props.setEditing(false)
                }
              }}
              type="primary"
              size="sm"
            />
          </div>
        )
      }
    </div>
  );
}
