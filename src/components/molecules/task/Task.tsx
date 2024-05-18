export interface TaskProps {
  title: string;
  subtitle: string;
}

export default function Task(props: TaskProps): JSX.Element {
  return (
    <div
      className="flex flex-col dark:bg-darkGray gap-3 min-h-[88px] min-w-[280px] rounded-lg px-4 py-7"
      style={{ boxShadow: '0px 4px 6px rgba(54, 78, 126, 0.101545)' }}
    >
      <h1 className="prose-hm dark:text-white">{props.title}</h1>
      <p className="prose-bm text-mediumGray">{props.subtitle}</p>
    </div>
  )
}
