import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import Subtask, { type SubtaskProps } from './Subtask';
import { colors } from '~/styles';

const meta = {
  component: Subtask,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Subtask>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    checked: true,
    onDelete: (): void => { console.log("onDelete") },
    editing: false,
    setText: (): void => { console.log("setText") },
    setChecked: (): void => { console.log("setChecked") },
    text: "text"
  },
  render: function Render(args: SubtaskProps): JSX.Element {
    const [{ checked, text }, updateArgs] = useArgs<SubtaskProps>();
    return (
      <Subtask
        {...args}
        checked={checked}
        text={text}
        setText={(text: string) => { updateArgs({ text }) }}
        setChecked={(checked: boolean) => {
          updateArgs({ checked });
        }}
      />
    )
  }
};

export const LightEditing: Story = {
  args: {
    onDelete: (): void => { console.log("onDelete") },
    checked: true,
    setText: (): void => { console.log("setText") },
    editing: true,
    setChecked: (): void => { console.log("setChecked") },
    text: "text"
  },
  render: function Render(args: SubtaskProps): JSX.Element {
    const [{ checked, text }, updateArgs] = useArgs<SubtaskProps>();
    return (
      <Subtask
        {...args}
        checked={checked}
        text={text}
        setText={(text: string) => { updateArgs({ text }) }}
        setChecked={(checked: boolean) => {
          updateArgs({ checked });
        }}
      />
    )
  }
};

export const Dark: Story = {
  args: {
    onDelete: (): void => { console.log("onDelete") },
    setText: (): void => { console.log("setText") },
    checked: true,
    editing: false,
    setChecked: (): void => { console.log("setChecked") },
    text: "text"
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: colors.darkGray }]
    }
  },
  render: function Render(args: SubtaskProps): JSX.Element {
    const [{ checked, text }, updateArgs] = useArgs<SubtaskProps>();
    return (
      <div className='dark'>
        <Subtask
          {...args}
          checked={checked}
          text={text}
          setText={(text: string) => { updateArgs({ text }) }}
          setChecked={(checked: boolean) => {
            updateArgs({ checked });
          }}
        />
      </div>
    )
  }
};
export const DarkEditing: Story = {
  args: {
    checked: true,
    editing: true,
    onDelete: (): void => { console.log("onDelete") },
    setText: (): void => { console.log("setText") },
    setChecked: (): void => { console.log("setChecked") },
    text: "text"
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: colors.darkGray }]
    }
  },
  render: function Render(args: SubtaskProps): JSX.Element {
    const [{ checked, text }, updateArgs] = useArgs<SubtaskProps>();
    return (
      <div className='dark'>
        <Subtask
          {...args}
          text={text}
          setText={(text: string) => { updateArgs({ text }) }}
          checked={checked}
          setChecked={(checked: boolean) => {
            updateArgs({ checked });
          }}
        />
      </div>
    )
  }
};
