import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Button, MenuButton, Select, TextField, TooltipMenu } from "~/components/atoms";
import { Icon } from "~/components/atoms/icon";
import type { TooltipMenuOption } from "~/components/atoms/tooltipMenu/TooltipMenu";
import { Subtask } from "~/components/molecules";
import { colors } from "~/styles";

export type Subtask = {
  completed: boolean;
  title: string;
  id?: string;
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
  title?: string;
  description?: string;
  subtasks?: Subtask[];
  id?: string;
  columns?: string[];
  currentColumn?: string;

  onSubtaskToggle?: (id: string) => void;
  setCurrentColumn?: (column: string) => void;
  menuOptions: TooltipMenuOption[];
  editing: boolean;
  newTask: boolean;
  setNewTask: (newTask: boolean) => void;
  setEditing: (editing: boolean) => void;
  saveChanges: (title: string, description: string, subtasks: Subtask[], column: string) => void;
  createSubtask: (title?: string) => void;
}

function updateSubtaskText(subtasks: Subtask[], id: string, text: string): Subtask[] {
  return subtasks.map((subtask: Subtask): Subtask => {
    if (subtask.id === id) {
      return {
        ...subtask,
        title: text
      }
    }
    return subtask;
  });
}

function removeSubtask(subtasks: Subtask[], id: string): Subtask[] {
  return subtasks.filter((subtask: Subtask): boolean => subtask.id !== id);
}


function handleSaveChanges(title: string, description: string, subtasks: Subtask[], column: string, saveChanges: (title: string, description: string, subtasks: Subtask[], column: string) => void, setNewTask: (newTask: boolean) => void, setEditing: (editing: boolean) => void): void {
  if (saveChanges) {
    saveChanges(title, description, subtasks, column);
  }
  setNewTask(false);
  setEditing(false);
}


export default function TaskDetail(props: TaskDetailProps): JSX.Element {
  const [title, setTitle] = useState<string>(props.title ?? '');
  const [description, setDescription] = useState<string>(props.description ?? '');
  const [subtasks, setSubtasks] = useState<Subtask[]>(props.subtasks ?? []);
  const [newSubtask, setNewSubtask] = useState<string>('');
  const completedSubtasks = useMemo((): number => {
    if (!props.subtasks) {
      return 0;
    }
    return props.subtasks.filter((subtask: Subtask): boolean => subtask.completed).length;
  }, [props.subtasks]);

  const totalSubtasks = useMemo((): number => {
    if (!props.subtasks) {
      return 0;
    }
    return props.subtasks.length;
  }, [props.subtasks]);

  useEffect(() => {
    setSubtasks(props.subtasks ?? []);
  }, [props.subtasks]);

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
                text={title}
                label="Title"
                validationErrors={[{ message: 'Required', schema: z.string().min(1), active: false }]}
                setText={setTitle}
              />
              <TextField
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                text={description}
                label="Description"
                rows={5}
                validationErrors={[{ message: 'Required', schema: z.string().min(1), active: false }]}
                setText={setDescription}
              />
            </div>
          )
          : (
            <>
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
            </>
          )
      }
      <span className="prose-bm text-mediumGray dark:text-white py-4">
        Subtasks {props.newTask || `(${completedSubtasks} of ${totalSubtasks})`}
      </span>
      <div className="w-full flex flex-col gap-2">
        {subtasks.map((subtask: Subtask, index: number): JSX.Element => (
          <div key={`${subtask.id} ${index}`} className="w-full">
            {props.editing
              ? (
                <div className="flex gap-2 justify-between w-full items-center ">
                  <TextField
                    placeholder="e.g. Take coffee break"
                    text={subtask.title}
                    validationErrors={[{ message: 'Required', schema: z.string().min(1), active: false }]}
                    setText={(text: string): void => {
                      if (subtask.id) setSubtasks(updateSubtaskText(subtasks, subtask.id, text))
                    }}
                  />
                  <Icon onClick={(): void => {
                    if (subtask.id) setSubtasks(removeSubtask(subtasks, subtask.id))
                  }} icon="Close" color={colors.mediumGray} size="small" />
                </div>
              )
              : <Subtask key={subtask.id} text={subtask.title} checked={subtask.completed} setChecked={(): void => {
                console.log('subtask.id', subtask.id)
                if (props.onSubtaskToggle && subtask.id) props.onSubtaskToggle(subtask.id)
                else console.log('no id')
              }} />
            }
          </div>
        ))}

        {props.newTask && subtasks.length < 1 && (
          <div className="flex gap-2 justify-between w-full items-center ">
            <TextField
              placeholder="e.g. Make coffee"
              text={newSubtask}
              validationErrors={[{ message: 'Required', schema: z.string().min(1), active: false }]}
              setText={setNewSubtask}
            />
            <Icon icon="Save" onClick={(): void => {
              // props.createSubtask(newSubtask)
              setSubtasks([...subtasks, { title: newSubtask, completed: false }])
              setNewSubtask('')
            }} color={colors.mediumGray} size="small" />
          </div>
        )}
        {
          props.editing && (
            <div className="pt-6">
              <Button text="+ Add New Subtask" btn={{ onClick: (): void => props.createSubtask('') }} type="secondary" size="sm" />
            </div>
          )
        }
      </div>
      <span className="prose-bl text-mediumGray dark:text-white py-2 pt-5">
        {props.newTask ? 'Status' : 'Current Status'}
      </span>
      {props.columns && props.setCurrentColumn && props.currentColumn && (
        <Select
          options={props.columns}
          selected={props.currentColumn}
          setSelected={props.setCurrentColumn}
        />
      )}
      {
        props.editing && (
          <div className="pt-6">
            <Button
              text={!props.newTask ? `Save Changes` : "Create Task"}
              btn={{ onClick: (): void => handleSaveChanges(title, description, subtasks, props.currentColumn ?? '', props.saveChanges, props.setNewTask, props.setEditing) }}
              type="primary"
              size="sm"
            />
          </div>
        )
      }
    </div>
  );
}
