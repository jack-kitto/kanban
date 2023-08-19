
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
import { observer } from "mobx-react-lite"
import { useStores } from "~/models"
import { Dropdown } from "../dropdown"

export const Form = observer(({
  description,
  setDescription,
  columnId,
  setColumnId,
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
  columnId?: string,
  setColumnId?: (id: string) => void,
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
}) => {
  const { theme, projects } = useStores()
  return (
    <MainModal
      size='2xl'
      open={open}
      setOpen={setOpen}
      onClose={onClose}
      header={<p style={{ ...typography.heading.L, color: theme.darkMode ? 'white' : 'black' }}>{action == 'Edit' ? 'Edit' : 'Add New'} {type}</p>}
      body={
        <div className={`p-6 justify-start items-start w-full h-full flex-col flex bg-${theme.darkMode ? 'darkGrey' : 'white'}`}>
          <div className="mt-4 flex-col items-center justify-center w-full">
            <p className="my-2" style={{ ...typography.body.M, color: theme.darkMode ? 'white' : colors.mediumGrey }}>Name</p>
            <TextField disabled={isLoading} canBeEmpty={false} placeholder={type == 'Task' ? "e.g. Take coffee break" : "e.g. Web Design"} width="100%" value={title} setValue={setTitle} />
            {type == 'Task' && description != undefined && setDescription != undefined ? (
              <div className="mt-6">
                <p className="my-2" style={{ ...typography.body.M, color: theme.darkMode ? 'white' : colors.mediumGrey }}>Description</p>
                <TextField disabled={isLoading} canBeEmpty={false} placeholder={type == 'Task' ? "e.g. It's always good to take a break. This 15 minute break will rechard the batteries a little." : "e.g. Web Design"} width="100%" value={description} setValue={setDescription} />
              </div>
            ) : null}
          </div>
          <p className="mt-4" style={{ ...typography.body.M, color: theme.darkMode ? 'white' : colors.mediumGrey }}>{type == 'Board' ? 'Columns' : "Subtasks"}</p>
          {
            <div className="w-full">
              {
                items?.map((item: string, index: number) => (
                  <div key={`${item} ${index}`} className="w-full mt-2 flex flex-row items-center justify-center">
                    <div className={`w-full flex flex-row border-lines${!theme.darkMode ? 'Light' : 'Dark'} bg-${theme.darkMode ? 'veryDarkGrey' : 'white'} border-2 rounded-md p-2`}>
                      <p style={{ ...typography.body.L, color: theme.darkMode ? 'white' : 'black' }}>{item}</p>
                    </div>
                    <button disabled={isLoading} className="hover:opacity-50" onClick={() => removeItemByIndex(index)}><GrFormClose size={32} /></button>
                  </div>
                ))
              }
            </div>
          }
          <div className="w-full flex-row flex mt-2">
            <TextField disabled={isLoading} canBeEmpty width="100%" placeholder={`Enter ${`subtask`} name`} value={newItemName} setValue={setNewItemName} />
          </div>
          {
            newItemName.length > 0 &&
            <div className="mt-4 w-full">
              <Button disabled={newItemName.length < 1 || isLoading} fillContainer={true} text={`+ Add New ${type == 'Task' ? "Subtask" : 'Column'}`} type="secondary" size="sm" onPress={addItem} />
            </div>
          }
          {type == 'Task' && columnId && setColumnId && (
            <div className="w-full mt-8">
              <p className="my-2" style={{ ...typography.body.L, color: theme.darkMode ? 'white' : colors.mediumGrey }}>Status</p>
              <Dropdown
                transformOptionText={(id) => {
                  const column = projects.getCurrentProject().getColumnById(id);
                  return column ? column.name : '';
                }}
                options={projects.getCurrentProject().columns.map(col => col.id)}
                selected={columnId}
                setSelected={(id) => {
                  setColumnId(id)
                }}
              />
            </div>
          )}
          <div className="mt-4 w-full flex justify-center items-center">
            {
              isLoading ? <BeatLoader color={colors.mainPurple} />
                : <Button disabled={!valid} fillContainer={true} text={`${action == 'Edit' ? 'Save Changes' : `Create New ${type}`}`} type="primary" size="sm" onPress={onSubmit} />
            }
          </div>
        </div>
      }
    />
  )
})
