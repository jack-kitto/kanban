import React from 'react';
import Image from 'next/image'
import { typography } from '~/styles/typography';
import { colors } from '~/styles/colors';

interface SidebarItemProps {
  text: string;
  active: boolean;
  onClick: () => void;
  setActive: (active: string) => void;
}
export const SidebarItem = ({ text, active, onClick, setActive }: SidebarItemProps) => {
  return (
    <button
      style={{
        height: '48px',
        backgroundColor: active ? colors.mainPurple : undefined
      }}
      className='flex flex-col rounded-r-full h-full w-full justify-center pl-6 hover:opacity-50'
      onClick={() => {
        setActive(text)
        onClick()
      }}
    >
      <div className='flex-row flex'>
        <div className='mr-2 justify-center items-center flex flex-col'>
          <Image src={`/project-regular${active ? "-active" : ""}.png`} alt="boardIcon" width="16" height="16" />
        </div>
        <div className='w-full' style={{
          ...typography.heading.M,
          color: active ? colors.white : colors.darkGrey,
        }}><p style={{ color: active ? colors.white : colors.mediumGrey }}>{text}</p></div>
      </div>
    </button>
  );
}
