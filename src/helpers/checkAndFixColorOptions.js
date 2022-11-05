import { isCorrectColor } from '@helpers/isCorrectColor.js'
import { TOAST_TYPE_COLORS } from '@constants/colors.js'
import {
  FONT_COLORS,
  ICON_COLORS,
} from '@constants/colors.js'

export const checkAndFixColorOptions = options => {
  const colorOptionsMap = [
    { bgColor: TOAST_TYPE_COLORS },
    { fontColor: FONT_COLORS },
    { iconColor: ICON_COLORS },
  ]
  colorOptionsMap.forEach(colorOption => {
    checkOptionInput(
      options,
      Object.keys(colorOption)[0],
      Object.values(colorOption)[0],
    )
  })
  return options
}

const checkOptionInput = (
  options,
  optionName,
  colorObject,
) => {
  if (!(optionName in options)) {
    options[optionName] = colorObject[options.type]
  } else {
    if (!isCorrectColor(options[optionName])) {
      showErrorMessage(optionName, options[optionName])
      options[optionName] = colorObject[options.type]
    }
  }
}

const showErrorMessage = (optionName, wrongColor) => {
  console.error(
    `Incorrect color value "${wrongColor}" in "${optionName}" option`,
  )
}
