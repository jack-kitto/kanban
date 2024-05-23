import Bubble, { type ColourName } from "~/components/atoms/bubble/Bubble";

export interface TagProps {
  colour: ColourName,
  label: string
}

export default function Tag(props: TagProps): JSX.Element {
  return (
    <div className="flex gap-[13px] justify-center items-center">
      <Bubble colour={props.colour} />
      <span className="prose-hs text-mediumGray text-nowrap">
        {props.label}
      </span>
    </div>
  )
}
