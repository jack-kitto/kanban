import { observer } from "mobx-react-lite"
import { useStores } from "~/models"
import { typography } from "~/styles/typography"

export const AddColumn = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useStores()
  const Wrapper = observer(({ children }: { children: React.ReactNode }) => {
    if (theme.darkMode) {
      return (
        <button onClick={onPress} className="flex flex-row group h-full items-center justify-center shadow-lg rounded-md cursor-pointer bg-darkGrey">
          {children}
        </button>
      )

    } return (
      <button onClick={onPress} className="flex flex-row group h-full items-center justify-center shadow-lg rounded-md cursor-pointer bg-white">
        {children}
      </button>
    )

  }
  )
  return (
    <div className="flex-1 items-center flex justify-center h-full pt-24 pb-12">
      <Wrapper>
        <div className="group">
          <p className="group-hover:text-mainPurple text-mediumGrey" style={{ ...typography.heading.XL, padding: '55px' }}>+ New Column</p>
        </div>
      </Wrapper>
    </div>
  )
}
