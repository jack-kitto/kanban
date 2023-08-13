import { observer } from "mobx-react-lite";
import { ITaskModel } from "~/models/ProjectsStore";

export default observer(function Task({ task }: { task: ITaskModel }) {
  return (
    <div>
      task
    </div>
  )
});

