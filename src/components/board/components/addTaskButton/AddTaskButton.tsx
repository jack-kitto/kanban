import { observer } from "mobx-react-lite";
import React from "react";
import { toast } from "react-hot-toast";
import { Form } from "~/components/form";
import { useStores } from "~/models";
import { api } from "~/utils/api";

export const AddTaskButton = observer(({ Children, columnId, position }: { position: number, columnId: string, Children: React.FC<{ onPress: () => void }> }) => {
  const [description, setDescription] = React.useState('');
  const [newTaskName, setNewTaskName] = React.useState('')
  const [newTaskPosition, setNewTaskPosition] = React.useState(position)
  const [subTasks, setSubTasks] = React.useState<string[]>([])
  const [addTaskFormOpen, setAddTaskFormOpen] = React.useState('')
  const [newSubTaskName, setNewSubTaskName] = React.useState('')
  const [newTaskValid, setNewTaskValid] = React.useState(false)
  const ctx = api.useContext()
  const { projects } = useStores()

  React.useEffect(() => {
    if (newTaskName.length === 0) return
    if (description.length === 0) return
    setNewTaskValid(true)

  }, [newTaskPosition, newTaskName, description, subTasks])

  const { mutate: createTask, isLoading: isTaskCreating } = api.projects.createTask.useMutation({
    onSuccess: (res): void => {
      if (!res) return
      projects.removeProjectById(res?.id)
      projects.addProject(res)
      ctx.projects.getAll.invalidate().catch((e: Error) => console.error(e.message))
      projects.setProp('currentProjectIndex', null)
      projects.openProjectById(res.id)
      setAddTaskFormOpen('')
      setNewTaskName('')
      setNewTaskPosition(1)
      setDescription('')
      setSubTasks([])
    },
    onError: (e): void => {
      if (e.data?.zodError?.fieldErrors?.name) {
        e.data.zodError.fieldErrors.name.forEach((err: string) => toast.error(err))
      }
    },
  });
  const addNewTask = () => {
    createTask({
      name: newTaskName,
      position: newTaskPosition,
      description,
      columnId: parseInt(addTaskFormOpen),
      subTasks: subTasks,
      projectId: projects.getCurrentProject()?.id
    })

  }
  return (
    <>
      <Children onPress={() => {
        toast(`position: ${position}`)
        setAddTaskFormOpen(columnId)
      }} />
      <Form
        columnId={addTaskFormOpen}
        setColumnId={setAddTaskFormOpen}
        title={newTaskName}
        setTitle={setNewTaskName}
        type='Task'
        action='Add'
        open={addTaskFormOpen !== ''}
        setOpen={() => setAddTaskFormOpen('')}
        description={description}
        setDescription={setDescription}
        onClose={() => setAddTaskFormOpen('')}
        items={subTasks}
        isLoading={isTaskCreating}
        newItemName={newSubTaskName}
        setNewItemName={setNewSubTaskName}
        onSubmit={addNewTask}
        addItem={() => {
          setSubTasks(prev => [...prev, newSubTaskName])
          setNewSubTaskName('')
        }}
        valid={newTaskValid}
        removeItemByIndex={(index: number) => {
          setSubTasks(prev => prev.filter((_, i) => i !== index))
        }}
      />
    </>
  )
});
