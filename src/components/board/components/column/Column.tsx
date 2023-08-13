import type { IColumnModel } from "~/models/ProjectsStore"
import { colors } from "~/styles/colors"
import { typography } from "~/styles/typography"
import { AddTask } from "./AddTask"

export const Column = ({ column }: { column: IColumnModel }) => {
  const addNewTask = () => {
    console.log('add new task')
  }

  return (
    <div className="flex-1 items-center flex flex-col justify-start w-full h-full">
      <div className="w-25 flex flex-row items-center justify-center mt-12">
        <div style={{ backgroundColor: colors.pallette['grey'].value }} className="w-4 h-4 rounded-full mr-2" />
        <div>
          <p style={{ ...typography.heading.S, color: colors.mediumGrey }}>{column.name}</p>
        </div>
      </div>
      {column.tasks.length < 1 && (
        <button onClick={addNewTask} className="w-full p-4 h-full group cursor-pointer flex flex-col justify-start items-center">
          <div className="hidden group-hover:block w-full">
            <AddTask />
          </div>
        </button>
      )}
    </div>
  )
}
