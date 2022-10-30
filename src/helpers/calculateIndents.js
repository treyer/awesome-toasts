import { INDENTS } from '@constants/indents'
import { arrayToString } from '@helpers/arrayToString'

export const setIndents = options => {
  if (options.margin) {
    options.margin = calculateIndents(
      'margin',
      options.margin,
    )
  }
  if (options.padding) {
    options.padding = calculateIndents(
      'padding',
      options.padding,
    )
  }
  return options
}

const calculateIndents = (optionName, optionValue) => {
  const args = optionValue
    .split(' ')
    .filter(el => el.length > 0)

  let isCorrectValue = true
  args.forEach(el => {
    if (
      !(
        Number.isInteger(+el) || el.toUpperCase() in INDENTS
      )
    ) {
      isCorrectValue = false
    }
  })
  if (!isCorrectValue) {
    console.error(
      `Incorrect indents value "${optionValue}" in "${optionName}" option. ` +
        `Only integer numbers and constants ${arrayToString(
          Object.keys(INDENTS).map(el =>
            el.toLowerCase(),
          ),
        )} available`,
    )
    return `${INDENTS.SM}px`
  }

  return args
    .map(el =>
      el.toUpperCase() in INDENTS
        ? INDENTS[el.toUpperCase()]
        : el,
    )
    .map(el => (el += 'px'))
    .join(' ')
}
