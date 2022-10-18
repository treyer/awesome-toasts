import React from "react"

import Toast from "../components/Toast"

export default {
  title: "Components/Toast",
  component: Toast,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
}

const Template = args => <Toast {...args} />

export const Red = Template.bind({})

Red.args = {
  backgroundColor: "red",
}
