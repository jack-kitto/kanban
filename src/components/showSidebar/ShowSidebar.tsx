import { observer } from "mobx-react-lite";
import { Icon } from "../icon";
import { useStores } from "~/models";

export const ShowSidebar = observer(() => {
  const { uiState } = useStores()
  return (
    <button className="absolute left-0 bottom-0 w-16 h-12 flex justify-center mb-12 items-center h bg-mainPurple hover:bg-mainPurpleHover rounded-tr-full rounded-br-full" onClick={() => uiState.setProp('sidebarOpen', true)}>
      <Icon icon="eye" size="large" />
    </button>
  )
});
