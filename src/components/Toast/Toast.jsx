import React from 'react'
import PropTypes from 'prop-types'

import { RemoveButton, ToastWrapper } from './components'

import toaster from '../../ToastService'

function Toast({ id, text }) {
  const handleRemoveToast = () => {
    toaster.removeToast(id)
  }

  return (
    <ToastWrapper>
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
