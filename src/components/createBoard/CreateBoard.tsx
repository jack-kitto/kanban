import { useState } from "react"
import { GrFormClose } from "react-icons/gr";
import { TextField } from "../textField"
import { typography } from "~/styles/typography"
import { colors } from "~/styles/colors";
import { Button } from "../button";
import { api } from "~/utils/api";
import { useEscapeKey } from "~/hooks";
import { toast } from "react-hot-toast";
import { Loading } from "../loading";
import { BeatLoader } from "react-spinners";

interface CreateBoardProps {
  close: () => void
}
export const CreateBoard = ({ close }: CreateBoardProps) => {
  const [boardName, setBoardName] = useState("")
  const [columnName, setColumnName] = useState("")
  const [columns, setColumns] = useState(["Todo", "Doing", "Done"])
  useEscapeKey(close)

  const { mutate, isLoading } = api.projects.create.useMutation({
    onSuccess: () => {
      close()
    },
    onError: (e: any) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      toast(errorMessage)
    },
  });

  const deleteColumn = (index: number) => {
    const newColumns = [...columns]
    newColumns.splice(index, 1)
    setColumns(newColumns)
  }

  const addColumn = () => {
    const newColumns = [...columns]
    newColumns.push(columnName)
    setColumnName("")
    setColumns(newColumns)
  }

  const createProject = () => {
    mutate({
      name: boardName,
      columns: columns
    })
  }

  return (
    <div className="p-6 justify-start items-start w-full h-full flex-col flex">
      <div className="w-full justify-between flex flex-row">
        <p style={typography.heading.L}>Add New Board</p>
        <button disabled={isLoading} className="hover:opacity-50" onClick={() => close()}><GrFormClose size={32} /></button>
      </div>
      <div className="mt-4 flex-col items-center justify-center w-full">
        <p style={{ ...typography.body.M, color: colors.mediumGrey }}>Name</p>
        <TextField disabled={isLoading} canBeEmpty={false} placeholder="Enter board name" width="100%" value={boardName} setValue={setBoardName} />
      </div>
      <p className="mt-4" style={{ ...typography.body.M, color: colors.mediumGrey }}>Columns</p>
      {
        columns.length > 0 &&
        <div className="w-full">
          {
            columns.map((column: string, index: number) => (
              <div className="w-full flex flex-row items-center justify-center">
                <div className="w-full flex mt-2 flex-row border-linesLight border-2 rounded-md p-2">
                  <p style={typography.body.L}>{column}</p>
                </div>
                <button disabled={isLoading} className="hover:opacity-50" onClick={() => deleteColumn(index)}><GrFormClose size={32} /></button>
              </div>
            ))
          }
        </div>
      }
      <div className="w-full flex-row flex mt-6">
        <TextField disabled={isLoading} canBeEmpty={true} width="100%" placeholder="Enter column name" value={columnName} setValue={setColumnName} />
      </div>
      {
        columnName.length > 0 &&
        <div className="mt-4 w-full">
          <Button disabled={columnName.length < 1 || isLoading} fillContainer={true} text="+ Add New Column" type="secondary" theme="light" size="sm" onPress={addColumn} />
        </div>
      }
      <div className="mt-4 w-full flex justify-center items-center">
        {
          isLoading ? <BeatLoader color={colors.mainPurple} />
            : <Button fillContainer={true} text="Create New Board" type="secondary" theme="light" size="sm" onPress={createProject} />
        }
      </div>
    </div>
  )
}
