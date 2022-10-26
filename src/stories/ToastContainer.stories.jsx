import React from 'react'

import ToastContainer from '../components/ToastContainer/ToastContainer'

import { POSITION_TYPE } from '../constants/positions'

export default {
  title: 'Components/ToastContainer',
  component: ToastContainer,
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

const Template = args => <ToastContainer {...args} />

export const Container = Template.bind({})

Container.args = {
  position: POSITION_TYPE.TOP_RIGHT,
}
