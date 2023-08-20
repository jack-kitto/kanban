import { observer } from "mobx-react-lite";
import { useStores } from "~/models";
import type { IColumnModel, ITaskModel } from "~/models/ProjectsStore";
import { colors } from "~/styles/colors";
import type { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { typography } from "~/styles/typography";
import { AddTask } from "../addTask";

export const Task = observer(({ task, setAddTaskFormOpen, column, provided }: { provided: DraggableProvided, snapshot: DraggableStateSnapshot, task: ITaskModel, setAddTaskFormOpen: (id: string) => void, column: IColumnModel }) => {
  const { theme } = useStores()
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full"
    >
      <div className="w-full">
        <div className="w-full h-[100px] flex flex-col justify-between">
          <div className={`w-full flex-1 group/task shadow-md cursor-pointer flex items-center justify-center flex-col rounded-lg bg-${theme.darkMode ? "darkGrey" : 'white'}`}>
            <div>
              <p className={`group-hover/task:text-mainPurple text-${theme.darkMode ? 'white' : 'black'}`} style={{ ...typography.heading.M }}>{task.name}</p>
              <p style={{ ...typography.body.M, color: colors.mediumGrey }}>{task.name}</p>
            </div>
          </div>
          <button onClick={() => setAddTaskFormOpen(column.id)} className="w-full outline-none py-[10px] group/addTask cursor-pointer">
            <AddTask onPress={() => setAddTaskFormOpen(column.id)} />
          </button>
        </div>
      </div>
    </div>
  )
})
