import { createId } from '@paralleldrive/cuid2';
import { generateKeyBetween } from 'fractional-indexing';
import { useEffect, useMemo, useReducer, useState } from "react";
import { z } from "zod";
import { Button, MenuButton, TextField, TooltipMenu } from "~/components/atoms";
import { Icon } from "~/components/atoms/icon";
import type { TooltipMenuOption } from "~/components/atoms/tooltipMenu/TooltipMenu";
import { EditableCheckboxInput } from "~/components/molecules";
import { colors } from "~/styles";
import { ActionTypes, reducer } from "./reducer";
import type { ColumnType, Project } from '~/components/types';

export interface BoardDetailProps {
  project?: Project;
  menuOptions?: TooltipMenuOption[];
  editing: boolean;
  newBoard: boolean;
  setNewBoard?: (newProject: boolean) => void;
  setEditing?: (editing: boolean) => void;
  saveChanges: (project: Project, removedColumns?: string[]) => void;
  loading?: boolean
}

function createColumn(title: string, prevPosition: string | null): ColumnType {
  return {
    title: title ?? '',
    id: createId(),
    colour: 'Aqua Blue',
    position: generateKeyBetween(prevPosition, null),
    tasks: []
  }
}

function createNewProject(): Project {
  return {
    title: '',
    description: '',
    columns: [],
    id: createId(),
  }
}

export default function BoardDetail(props: BoardDetailProps): JSX.Element {
  const [project, dispatch] = useReducer<typeof reducer>(reducer, props.project ?? createNewProject());
  const [newColumn, setNewColumn] = useState<string>('');
  const [removedColumns, setRemovedColumns] = useState<string[]>([])


  useEffect((): void => {
    if (props.project)
      dispatch({ type: ActionTypes.SET_PROJECT, payload: props.project });
  }, [props.project]);

  const finalColPosition: string | null = useMemo((): string | null => {
    if (project.columns.length < 1) return null
    const finalCol = project.columns[project.columns.length - 1]
    if (!finalCol) return null
    return finalCol.position
  }, [project.columns])

  return (
    <div className="bg-white flex flex-col dark:bg-darkGray md:w-[480px] w-[280px] p-2 md:p-8 min-w-[280px] max-w-[480px] h-full">
      {
        props.newBoard || props.editing
          ? (
            <div className="flex w-full flex-col gap-2">
              <h2 className="prose-hl dark:text-white">
                {props.newBoard ? 'Add New Board' : 'Edit Board'}
              </h2>
              <TextField
                placeholder="e.g. Web Design"
                text={project.title}
                label="Board Name"
                validationErrors={[{ message: 'Required', schema: z.string().min(1), active: false }]}
                setText={(text: string): void => dispatch({ type: ActionTypes.SET_TITLE, payload: text })}
              />
            </div>
          )
          : (
            <>
              <div className="flex w-full justify-between items-center gap-6">
                <h2 className="prose-hl dark:text-white">
                  {project.title}
                </h2>
                <TooltipMenu options={props.menuOptions ?? []} angle="S">
                  <MenuButton type="hover" />
                </TooltipMenu>
              </div>
              <span className="prose-bl text-mediumGray py-6">
                {project.description}
              </span>
            </>
          )
      }
      <span className="prose-bm text-mediumGray dark:text-white py-4">
        Board Columns
      </span>
      <div className="w-full flex flex-col gap-2">
        {project.columns.map((column: ColumnType, index: number): JSX.Element => (
          <div key={`${column.id} ${index}`} className="w-full">
            <EditableCheckboxInput
              text={column.title}
              setText={(text: string): void => { dispatch({ type: ActionTypes.UPDATE_COLUMN, payload: { ...column, title: text } }) }}
              onDelete={(): void => { if (column.id) dispatch({ type: ActionTypes.REMOVE_COLUMN, payload: column.id }); setRemovedColumns((prev) => [...prev, column.id]) }}
              editing={true}
            />
          </div>
        ))}

        {props.newBoard && project.columns.length < 1 && (
          <div className="flex gap-2 justify-between w-full items-center ">
            <TextField
              placeholder="Todo"
              text={newColumn}
              setText={setNewColumn}
            />
            <Icon icon="Save" onClick={(): void => {
              dispatch({ type: ActionTypes.ADD_COLUMN, payload: createColumn(newColumn, `${project.columns[project.columns.length - 1]?.position}`) })
              setNewColumn('')
            }} color={colors.mediumGray} size="small" />
          </div>
        )}
        {
          props.editing && (
            <div className="pt-6">
              <Button
                text="+ Add New Column"
                btn={{
                  onMouseDown: (): void => dispatch({ type: ActionTypes.ADD_COLUMN, payload: createColumn('', finalColPosition) })
                }}
                type="secondary"
                size="sm"
              />
            </div>
          )
        }
      </div>
      {
        props.editing && (
          <div className="pt-6">
            <Button
              text={!props.newBoard ? `Save Changes` : "Create New Board"}
              loading={props.loading}
              btn={{
                onMouseDown: (): void => {
                  props.saveChanges(project, removedColumns)
                  props.setNewBoard!(false)
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
