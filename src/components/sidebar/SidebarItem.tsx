import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { typography } from '~/styles/typography';
import { colors } from '~/styles/colors';
import { observer } from 'mobx-react-lite';
import { useStores } from '~/models';

interface SidebarItemProps {
  text: string;
  onClick: () => void;
}
const SidebarItemComponent = ({ text, onClick }: SidebarItemProps) => {
  const { projects } = useStores()
  const [active, setActive] = useState(projects.getCurrentProject().name == text ? true : false)
  useEffect(() => {
    setActive(projects.getCurrentProject().name == text ? true : false)
  }, [projects.currentProjectIndex])
  return (
    <button
      style={{
        height: '48px',
        backgroundColor: active ? colors.mainPurple : undefined
      }}
      className='flex flex-col rounded-r-full h-full w-full justify-center pl-6 hover:opacity-50'
      onClick={onClick}
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
export const SidebarItem = observer(SidebarItemComponent);
