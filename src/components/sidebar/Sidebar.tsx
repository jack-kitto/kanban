import Image from 'next/image'
import { Icon } from '../icon';
import { useStores } from '~/models';
import { observer } from 'mobx-react-lite';
import { BottomContent } from './BottomContent';
import { TopContent } from './TopContent';
import Link from 'next/link';

const SidebarWrapper = observer(({ children }: { children: React.ReactNode }) => {
  const { theme } = useStores()
  if (theme.darkMode) return (
    <div key={"darkmodesidebar"} className='flex flex-col h-full w-full border-r-2 border-linesDark bg-darkGrey'>
      {children}
    </div>
  )
  return (
    <div key={"lightmodesidebar"} className='flex flex-col h-full w-full border-r-2 border-linesLight bg-white'>
      {children}
    </div>
  )
})

const SidebarObserver = () => {
  const { theme } = useStores()
  return (
    <SidebarWrapper>
      <Link href={'/'} className="flex flex-row items-center  p-10 , h-50 w-full cursor:pointer">
        <div className='mr-4'>
          <Icon icon='logo' size='large' />
        </div>
        {theme.darkMode && (<Image key={"darkthemelogo"} src='/kanban-dark.png' width={112} height={50} alt='logo' />)}
        {!theme.darkMode && (<Image key={'lightthemelogo'} src='/kanban-light.png' width={112} height={50} alt='logo' />)}
      </Link>
      <div className="gap-3 flex flex-col items-start justify-between h-full w-full">
        <TopContent />
        <BottomContent />
      </div>
    </SidebarWrapper>
  );
}
export const Sidebar = observer(SidebarObserver);
