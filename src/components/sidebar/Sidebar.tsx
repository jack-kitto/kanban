'use client'
import Image from 'next/image'
import { SidebarItem } from './SidebarItem';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { CreateBoard } from '../createBoard';
import { api } from '~/utils/api';
import { Loading } from '../loading';
import Link from 'next/link';
import { Toggle } from '../toggle';
import { colors } from '~/styles/colors';
import { typography } from '~/styles/typography';
import { Icon } from '../icon';
import { useStores } from '~/models';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-hot-toast';
const SidebarObserver = () => {
  const [activeItem, setActiveItem] = useState("Platform Launch")
  const [modalIsOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = api.projects.getAll.useQuery()
  const { theme, uiState } = useStores()
  const afterOpenModal = () => { }
  const closeModal = () => { }

  Modal.setAppElement('#root');
  if (isLoading) return <Loading />
  return (
    <div className={`flex flex-col h-full w-1/6 border-right-2 border-right-linesLight bg-${theme.darkMode ? 'darkGrey' : 'white'}`}>
      <div className="flex flex-row items-center  p-10 , h-50 w-full">
        <div className='mr-4'>
          <Icon icon='logo' size='large' />
        </div>
        <Image src={theme.darkMode ? '/kanban-dark.png' : '/kanban-light.png'} width={112} height={50} alt='logo' />
      </div>
      <div className="gap-3 flex flex-col items-start justify-between h-full w-full">
        <div className='w-full'>
          {
            data ? data.map((project) =>
              <Link className='w-full' href={`/${project.id}/${project.name}`}>
                <SidebarItem
                  key={project.id}
                  text={project.name} setActive={setActiveItem}
                  onClick={() => console.log(project)}
                  active={activeItem == project.name}
                />
              </Link>
            )
              : null
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
        <div className='w-full items-center flex-col px-4 mb-8'>
          <div className={`flex w-full items-center justify-evenly bg-${theme.darkMode ? 'veryDarkGrey' : 'linesLight'} rounded-lg p-4`} >
            <Icon icon='sun' size='medium' />
            <Toggle toggle={() => theme.setProp("darkMode", !theme.darkMode)} size='lg' />
            <Icon icon='darkTheme' size='medium' />
          </div>
          <button onClick={() => uiState.setProp('sidebarOpen', false)} className='mt-4 w-full hover:opacity-50 cursor-pointer flex flex-row gap-4 ml-4'>
            <Icon icon='eyeSlash' size='medium' />
            <p style={{ ...typography.heading.M, color: colors.mediumGrey }}>Hide Sidebar</p>
          </button>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <CreateBoard onSuccess={() => refetch()} close={() => setIsOpen(false)} />
        </Modal>
      </div>
    </div>
  );
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '40%',
    transform: 'translate(-50%, -50%)',
  },
};
export const Sidebar = observer(SidebarObserver);
