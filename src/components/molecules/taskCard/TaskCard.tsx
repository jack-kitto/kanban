import { Draggable, type DraggableProvided } from 'react-beautiful-dnd';
export interface TaskCardProps {
  title: string;
  subtitle: string;
  id?: string;
  index: number;
}

export default function TaskCard(props: TaskCardProps): JSX.Element {
  if (!props.id) {
    return (
      <div
        className="flex bg-white flex-col dark:bg-darkGray gap-3 min-h-[88px] min-w-[280px] rounded-lg px-4 py-7"
        style={{ boxShadow: '0px 4px 6px rgba(54, 78, 126, 0.101545)' }}
      >
        <h1 className="prose-hm dark:text-white">{props.title}</h1>
        <p className="prose-bm text-mediumGray">{props.subtitle}</p>
      </div>
    )
  }

  return (
    <Draggable key={`${props.id}`} draggableId={`${props.id}`} index={props.index}>
      {(dragProvided: DraggableProvided): JSX.Element => {
        return (
          <div
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
            className="flex bg-white group flex-col m-0 items-start mb-5 dark:bg-darkGray gap-3 min-h-[88px] w-[280px] rounded-lg px-4 py-7"
            style={{ boxShadow: '0px 4px 6px rgba(54, 78, 126, 0.101545)', ...dragProvided.draggableProps.style }}
          >
            <h1 className="prose-hm group-hover:text-mainPurple group-hover:dark:text-mainPurple dark:text-white">{props.title}</h1>
            <p className="prose-bm text-mediumGray">{props.subtitle}</p>
          </div>
        )
      }}
    </Draggable>
  )
}
