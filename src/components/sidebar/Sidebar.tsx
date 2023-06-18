import Image from 'next/image'
import { SidebarItem } from './SidebarItem';
import { useState } from 'react';
export const Sidebar = () => {
  const items = [
    "Platform Launch",
    "Marketing Plan",
    "Roadmap",
  ]
  const [activeItem, setActiveItem] = useState("Platform Launch")
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
      </div>
    </div>
  );
}

