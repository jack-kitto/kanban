import { observer } from "mobx-react-lite";
import { toast } from "react-hot-toast";
import { useStores } from "~/models";
import type { ITaskModel } from "~/models/ProjectsStore";
import { colors } from "~/styles/colors";
import { typography } from "~/styles/typography";

export const Task = observer(({ task }: { task: ITaskModel }) => {
  const { theme } = useStores()
  const openTask = () => {
    toast("Open task")
  }
  return (
    <div className="w-full h-full px-8">
      <button onClick={openTask} className={`w-full h-full cursor-pointer flex items-center justify-center flex-col p-8 rounded-lg bg-${theme.darkMode ? "darkGrey" : 'lightGrey'}`}>
        <div>
          <p style={{ ...typography.heading.M, color: theme.darkMode ? "white" : "black" }}>{task.name}</p>
          <p style={{ ...typography.body.M, color: colors.mediumGrey }}>{task.name}</p>
        </div>
      </button>
    </div>
  )
})
