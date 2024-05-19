import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import EditableCheckboxInput, { type EditableCheckboxInputProps } from './EditableCheckboxInput';
import { colors } from '~/styles';

const meta = {
  component: EditableCheckboxInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditableCheckboxInput>;

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
  render: function Render(args: EditableCheckboxInputProps): JSX.Element {
    const [{ checked, text }, updateArgs] = useArgs<EditableCheckboxInputProps>();
    return (
      <EditableCheckboxInput
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
  render: function Render(args: EditableCheckboxInputProps): JSX.Element {
    const [{ checked, text }, updateArgs] = useArgs<EditableCheckboxInputProps>();
    return (
      <EditableCheckboxInput
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
  render: function Render(args: EditableCheckboxInputProps): JSX.Element {
    const [{ checked, text }, updateArgs] = useArgs<EditableCheckboxInputProps>();
    return (
      <div className='dark'>
        <EditableCheckboxInput
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
  render: function Render(args: EditableCheckboxInputProps): JSX.Element {
    const [{ checked, text }, updateArgs] = useArgs<EditableCheckboxInputProps>();
    return (
      <div className='dark'>
        <EditableCheckboxInput
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
