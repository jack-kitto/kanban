import React from 'react';
import Image from 'next/image'
import Board from '../../../public/icon-board.svg'

export const SidebarItem = () => {
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex-row flex'>
          <div className='mr-2 justify-center items-center flex flex-col'>
            <Image src={Board} alt="Logo" width="16" height="16" />
          </div>
          <div>Platform Launch</div>
        </div>
        <div className='flex flex-row'>
          <div className='mr-2 justify-center items-center flex flex-col'>
            <Image src={Board} alt="Logo" width="16" height="16" />
          </div>
          <div> + Create New Board</div>
        </div>
      </div>
    </>
  );
}
