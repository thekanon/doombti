import React from "react";
import { Story, Meta } from "@storybook/react";

import Swiper from "./Swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";

export default {
  title: "Example/Swiper",
  component: Swiper,
  argTypes: {
    spaceBetween: {
      control: "number",
      description: "Space between slides",
      defaultValue: 30,
    },
    effect: {
      control: "text",
      description: "Transition effect",
      defaultValue: "fade",
    },
    navigation: {
      control: "boolean",
      description: "Enable navigation",
      defaultValue: true,
    },
    pagination: {
      control: "object",
      description: "Pagination configuration",
      defaultValue: {
        clickable: true,
      },
    },
    modules: {
      control: "array",
      description: "Modules to be used",
      defaultValue: [EffectFade, Navigation, Pagination],
    },
    className: {
      control: "text",
      description: "CSS class for the swiper",
      defaultValue: "mySwiper",
    },
    slides: {
      control: "object",
      description: "Content of the slides",
    },
  },
} as Meta;

// Example slides
const exampleSlides = [
  {
    content: (
      <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
      </div>
    ),
  },
  {
    content: (
      <div style={{ backgroundColor: "lightgreen", padding: "20px" }}>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
      </div>
    ),
  },
  {
    content: (
      <div style={{ backgroundColor: "lightpink", padding: "20px" }}>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
      </div>
    ),
  },
  {
    content: (
      <div style={{ backgroundColor: "lightyellow", padding: "20px" }}>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
      </div>
    ),
  },
];

const Template: Story<typeof Swiper> = (args) => <Swiper {...args} />;

export const Default = Template.bind({});
Default.args = {
  spaceBetween: 30,
  effect: "fade",
  navigation: true,
  pagination: {
    clickable: true,
  },
  modules: [EffectFade, Navigation, Pagination],
  className: "mySwiper",
  slides: exampleSlides,
};
