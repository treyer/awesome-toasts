import { TOAST_TYPE_COLORS } from '@constants/colors.js'

export const setBgColor = options => {
  if (!('bgColor' in options) && 'type' in options) {
    options.bgColor = TOAST_TYPE_COLORS[options.type]
  }
  return options
}
