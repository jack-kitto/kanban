export interface MainLayoutProps {
  sidebar: JSX.Element;
  navbar: JSX.Element;
  children: JSX.Element;
  sidebarHidden: boolean;
}

export default function MainLayout(props: MainLayoutProps): JSX.Element {
  return (
    <div className={`${!props.sidebarHidden && `dark:bg-darkGray`}`}>
      {
        props.sidebarHidden
          ?
          <div className="absolute bottom-8 left-0 h-12 rounded-r-full z-50  w-[56px] transition outline-none hover-duration-150 ease-in-out hover:scale-105 active:scale-100 select-none">
            {props.sidebar}
          </div>
          :
          <div className={`dark:bg-darkGray max-sm:hidden -z-10 sm:w-[261px] md:w-[300px] sm:visible sm:fixed sm:left-0 sm:top-0 h-full bottom-0 ${!props.sidebarHidden && '-z-50'}`}>
            {props.sidebar}
          </div>
      }
      <div className={`fixed top-0 -z-20 left-0 ${!props.sidebarHidden && 'sm:left-[261px] md:left-[300px]'} h-[64px] md:h-[81px] right-0  border-l-[1px] border-r-linesLight border-t-border-r-linesLight dark:border-linesDark`}>
        {props.navbar}
      </div>
      <div className={`fixed -z-20 top-[64px] md:top-[81px] left-0 ${!props.sidebarHidden && 'sm:left-[261px] md:left-[300px]'} right-0 bottom-0 border-[1px] border-linesLight dark:border-linesDark`}>
        {props.children}
      </div>
    </div>
  )
}
