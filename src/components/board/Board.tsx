import { observer } from "mobx-react-lite";
import type { IColumnModel, IProjectModel } from "~/models/ProjectsStore";
import { AddColumn, Column } from "./components";
import { EmptyState } from "./components/emptyState";

export const Board = observer(({ project }: { project: IProjectModel }) => {
  const addNewColumn = () => {
    console.log('add new column')
  }
  return (
    <div className="w-full h-full">
      <div className="flex flex-row items-start justify-center w-full h-full">
        {project.columns.length < 1 && <EmptyState onAddNewColumn={addNewColumn} />}
        {project.columns.length > 0 && project.columns.map((column: IColumnModel, index: number) => (
          <Column key={`${column.id} ${index}`} column={column} />
        ))}
        <AddColumn />
      </div>
    </div>
  )
})
