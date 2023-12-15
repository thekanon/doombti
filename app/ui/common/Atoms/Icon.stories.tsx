// Icon.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import Icon from "./Icon";

export default {
  title: "MBTI/Icon",
  tags: ["autodocs"],
  component: Icon,
  argTypes: {
    type: {
      description: "email, username, password, phone",
      control: "text",
    },
    theme: {
      description: "light, dark",
      control: "text",
    },
  },
} as Meta;

const Template: Story<{ type: string; theme: string }> = (args) => (
  <Icon {...args} />
);

export const LightThemeEmail = Template.bind({});
LightThemeEmail.args = {
  type: "email",
  theme: "light",
};

export const DarkThemePassword = Template.bind({});
DarkThemePassword.args = {
  type: "username",
  theme: "dark",
};
