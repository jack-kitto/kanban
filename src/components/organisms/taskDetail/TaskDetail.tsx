import { useEffect, useMemo, useReducer } from "react";
import { createId } from '@paralleldrive/cuid2';
import { ActionTypes, reducer } from "./reducer";
import { z } from "zod";
import { Button, MenuButton, Select, TextField, TooltipMenu } from "~/components/atoms";
import type { TooltipMenuOption } from "~/components/atoms/tooltipMenu/TooltipMenu";
import { Subtask } from "~/components/molecules";

export type Subtask = {
  completed: boolean;
  title: string;
  id: string;
}

export type Task = {
  title: string;
  description: string;
  subtasks: Subtask[];
  id: string;
  currentColumn: string;
  columns: string[];
}

export interface TaskDetailProps {
  task: Task;
  menuOptions: TooltipMenuOption[];
  editing: boolean;
  newTask: boolean;
  setNewTask: (newTask: boolean) => void;
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

export default function TaskDetail(props: TaskDetailProps): JSX.Element {
  const [task, dispatch] = useReducer(reducer, props.task);
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
    console.log('task', task)
  }, [task]);

  useEffect((): void => {
    dispatch({ type: ActionTypes.SET_TASK, payload: props.task });
  }, [props.task]);

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
                validationErrors={[{ message: 'Required', schema: z.string().min(1), active: false }]}
                setText={(text: string): void => dispatch({ type: ActionTypes.SET_DESCRIPTION, payload: text })}
              />
            </div>
          )
          : (
            <>
              <div className="flex w-full justify-between items-center gap-6">
                <h2 className="prose-hl dark:text-white">
                  {props.task.title}
                </h2>
                <TooltipMenu options={props.menuOptions} angle="S">
                  <MenuButton type="hover" />
                </TooltipMenu>
              </div>
              <span className="prose-bl text-mediumGray py-6">
                {props.task.description}
              </span>
            </>
          )
      }
      <span className="prose-bm text-mediumGray dark:text-white py-4">
        Subtasks {props.newTask || `(${completedSubtasks} of ${totalSubtasks})`}
      </span>
      <div className="w-full flex flex-col gap-2">
        {task.subtasks.map((subtask: Subtask, index: number): JSX.Element => (
          <div key={`${subtask.id} ${index}`} className="w-full">
            <Subtask
              text={subtask.title}
              setText={(text: string): void => { dispatch({ type: ActionTypes.UPDATE_SUBTASK, payload: { ...subtask, title: text } }) }}
              onDelete={(): void => { if (subtask.id) dispatch({ type: ActionTypes.REMOVE_SUBTASK, payload: subtask.id }) }}
              editing={props.editing}
              checked={subtask.completed}
              setChecked={(): void => {
                console.log('subtask.id', subtask.id)
                if (subtask.id)
                  dispatch({ type: ActionTypes.TOGGLE_SUBTASK, payload: subtask.id })
              }} />
          </div>
        ))}

        {/* {props.newTask && task.subtasks.length < 1 && ( */}
        {/*   <div className="flex gap-2 justify-between w-full items-center "> */}
        {/*     <TextField */}
        {/*       placeholder="e.g. Make coffee" */}
        {/*       text={newSubtask} */}
        {/*       validationErrors={[{ message: 'Required', schema: z.string().min(1), active: false }]} */}
        {/*       setText={setNewSubtask} */}
        {/*     /> */}
        {/*     <Icon icon="Save" onClick={(): void => { */}
        {/*       // props.createSubtask(newSubtask) */}
        {/*       setSubtasks([...subtasks, { title: newSubtask, completed: false }]) */}
        {/*       setNewSubtask('') */}
        {/*     }} color={colors.mediumGray} size="small" /> */}
        {/*   </div> */}
        {/* )} */}
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
      {props.task.columns && props.task.currentColumn && (
        <Select
          options={task.columns}
          selected={task.currentColumn}
          setSelected={(column: string): void => dispatch({ type: ActionTypes.SET_COLUMN, payload: column })}
        />
      )}
      {
        props.editing && (
          <div className="pt-6">
            <Button
              text={!props.newTask ? `Save Changes` : "Create Task"}
              btn={{
                onClick: (): void => {
                  props.saveChanges(task)
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
