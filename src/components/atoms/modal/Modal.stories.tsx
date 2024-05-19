import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Modal, type ModalProps } from './Modal';
import Button from '../button/Button';

const meta = {
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    children: <div className="bg-red p-12"></div>,
    close: (): void => { console.log("close") }
  },
  render: function Render(args: ModalProps): JSX.Element {
    const [{ open }, updateArgs] = useArgs<ModalProps>();
    return (
      <div className="dark">
        <Modal
          {...args}
          open={open}
          close={(): void => updateArgs({ open: false })}
        >
          <div className="bg-red p-12 flex justify-center">
            <Button btn={{ onClick: () => updateArgs({ open: false }) }} type="secondary" text="Close" />
          </div>
        </Modal>
        <Button btn={{ onClick: () => updateArgs({ open: !open }) }} type="primary" text="Open Modal" />
      </div>
    )
  }
};
