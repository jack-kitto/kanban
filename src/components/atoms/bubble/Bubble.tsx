export const bubbleColours = [
  {
    hex: '#eccbd9',
    name: 'Mimi Pink',
  },
  {
    hex: '#e1eff6',
    name: 'Alice Blue',
  },
  {
    hex: '#97d2fb',
    name: 'Light Sky Blue',
  },
  {
    hex: '#83bcff',
    name: 'Jordy Blue',
  },
  {
    hex: '#80ffe8',
    name: 'Aquamarine',
  },
  {
    hex: '#49c4e5',
    name: 'Aqua Blue',
  },
  {
    hex: '#8471F2',
    name: 'Purple Heart',
  },
  {
    hex: '#67E2AE',
    name: 'Magic Mint',
  },
  {
    hex: '#98c1d9',
    name: 'Powder blue',
  },
  {
    hex: '#6969b3',
    name: 'Slate blue',
  },
  {
    hex: '#533a7b',
    name: 'Tekhelet',
  },
  {
    hex: '#4b244a',
    name: 'Violet',
  },
  {
    hex: '#25171a',
    name: 'Licorice',
  }
] as const

export type BubbleColour = typeof bubbleColours[number];
export type ColourName = BubbleColour['name'];
export interface BubbleProps {
  colour: ColourName
}

export default function Bubble(props: BubbleProps): JSX.Element {
  return (
    <div
      className={`rounded-full prose-hm min-h-[15px] min-w-[15px] max-h-[15px] max-w-[15px]`}
      style={{ backgroundColor: bubbleColours.find((bubbleColour) => bubbleColour.name === props.colour)?.hex }}
    />
  )
}
