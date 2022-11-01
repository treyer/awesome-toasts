import React from 'react'

import Toast from '@components/Toast/Toast'

import { TOAST_TYPE } from '@constants/toastTypes'
import { SHOW_FROM, HIDE_TO } from '@constants/directions'
import { POSITION_TYPE } from '@constants/positions'
import {
  ANIMATION_TYPES,
  CUBIC_BEZIER_FN,
} from '@constants/animationTypes'
import ToastContainer from '@components/ToastContainer/ToastContainer'
import toaster from '@/ToastService.jsx'

export default {
  title: 'Components/Toast',
  component: Toast,
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
    id: {
      table: {
        disable: true,
      },
    },
    toastState: {
      table: {
        disable: true,
      },
    },
    text: {
      control: { type: 'text' },
    },
    headerText: {
      control: { type: 'text' },
    },
    type: {
      options: [
        TOAST_TYPE.DEFAULT,
        TOAST_TYPE.INFO,
        TOAST_TYPE.SUCCESS,
        TOAST_TYPE.DANGER,
        TOAST_TYPE.WARNING,
      ],
      control: { type: 'select' },
    },
    lifeTime: {
      control: { type: 'number' },
    },
    showFrom: {
      options: [
        SHOW_FROM.LEFT,
        SHOW_FROM.RIGHT,
        SHOW_FROM.TOP,
        SHOW_FROM.BOTTOM,
      ],
      control: { type: 'select' },
    },
    hideTo: {
      options: [
        HIDE_TO.LEFT,
        HIDE_TO.RIGHT,
        HIDE_TO.TOP,
        HIDE_TO.BOTTOM,
      ],
      control: { type: 'select' },
    },
    bgColor: {
      control: { type: 'color' },
    },
    margin: {
      control: { type: 'text' },
    },
    padding: {
      control: { type: 'text' },
    },
    animationType: {
      options: [
        ANIMATION_TYPES.EASE,
        ANIMATION_TYPES.EASE_IN,
        ANIMATION_TYPES.EASE_OUT,
        ANIMATION_TYPES.EASE_IN_OUT,
        ANIMATION_TYPES.LINEAR,
        ANIMATION_TYPES.STEP_START,
        ANIMATION_TYPES.STEP_END,
        CUBIC_BEZIER_FN,
      ],
      control: { type: 'select' },
    },
  },
}

const Template = ({
  position,
  text,
  headerText,
  ...rest
}) => {
  if (rest.bgColor && rest.bgColor.length === 0) {
    delete rest.bgColor
  }

  const showToast = () => {
    toaster.addToast(text, headerText, { ...rest })
  }
  return (
    <>
      <button onClick={showToast}>Show Toast</button>
      <ToastContainer position={position} />
    </>
  )
}

export const Simple = Template.bind({})

Simple.args = {
  text: 'Some text',
  headerText: 'Some header',
  type: TOAST_TYPE.DEFAULT,
  lifeTime: 0,
  showFrom: SHOW_FROM.LEFT,
  hideTo: HIDE_TO.RIGHT,
  margin: '5',
  padding: '5',
  animationType: ANIMATION_TYPES.EASE_IN_OUT,
  position: POSITION_TYPE.TOP_RIGHT,
}
