// Loading.stories.tsx
import React from 'react';
import { Story, Meta } from '@storybook/react';

import Loading from './Loading';

export default {
  title: 'Example/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Define any props here if your component accepts any
  // For this example, there are no props to pass
};
