import { POSITION_TYPE } from '@constants/positions'
import { HIDE_TO, SHOW_FROM } from '@constants/directions'

export const getDefaultDirections = containerPosition => {
  switch (containerPosition) {
    case POSITION_TYPE.TOP_RIGHT:
    case POSITION_TYPE.BOTTOM_RIGHT:
      return [SHOW_FROM.RIGHT, HIDE_TO.RIGHT]
    case POSITION_TYPE.TOP_LEFT:
    case POSITION_TYPE.BOTTOM_LEFT:
      return [SHOW_FROM.LEFT, HIDE_TO.LEFT]
    case POSITION_TYPE.TOP_CENTER:
      return [SHOW_FROM.TOP, HIDE_TO.TOP]
    case POSITION_TYPE.BOTTOM_CENTER:
      return [SHOW_FROM.BOTTOM, HIDE_TO.BOTTOM]
    default:
      return [SHOW_FROM.RIGHT, HIDE_TO.RIGHT]
  }
}
