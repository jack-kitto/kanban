import React from 'react';
import Image from 'next/image'
import Board from '../../../public/icon-board.svg'
import { typography } from '~/styles/typography';
import { colors } from '~/styles/colors';

interface SidebarItemProps {
  text: string;
  active: boolean;
  onClick: () => void;
}
export const SidebarItem = ({ text, active, onClick }: SidebarItemProps) => {
  const styles = {
    active: {

    },
    inactive: {

    },
  }
  return (
    <button style={{ height: '48px', backgroundColor: active ? colors.mainPurple : undefined }} className='flex flex-col rounded-r-full h-full w-full justify-center pl-6'>
      <div className='flex-row flex'>
        <div className='mr-2 justify-center items-center flex flex-col'>
          <Image src={`/project-regular${active ? "-active" : ""}.png`} alt="boardIcon" width="16" height="16" />
        </div>
        <div style={{
          ...typography.heading.M,
          color: active ? colors.white : colors.darkGrey
        }}>{text}</div>
      </div>
    </button>
  );
}
