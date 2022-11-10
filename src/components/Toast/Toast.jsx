import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon/Icon.jsx'
import {
  Body,
  Header,
  IconWrapper,
  MainWrapper,
  RemoveButton,
  ToastInner,
  ToastWrapper,
} from './components'

import toaster from '@/ToastService.js'
import { getPositionX } from '@helpers/getPositionX.js'
import { TOAST_TYPE } from '@constants/toastTypes.js'
import {
  ANIMATION_TYPES,
  CUBIC_BEZIER_FN,
} from '@constants/animationTypes.js'
import { OFFSET_TO_REMOVE } from '@constants/common.js'
import { DIRECTIONS } from '@constants/directions.js'
import { ANIMATION_DIRECTIONS } from '@constants/animationDirections.js'

function Toast({
  id,
  text,
  headerText,
  type,
  bgColor,
  fontColor,
  iconColor,
  margin,
  padding,
  animationName,
  animationType,
  animationDirection,
}) {
  const [isOnDrag, setIsOnDrag] = useState(false)
  const [positionDiff, setPositionDiff] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const initialPositionX = useRef(null)
  const isOnRemove = useRef(false)

  const handleRemoveToast = () => {
    toaster.initRemove(id)
  }

  const initDragToRemove = event => {
    setIsOnDrag(true)
    initialPositionX.current = getPositionX(event)
  }

  const updateDragToRemove = event => {
    event.preventDefault()
    if (isOnDrag && !isOnRemove.current) {
      const diff =
        getPositionX(event) - initialPositionX.current
      if (Math.abs(diff) >= OFFSET_TO_REMOVE) {
        isOnRemove.current = true
        toaster.removeToast(id)
      }
      setPositionDiff(diff)
      let opacity = 1 - Math.abs(diff) / OFFSET_TO_REMOVE
      if (opacity < 0) opacity = 0
      setOpacity(opacity)
    }
  }

  const resetDragToRemove = () => {
    setIsOnDrag(false)
    setPositionDiff(0)
    setOpacity(1)
    initialPositionX.current = null
  }

  return (
    <ToastWrapper
      animationName={animationName}
      animationType={animationType}
      animationDirection={animationDirection}
      bgColor={bgColor}
      fontColor={fontColor}
      margin={margin}
      positionDiff={positionDiff}
      opacity={opacity}
      onMouseDown={initDragToRemove}
      onTouchStart={initDragToRemove}
      onMouseMove={updateDragToRemove}
      onTouchMove={updateDragToRemove}
      onMouseUp={resetDragToRemove}
      onMouseLeave={resetDragToRemove}
      onTouchEnd={resetDragToRemove}>
      <ToastInner padding={padding}>
        <IconWrapper>
          <Icon type={type} iconColor={iconColor} />
        </IconWrapper>
        <MainWrapper>
          {headerText && <Header>{headerText}</Header>}
          <Body>{text}</Body>
        </MainWrapper>
      </ToastInner>
      <RemoveButton onClick={handleRemoveToast}>
        ×
      </RemoveButton>
    </ToastWrapper>
  )
}

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  headerText: PropTypes.string,
  type: PropTypes.oneOf(Object.values(TOAST_TYPE))
    .isRequired,
  bgColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  animationName: PropTypes.oneOf(DIRECTIONS).isRequired,
  animationType: PropTypes.oneOf([
    ANIMATION_TYPES.EASE,
    ANIMATION_TYPES.EASE_IN,
    ANIMATION_TYPES.EASE_OUT,
    ANIMATION_TYPES.EASE_IN_OUT,
    ANIMATION_TYPES.LINEAR,
    CUBIC_BEZIER_FN,
  ]).isRequired,
  animationDirection: PropTypes.oneOf(
    Object.values(ANIMATION_DIRECTIONS),
  ),
}

export default Toast
