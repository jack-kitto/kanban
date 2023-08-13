import type { IColumnModel } from "~/models/ProjectsStore"
import { colors } from "~/styles/colors"
import { typography } from "~/styles/typography"

export const Column = ({ column }: { column: IColumnModel }) => {

  return (
    <div className="flex-1 items-start flex justify-center">
      <div className="w-25 flex flex-row items-center justify-center mt-12">
        <div style={{ backgroundColor: colors.pallette['grey'].value }} className="w-4 h-4 rounded-full mr-2" />
        <div>
          <p style={{ ...typography.heading.S, color: colors.mediumGrey }}>{column.name}</p>
        </div>
      </div>
    </div>
  )
}
