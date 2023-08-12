'use client'
import { CreateBoard } from '../createBoard';
import { SidebarItem } from './SidebarItem';
import { useState } from 'react';
import { api } from '~/utils/api';
import Link from 'next/link';
import { Icon } from '../icon';
import { observer } from 'mobx-react-lite';
import { MainModal } from '../mainModal';
import { typography } from '~/styles/typography';
import { useStores } from '~/models';

const TopContentObserver = () => {
  const [activeItem, setActiveItem] = useState("Platform Launch")
  const [modalIsOpen, setIsOpen] = useState(false);
  const { projects } = useStores()
  const { data, isLoading, refetch } = api.projects.getAll.useQuery()
  if (isLoading) return <div />
  if (data) projects.syncProjects(data)
  return (
    <div className="gap-3 flex flex-col items-start justify-between h-full w-full">
      <div className='w-full'>
        {
          projects.projects.map((project) =>
            <Link key={project.id} className='w-full' href={`/${project.id}/${project.name}`}>
              <SidebarItem
                key={project.id}
                text={project.name} setActive={setActiveItem}
                onClick={() => console.log(project)}
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
      <MainModal
        size='2xl'
        open={modalIsOpen}
        setOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
        header={<p style={typography.heading.L}>Add New Board</p>}
        body={<CreateBoard onSuccess={() => { refetch().catch((e: Error) => console.error(e.message)) }} close={() => { setIsOpen(false) }} />}
      />
    </div>
  );
}
export const TopContent = observer(TopContentObserver);
