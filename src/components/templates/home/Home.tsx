export interface HomeProps {
  navbar: JSX.Element;
  children: JSX.Element;
}

export default function Home(props: HomeProps): JSX.Element {
  return (
    <div className="">
      <div className="fixed top-0 left-0 h-[64px] md:h-[81px] right-0">
        {props.navbar}
      </div>
      <div className="fixed top-[64px] md:top-[81px] left-0 right-0 bottom-0">
        {props.children}
      </div>
    </div>
  )
}
