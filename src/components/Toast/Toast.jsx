import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { RemoveButton, ToastWrapper } from './components'

import toaster from '../../ToastService'
import { TOAST_STATE } from '../../constants/toastStates'

function Toast({ id, text, toastState }) {
  const [isHidden, setIsHidden] = useState(
    toastState === TOAST_STATE.WILL_APPEAR,
  )
  const [isRemoving, setIsRemoving] = useState(false)

  useEffect(() => {
    if (isHidden) {
      const timer = setTimeout(() => {
        setIsHidden(false)
        toaster.setToastStatus(id, TOAST_STATE.SHOWN)
      }, 250)
      return () => clearTimeout(timer)
    }
  })

  useEffect(() => {
    if (isRemoving) {
      const timer = setTimeout(() => {
        toaster.removeToast(id)
      }, 250)
      return () => clearTimeout(timer)
    }
  })

  const handleRemoveToast = () => {
    setIsHidden(true)
    setIsRemoving(true)
  }

  return (
    <ToastWrapper className={isHidden && 'hidden'}>
      {text}
      <RemoveButton onClick={handleRemoveToast}>
        ×
      </RemoveButton>
    </ToastWrapper>
  )
}

Toast.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
}

export default Toast
