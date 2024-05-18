import type { Meta, StoryObj } from '@storybook/react';

import { Confirmation } from './Confirmation';
import { colors } from '~/styles';

const meta = {
  component: Confirmation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
} satisfies Meta<typeof Confirmation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    title: "title",
    message: "message",
    confirmText: "confirmText",
    cancelText: "cancelText",
    onConfirm: () => { },
    onCancel: () => { }
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: colors.linesLight }],
    },
  },
};

export const Dark: Story = {
  args: {
    title: "title",
    message: "message",
    confirmText: "confirmText",
    cancelText: "cancelText",
    onConfirm: () => { },
    onCancel: () => { }
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: colors.darkGray }],
    },
  },
  render: (args) => (

    <div className='dark'>
      <Confirmation {...args} />
    </div>
  )
};
