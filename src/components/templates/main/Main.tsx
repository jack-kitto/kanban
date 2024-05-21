export interface MainProps {
  sidebar: JSX.Element;
  navbar: JSX.Element;
  children: JSX.Element;
}

export default function Main(props: MainProps): JSX.Element {
  return (
    <div className="">
      <div className="max-sm:hidden sm:w-[261px] md:w-[300px] sm:visible sm:fixed sm:left-0 sm:top-0 h-full bottom-0">
        {props.sidebar}
      </div>
      <div className="fixed top-0 left-0 sm:left-[261px] md:left-[300px] h-[64px] md:h-[81px] right-0">
        {props.navbar}
      </div>
      <div className="fixed top-[64px] md:top-[81px] left-0 sm:left-[261px] md:left-[300px] right-0 bottom-0">
        {props.children}
      </div>
    </div>
  )
}
