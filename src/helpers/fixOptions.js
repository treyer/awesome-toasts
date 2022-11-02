import { arrayToString } from '@helpers/arrayToString.js'

const validOptionKeys = [
  'lifeTime',
  'showFrom',
  'hideTo',
  'type',
  'fontColor',
  'iconColor',
  'bgColor',
  'padding',
  'margin',
  'animationType',
]

export const fixOptions = obj => {
  const wrongKeys = []
  Object.keys(obj).forEach(key => {
    if (!validOptionKeys.includes(key)) {
      wrongKeys.push(key)
      delete obj[key]
    }
  })
  if (wrongKeys.length > 0) {
    const text =
      wrongKeys.length === 1 ? 'option key' : 'options keys'
    console.error(
      `Unsupported ${text}: ${arrayToString(
        wrongKeys,
      )}. Available keys: ${arrayToString(
        validOptionKeys,
      )}`,
    )
  }
  return obj
}
