import Image from 'next/image'
import { SidebarItem } from './SidebarItem';
export const Sidebar = () => {
  return (
    <div className="flex flex-col h-full w-1/6 border-2 border-linesLight">
      <div className="flex flex-row items-center  p-10 , h-24 w-full">
        <Image src="/logo.png" alt="Logo" width="24" height="25" />
        <div className=" ml-5 mt-2 text-xl font-bold">kanban</div>
      </div>
      <div className="flex flex-col items-center justify-center h-24 w-full">
        <SidebarItem />
      </div>
    </div>
  );
}

