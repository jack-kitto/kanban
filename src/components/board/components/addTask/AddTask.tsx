import { typography } from "~/styles/typography";
import { observer } from "mobx-react-lite";
import { colors } from "~/styles/colors";

const AddTaskComponent = ({ onPress }: { onPress: () => void }) => {
  return (
    <button onClick={onPress} className="flex hidden group-hover:flex flex-row cursor-pointer">
      <div className="w-full flex-1 bg-mainPurple h-1 rounded-full" />
      <div className="flex h-1 flex-1 w-full justify-center items-center">
        <p style={{ ...typography.body.M, color: colors.mediumGrey }}>+ New Task</p>
      </div>
      <div className="flex-1 w-full bg-mainPurple h-1 rounded-full" />
    </button>
  )
};
export const AddTask = observer(AddTaskComponent);
