import React from 'react'

function ToastContainerInner({ toasts }) {
  return <React.Fragment>{toasts.map(el => el.toast)}</React.Fragment>
}

export default ToastContainerInner
