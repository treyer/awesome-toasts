import { TOAST_STATE } from '@constants/toastStates'
import { getDefaultDirections } from '@helpers/getDefaultDirections'

const validOptionKeys = [
  'lifeTime',
  'showFrom',
  'hideTo',
  'backgroundColor',
]

const methodSignature =
  'addToast(toastText [, toastHeader [, optionsObject]])'

export const getToastSettings = (
  args,
  containerPosition,
) => {
  const [showFrom, hideTo] = getDefaultDirections(
    containerPosition,
  )

  const defaultOptions = {
    lifeTime: 0,
    toastState: TOAST_STATE.WILL_APPEAR,
    showFrom,
    hideTo,
  }

  args = args.slice(0, 4)
  if (args.length === 0) {
    console.error(
      `Toast text is required. ${methodSignature}`,
    )
    return null
  }
  if (
    (args.length === 1 && typeof args[0] !== 'string') ||
    (args.length === 2 &&
      !(
        typeof args[0] === 'string' &&
        (typeof args[1] === 'string' || isObject(args[1]))
      )) ||
    (args.length === 3 &&
      !(
        typeof args[0] === 'string' &&
        typeof args[1] === 'string' &&
        isObject(args[2])
      ))
  ) {
    console.error(`Wrong arguments. ${methodSignature}`)
    return null
  }
  if (args.length === 1) {
    return {
      headerText: null,
      text: args[0],
      options: defaultOptions,
    }
  }
  if (args.length === 2) {
    return {
      headerText:
        typeof args[1] === 'string' ? args[1] : null,
      text: args[0],
      options: isObject(args[1])
        ? { ...defaultOptions, ...fixOptions(args[1]) }
        : defaultOptions,
    }
  }
  if (args.length === 3) {
    return {
      headerText: args[1],
      text: args[0],
      options: {
        ...defaultOptions,
        ...fixOptions(args[2]),
      },
    }
  }
}

const isObject = value => {
  return value !== null && typeof value === 'object'
}

const fixOptions = obj => {
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

const arrayToString = arr => {
  return arr.reduce(
    (res, el, index) =>
      (res += index !== 0 ? `, "${el}"` : `"${el}"`),
    '',
  )
}
