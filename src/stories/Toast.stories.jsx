import React from 'react'

import Toast from '../components/Toast/Toast'

export default {
  title: 'Components/Toast',
  component: Toast,
}

const Template = args => <Toast {...args} />

export const Simple = Template.bind({})

Simple.args = {
  text: 'Some text',
}
