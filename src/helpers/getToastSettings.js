import { TOAST_STATE } from '@constants/toastStates'
import { getDefaultDirections } from '@helpers/getDefaultDirections'

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
        ? { ...defaultOptions, ...args[1] }
        : defaultOptions,
    }
  }
  if (args.length === 3) {
    return {
      headerText: args[1],
      text: args[0],
      options: { ...defaultOptions, ...args[2] },
    }
  }
}

const isObject = value => {
  return value !== null && typeof value === 'object'
}
