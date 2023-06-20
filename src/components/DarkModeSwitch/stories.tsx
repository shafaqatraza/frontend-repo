import { Story, Meta } from "@storybook/react";

import DarkModeSwitch from ".";

export default {
  title: "DarkModeSwitch",
  component: DarkModeSwitch,
} as Meta;

export const Default: Story = (args) => <DarkModeSwitch {...args} />;
