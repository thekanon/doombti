// ButtonComponent.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import ButtonComponent, { ButtonComponentProps } from "./ButtonComponent";

export default {
  title: "MBTI/ButtonComponent",
  tags: ["autodocs"],
  component: ButtonComponent,
  argTypes: {
    colorType: {
      control: {
        type: "select",
        options: ["primary", "secondary", "additional"],
      },
    },
    styleType: {
      control: {
        type: "select",
        options: ["filled", "rounded", "icon"],
      },
    },
    iconStyle: {
      control: {
        type: "select",
        options: ["default", "facebook", "apple", "google"],
      },
    },
    state: {
      control: { type: "select", options: ["active", "disabled"] },
    },
    theme: {
      control: { type: "select", options: ["dark", "light"] },
    },
    text: {
      control: "text",
    },
  },
} as Meta;

const Template: Story<ButtonComponentProps> = (args) => (
  <ButtonComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  colorType: "primary",
  styleType: "filled",
  iconStyle: "apple",
  state: "active",
  text: "Primary Button",
};

// Add more stories here for each variation of your button
