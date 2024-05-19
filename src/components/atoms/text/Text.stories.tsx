import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";

const meta: Meta = {
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<typeof Text>;

export const HeadingXL: Story = {
  args: {
    type: "hxl",
    text: "Heading XL",
  },
}

export const HeadingL = {
  args: {
    type: "hl",
    text: "Heading L",
  },
}

export const HeadingM = {
  args: {
    type: "hm",
    text: "Heading M",
  },
}

export const HeadingS = {
  args: {
    type: "hs",
    text: "Heading S",
  },
}

export const BodyL = {
  args: {
    type: "bl",
    text: "BodyL",
  },
}

export const BodyM = {
  args: {
    type: "bm",
    text: "BodyM",
  },
}
