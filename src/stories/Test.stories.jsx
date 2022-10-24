import React from 'react'

import Test from '../components/Test/Test'

import { POSITION_TYPE } from '../constants/positions'

export default {
  title: 'Test/Test',
  component: Test,
  argTypes: {
    position: {
      options: [
        POSITION_TYPE.TOP_LEFT,
        POSITION_TYPE.TOP_CENTER,
        POSITION_TYPE.TOP_RIGHT,
        POSITION_TYPE.BOTTOM_LEFT,
        POSITION_TYPE.BOTTOM_CENTER,
        POSITION_TYPE.BOTTOM_RIGHT,
      ],
      control: { type: 'select' },
    },
  },
}

const Template = args => <Test {...args} />

export const Simple = Template.bind({})

Simple.args = {
  position: POSITION_TYPE.TOP_RIGHT,
}
