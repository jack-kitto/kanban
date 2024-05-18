import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import TextField, { TextFieldProps } from './TextField';
import { z } from 'zod';

const meta = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ["autodocs"]
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "text",
    setText: (): void => { },
    schema: z.string().min(1).max(10),
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
    return <TextField {...args} text={text} setText={(text: string) => { updateArgs({ text }) }} />;
  }
};
