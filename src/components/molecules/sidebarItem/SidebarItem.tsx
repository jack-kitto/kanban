import { Icon } from "~/components/atoms/icon";

export interface SidebarItemProps {
  label: string;
  checked: boolean;
  setChecked?: (checked: boolean) => void;
  onClick: () => void;
  type?: 'menuItem' | 'button'
}

export default function SidebarItem(props: SidebarItemProps): JSX.Element {
  return (
    <div className={`pr-6 h-12`}>
      <button onMouseDown={props.onClick} className={`flex pl-8 w-full h-full items-center rounded-r-full gap-4 ${props.checked && 'bg-mainPurple cursor-default'} ${!props.checked && 'pr-6 group outline-none select-none hover:bg-lightHover hover:text-mainPurple hover:bg-opacity-[0.1] dark:hover:bg-white'}`}>
        <Icon icon={props.type === 'button' ? 'BoardPurple' : props.checked ? 'Board' : 'BoardGray'} />
        <h1 className={`prose-hm group-hover:text-mainPurple ${props.type === 'button' ? 'text-mainPurple' : props.checked ? 'text-white' : 'text-mediumGray'}`}>{props.label}</h1>
      </button>
    </div>
  );
}
