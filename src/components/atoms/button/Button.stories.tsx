import { Meta, StoryObj } from "@storybook/react"
import Button from "./Button"

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    text: "Primary",
    type: "primary",
    btn: {
      onClick: () => { },
    }
  }
}

export const Secondary: Story = {
  args: {
    text: "Secondary",
    type: "secondary",
    btn: {
      onClick: () => { },
    }
  }
}


export const Destructive: Story = {
  args: {
    text: "Destructive",
    type: "destructive",
    btn: {
      onClick: () => { },
    }
  }
}
