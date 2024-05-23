import type { Meta, StoryObj } from "@storybook/react"
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
  }
}

export const Disabled: Story = {
  args: {
    text: "Disabled",
    type: "primary",
    disabled: true,
  }
}
export const Secondary: Story = {
  args: {
    text: "Secondary",
    type: "secondary",
  }
}


export const Destructive: Story = {
  args: {
    text: "Destructive",
    type: "destructive",
  }
}

export const Login: Story = {
  args: {
    text: "Login",
    type: "login",
  }
}
