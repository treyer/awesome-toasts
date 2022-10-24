import React from 'react'

import Test from '../components/Test/Test'

export default {
  title: 'Test/Test',
  component: Test,
}

const Template = (args) => <Test {...args} />

export const Simple = Template.bind({})

Simple.args = {}
