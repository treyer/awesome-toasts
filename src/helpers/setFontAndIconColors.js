import {
  FONT_COLORS,
  ICON_COLORS,
} from '@constants/colors.js'

export const setFontAndIconColors = options => {
  if (!('fontColor' in options)) {
    options.fontColor = FONT_COLORS[options.type]
  }
  if (!('iconColor' in options)) {
    options.iconColor = ICON_COLORS[options.type]
  }
  return options
}
