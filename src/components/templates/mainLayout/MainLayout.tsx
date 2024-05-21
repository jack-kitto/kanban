export interface MainLayoutProps {
  sidebar: JSX.Element;
  navbar: JSX.Element;
  children: JSX.Element;
}

export default function MainLayout(props: MainLayoutProps): JSX.Element {
  return (
    <div className="">
      <div className="max-sm:hidden sm:w-[261px] md:w-[300px] sm:visible sm:fixed sm:left-0 sm:top-0 h-full bottom-0 -z-50">
        {props.sidebar}
      </div>
      <div className="fixed top-0 left-0 sm:left-[261px] md:left-[300px] h-[64px] md:h-[81px] right-0  border-l-[1px] border-linesLight dark:border-linesDark">
        {props.navbar}
      </div>
      <div className="fixed top-[64px] md:top-[81px] left-0 sm:left-[261px] md:left-[300px] right-0 bottom-0 -z-50 border-[1px] border-linesLight dark:border-linesDark">
        {props.children}
      </div>
    </div>
  )
}
