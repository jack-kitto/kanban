import Image from 'next/image'
import { SidebarItem } from './SidebarItem';
import Modal from 'react-modal';
import { useState } from 'react';
import { api } from '~/utils/api';
export const Sidebar = () => {
  const items = [
    "Platform Launch",
    "Marketing Plan",
    "Roadmap",
  ]
  const [activeItem, setActiveItem] = useState("Platform Launch")
  const [modalIsOpen, setIsOpen] = useState(false);
  const { mutate, isLoading: isPosting } = api.projects.create.useMutation({
    onSuccess: (res) => {
      console.log("Success", res)
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log("Error", e)
    },
  });
  const createBoard = () => {
    console.log("Mutating")
    mutate({ name: "Roadmap" })
  }
  const afterOpenModal = () => { }
  const closeModal = () => { }

  Modal.setAppElement('#root');
  return (
    <div className="flex flex-col h-full w-1/6 border-2 border-linesLight">
      <div className="flex flex-row items-center  p-10 , h-50 w-full">
        <Image src="/logo.png" alt="Logo" width="24" height="25" />
        <div className=" ml-5 mt-2 text-xl font-bold items-center justify-center h-full w-full">kanban</div>
      </div>
      <div className="gap-3 flex flex-col items-start justify-start h-full w-full">
        {
          items.map((item) => <SidebarItem key={item} text={item} setActive={setActiveItem} onClick={() => console.log(item)} active={activeItem == item} />)
        }
        <button onClick={() => setIsOpen(true)} className='flex flex-col rounded-r-full justify-center pl-6'>
          <div className='flex flex-row'>
            <div className='mr-2 justify-center items-center flex flex-col'>
              <Image src={`/project-regular.png`} alt="boardIcon" width="16" height="16" />
            </div>
            <p className='text-mainPurple font-bold hover:font-black'>+ Create New Board</p>
          </div>
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <h2>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
        </Modal>     </div>
    </div>
  );
}

