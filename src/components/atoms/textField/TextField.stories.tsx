import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import TextField, { TextFieldProps } from './TextField';
import { z } from 'zod';
import { colors } from '~/styles';

const meta = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ["autodocs"]
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    text: "text",
    label: "label",
    setText: (): void => { },
    schema: z.string().min(1).max(10),
    placeholder: "placeholder",
    validationErrors: [
      {
        message: "Can't be empty",
        schema: z.string().min(1),
        active: false
      }
    ]
  },
  render: function Render(args: TextFieldProps): JSX.Element {
    const [{ text }, updateArgs] = useArgs();
    return (
      <TextField {...args} text={text} setText={(text: string) => { updateArgs({ text }) }} />
    )
  }
};
export const Dark: Story = {
  args: {
    text: "text",
    setText: (): void => { },
    label: "label",
    placeholder: "placeholder",
    schema: z.string().min(1).max(10),
    validationErrors: [
      {
        message: "Can't be empty",
        schema: z.string().min(1),
        active: false
      }
    ]
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: colors.darkGray }]
    }
  },
  render: function Render(args: TextFieldProps): JSX.Element {
    const [{ text }, updateArgs] = useArgs();
    return (
      <div className='dark'>
        <TextField {...args} text={text} setText={(text: string) => { updateArgs({ text }) }} />
      </div>
    )
  }
};
