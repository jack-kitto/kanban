import { observer } from "mobx-react-lite"
import { colors } from "~/styles/colors"
import { typography } from "~/styles/typography"

export default observer(function AddColumn() {
  return (
    <div className="flex-1 items-center flex justify-center h-full pt-24 pb-12">
      <button className="flex flex-row h-full items-center justify-center bg-cardColLight rounded-md cursor-pointer hover:opacity-50">
        <div>
          <p style={{ ...typography.heading.XL, color: colors.mediumGrey, padding: '55px' }}>+ New Column</p>
        </div>
      </button>
    </div>
  )
})
