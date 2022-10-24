import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import { ContainerWrapper } from './components'

import {
  ROOT_CONTAINER_ID,
  ROOT_ID,
} from '../../constants/basic'

function ToastContainer() {
  const getRootElement = () => {
    const element = document.getElementById(ROOT_ID)
    if (!element) {
      return createRootElement()
    } else {
      return element
    }
  }

  const createRootElement = () => {
    const rootElement = document.createElement('div')
    rootElement.id = ROOT_ID
    document.body.append(rootElement)
  }

  useEffect(() => {
    const removeRootElement = () => {
      const element = document.getElementById(ROOT_ID)
      if (element) element.remove()
    }

    return removeRootElement
  })

  return ReactDOM.createPortal(
    <ContainerWrapper id={ROOT_CONTAINER_ID} />,
    getRootElement(),
  )
}

export default ToastContainer
