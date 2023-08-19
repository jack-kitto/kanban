import { observer } from "mobx-react-lite";
import { toast } from "react-hot-toast";
import { useStores } from "~/models";
import type { IColumnModel, ITaskModel } from "~/models/ProjectsStore";
import { colors } from "~/styles/colors";
import { typography } from "~/styles/typography";
import { AddTask } from "../addTask";

export const Task = observer(({ task, setAddTaskFormOpen, column }: { task: ITaskModel, setAddTaskFormOpen: (id: string) => void, column: IColumnModel }) => {
  const { theme } = useStores()
  const openTask = () => {
    toast("Open task")
  }
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <button onClick={openTask} className={`w-full flex-1 group/task shadow-md cursor-pointer flex items-center justify-center flex-col rounded-lg bg-${theme.darkMode ? "darkGrey" : 'white'}`}>
        <div>
          <p className={`group-hover/task:text-mainPurple text-${theme.darkMode ? 'white' : 'black'}`} style={{ ...typography.heading.M }}>{task.name}</p>
          <p style={{ ...typography.body.M, color: colors.mediumGrey }}>{task.name}</p>
        </div>
      </button>
      <div className="w-full py-[10px] group/addTask cursor-pointer">
        <AddTask onPress={() => setAddTaskFormOpen(column.id)} />
      </div>
    </div>
  )
})
