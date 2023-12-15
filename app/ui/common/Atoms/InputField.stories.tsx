import type { Meta, StoryObj } from "@storybook/react";
import { InputField, InputProps } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "MBTI/Input",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["active", "fill", "default"],
    },
    type: {
      control: "select",
      options: [
        "default",
        "code",
        "username",
        "email",
        "password",
        "normal",
        "phone",
      ],
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    status: "default",
    type: "email",
    theme: "light",
  },
};

export const DarkTheme: Story = {
  args: {
    status: "default",
    type: "email",
    theme: "dark",
  },
};

export const activeStatus: Story = {
  args: {
    status: "active",
    type: "username",
    theme: "light",
  },
};
