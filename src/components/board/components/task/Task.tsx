import { observer } from "mobx-react-lite";
import type { ITaskModel } from "~/models/ProjectsStore";

export const Task = observer(({ task }: { task: ITaskModel }) => {
  return (
    <div>
      {task.name}
    </div>
  )
})
