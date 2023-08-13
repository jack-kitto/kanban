import { observer } from "mobx-react-lite";
import type { IColumnModel, IProjectModel } from "~/models/ProjectsStore";
import Column from "./Column";
import AddColumn from "./AddColumn";

export default observer(function Board({ project }: { project: IProjectModel }) {
  return (
    <div className="w-full h-full">
      <div className="flex flex-row items-start justify-center w-full h-full">
        {project.columns.map((column: IColumnModel, index: number) => (
          <Column key={`${column.id} ${index}`} column={column} />
        ))}
        <AddColumn />
      </div>
    </div>
  )
})
