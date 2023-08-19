import { typography } from "~/styles/typography";
import type { ReactNode } from "react";
import { useStores } from "~/models";
import { observer } from "mobx-react-lite";

const AddTaskComponent = () => {
  const { theme } = useStores()
  const Wrapper = observer(({ children }: { children: ReactNode }) => {
    if (theme.darkMode) {
      return (
        <div key={'darkaddtaskcomponent'} className="w-full opacity-75 bg-darkGrey group rounded-md cursor-pointer h-24 shadow-md shadow-darkGrey items-center justify-center flex">
          {children}
        </div>
      )
    }
    return (
      <div key={'lightaddtaskcomponent'} className="w-full opacity-75 bg-white group rounded-md cursor-pointer h-24 shadow-md shadow-mediumGrey items-center justify-center flex">
        {children}
      </div>
    )

  })
  return (
    <Wrapper>
      <p className="group-hover:text-mainPurple cursor-pointer" style={{ ...typography.heading.M }}>+ New Task</p>
    </Wrapper>
  )
};
export const AddTask = observer(AddTaskComponent);
