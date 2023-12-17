import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProgressBar, { ProgressBarProps } from './ProgressBar';

export default {
  title: 'Example/ProgressBar',
  tags: ['autodocs'],
  component: ProgressBar,
  argTypes: {
    percentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      defaultValue: 50,
      description: 'The progress percentage',
    },
    color: {
      control: 'color',
      defaultValue: 'black',
      description: 'The color of the progress bar',
    },
  },
} as Meta;

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  percentage: 50,
  color: 'black',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  percentage: 75,
  color: '#4caf50', // Example of a green progress bar
};
