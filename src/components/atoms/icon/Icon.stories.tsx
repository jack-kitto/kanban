import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Icon, type IconProps } from './Icon';
import { colors } from '~/styles';

export default {
  component: Icon,
  parameters: {
    layout: 'centered',
    backgrounds: {
      values: [
        {
          value: colors.linesLight,
        },
      ],
    },
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<IconProps> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: "SaveAlt",
};
