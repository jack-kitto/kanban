
// Edit project board
// <Form
//   title={name}
//   setTitle={setName}
//   type='Board'
//   action='Edit'
//   open={editBoardFormOpen}
//   setOpen={setEditBoardFormOpen}
//   onClose={() => setEditBoardFormOpen(false)}
//   items={columns}
//   isLoading={isLoading}
//   newItemName={newColumnName}
//   setNewItemName={setNewColumnName}
//   onSubmit={() => onSubmitEditBoard()}
//   addItem={() => {
//     setColumns([...columns, newColumnName])
//     setNewColumnName('')
//   }}
//   valid={valid}
//   removeItemByIndex={(index: number) => {
//     setColumns(prev => prev.filter((_, i) => i !== index))
//   }}
// />


import { typography } from "~/styles/typography"
import { MainModal } from "../mainModal"
import { colors } from "~/styles/colors"
import { TextField } from "../textField"
import { BeatLoader } from "react-spinners"
import { Button } from "../button"
import { GrFormClose } from "react-icons/gr"

export default function Form({
  open,
  setOpen,
  onClose,
  type,
  action,
  items,
  isLoading,
  newItemName,
  setNewItemName,
  onSubmit,
  addItem,
  valid,
  removeItemByIndex,
  title,
  setTitle,
}: {
  title: string,
  setTitle: (title: string) => void,
  description?: string,
  setDescription?: (description: string) => void,
  type: 'Board' | 'Task'
  action: 'Add' | 'Edit'
  open: boolean,
  setOpen: (open: boolean) => void,
  onClose: () => void,
  items: string[],
  isLoading: boolean,
  newItemName: string,
  setNewItemName: (name: string) => void,
  onSubmit: () => void,
  addItem: () => void,
  valid: boolean,
  removeItemByIndex: (index: number) => void,
}) {
  return (
    <MainModal
      size='2xl'
      open={open}
      setOpen={setOpen}
      onClose={onClose}
      header={<p style={typography.heading.L}>{action == 'Edit' ? 'Edit' : 'Add New'} {type}</p>}
      body={
        <div className="p-6 justify-start items-start w-full h-full flex-col flex">
          <div className="mt-4 flex-col items-center justify-center w-full">
            <p style={{ ...typography.body.M, color: colors.mediumGrey }}>Name</p>
            <TextField disabled={isLoading} canBeEmpty={false} placeholder={type == 'Task' ? "e.g. Take coffee break" : "e.g. Web Design"} width="100%" value={title} setValue={setTitle} />
          </div>
          <p className="mt-4" style={{ ...typography.body.M, color: colors.mediumGrey }}>Columns</p>
          {
            items?.length > 0 &&
            <div className="w-full">
              {
                items?.map((item: string, index: number) => (
                  <div key={`${item} ${index}`} className="w-full flex flex-row items-center justify-center">
                    <div className="w-full flex mt-2 flex-row border-linesLight border-2 rounded-md p-2">
                      <p style={typography.body.L}>{item}</p>
                    </div>
                    <button disabled={isLoading} className="hover:opacity-50" onClick={() => removeItemByIndex(index)}><GrFormClose size={32} /></button>
                  </div>
                ))
              }
            </div>
          }
          <div className="w-full flex-row flex mt-6">
            <TextField disabled={isLoading} canBeEmpty={true} width="100%" placeholder="Enter column name" value={newItemName} setValue={setNewItemName} />
          </div>
          {
            newItemName.length > 0 &&
            <div className="mt-4 w-full">
              <Button disabled={newItemName.length < 1 || isLoading} fillContainer={true} text="+ Add New Column" type="secondary" size="sm" onPress={addItem} />
            </div>
          }
          <div className="mt-4 w-full flex justify-center items-center">
            {
              isLoading ? <BeatLoader color={colors.mainPurple} />
                : <Button disabled={!valid} fillContainer={true} text={`${action == 'Edit' ? 'Save Changes' : `'Create New ${type}'`}`} type="secondary" size="sm" onPress={onSubmit} />
            }
          </div>
        </div>
      }
    />
  )

}
