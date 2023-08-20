import { observer } from "mobx-react-lite";
import { Toggle } from "../toggle";
import { useStores } from "~/models";
import { Icon } from "../icon";
import { typography } from "~/styles/typography";
import { colors } from "~/styles/colors";
import type { ReactNode } from "react";

const ToggleContainer = observer(({ children }: { children: ReactNode }) => {
  const { theme } = useStores()
  if (theme.darkMode) return (
    <div key={"dark"} className={`flex w-full items-center bg-veryDarkGrey justify-evenly rounded-lg p-4`} >
      {children}
    </div>
  )
  return (
    <div key={"light"} className={`flex w-full bg-linesLight items-center justify-evenly rounded-lg p-4`} >
      {children}
    </div>
  )

});

export const BottomContent = observer(() => {
  const { theme, uiState } = useStores()

  return (
    <div className='w-full items-center flex-col px-4 mb-8'>
      <ToggleContainer>
        <Icon icon='sun' size='medium' />
        <Toggle isChecked={theme.darkMode} toggle={() => theme.setProp("darkMode", !theme.darkMode)} size='lg' />
        <Icon icon='darkTheme' size='medium' />
      </ToggleContainer>
      <button onClick={() => uiState.setProp('sidebarOpen', false)} className='mt-4 w-full outline-none hover:opacity-50 cursor-pointer flex flex-row gap-4 ml-4'>
        <Icon icon='eyeSlash' size='medium' />
        <p style={{ ...typography.heading.M, color: colors.mediumGrey }}>Hide Sidebar</p>
      </button>
    </div>
  )
});
