'use client'
import { SidebarItem } from './SidebarItem';
import { useState } from 'react';
import { api } from '~/utils/api';
import Link from 'next/link';
import { Icon } from '../icon';
import { observer } from 'mobx-react-lite';
import { useStores } from '~/models';
import React from 'react';
import Form from '../form/Form';
import { nanoid } from 'nanoid';
import { toast } from 'react-hot-toast';

const TopContentObserver = () => {
  const [activeItem, setActiveItem] = useState("Platform Launch")
  const [name, setName] = React.useState('')
  const [columns, setColumns] = React.useState<string[]>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const [newColumnName, setNewColumnName] = React.useState('')
  const [valid, setValid] = React.useState(false)
  const { projects } = useStores()
  const ctx = api.useContext()
  const { data, isLoading: isLoading } = api.projects.getAll.useQuery()
  const { mutate, isLoading: isCreatingBoard } = api.projects.create.useMutation({
    onSuccess: (res): void => {
      projects.addProject(res)
      ctx.projects.getAll.invalidate().catch((e: Error) => console.error(e.message))
      setIsOpen(false)
    },
    onError: (e): void => {
      if (e.data?.zodError?.fieldErrors?.name) {
        e.data.zodError.fieldErrors.name.forEach((err: string) => toast.error(err))
      }
    },
  });

  React.useEffect(() => {
    if (name.length > 0 && columns.length > 0) setValid(true)
    else setValid(false)
  }, [columns, name])
  if (isLoading) return <div />
  if (data) projects.syncProjects(data)
  const onSubmitCreateBoard = () => {
    mutate({
      name: name,
      columns: columns,
      id: nanoid()
    })
  }
  return (
    <div className="gap-3 flex flex-col items-start justify-between h-full w-full">
      <div className='w-full'>
        {
          projects.projects.map((project) =>
            <Link key={project.id} className='w-full' href={`/${project.id}/${project.name}`}>
              <SidebarItem
                key={project.id}
                text={project.name} setActive={setActiveItem}
                onClick={() => null}
                active={activeItem == project.name}
              />
            </Link>
          )
        }
        <button onClick={() => setIsOpen(true)} className='flex flex-col rounded-r-full justify-center pl-6'>
          <div className='flex flex-row w-full hover:opacity-50'>
            <div className='mr-2 justify-center items-center flex flex-col'>
              <Icon icon='projectRegular' />
            </div>
            <p className='text-mainPurple font-bold'>+ Create New Board</p>
          </div>
        </button>
      </div>
      <Form
        title={name}
        setTitle={setName}
        type='Board'
        action='Add'
        open={isOpen}
        setOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
        items={columns}
        isLoading={isCreatingBoard}
        newItemName={newColumnName}
        setNewItemName={setNewColumnName}
        onSubmit={() => onSubmitCreateBoard()}
        addItem={() => {
          setColumns([...columns, newColumnName])
          setNewColumnName('')
        }}
        valid={valid}
        removeItemByIndex={(index: number) => {
          setColumns(prev => prev.filter((_, i) => i !== index))
        }}
      />

    </div>
  );
}
export const TopContent = observer(TopContentObserver);
