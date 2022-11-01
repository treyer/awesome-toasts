import React, {
  useState,
  useLayoutEffect,
  useEffect,
} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { ContainerWrapper } from './components'
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary.jsx'

import {
  ROOT_CONTAINER_ID,
  ROOT_ID,
} from '@constants/common.js'
import { createRootElement } from '@helpers/createRootElement.js'
import { POSITION_TYPE } from '@constants/positions.js'
import toaster from '@/ToastService.jsx'

function ToastContainer({ position, rootId }) {
  const [rootElement, setRootElement] = useState(null)

  useEffect(() => {
    toaster.setContainerPosition(position)
    return () => toaster.setContainerPosition(null)
  }, [])

  useLayoutEffect(() => {
    let element = document.getElementById(rootId)
    let systemCreated = false

    if (!element) {
      systemCreated = true
      element = createRootElement(rootId)
    }
    setRootElement(element)

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [rootId])

  if (rootElement === null) return null

  return ReactDOM.createPortal(
    <ErrorBoundary>
      <ContainerWrapper
        id={ROOT_CONTAINER_ID}
        data-position={position}
      />
    </ErrorBoundary>,
    rootElement,
  )
}

ToastContainer.propTypes = {
  position: PropTypes.oneOf([
    POSITION_TYPE.TOP_RIGHT,
    POSITION_TYPE.TOP_CENTER,
    POSITION_TYPE.TOP_LEFT,
    POSITION_TYPE.BOTTOM_RIGHT,
    POSITION_TYPE.BOTTOM_CENTER,
    POSITION_TYPE.BOTTOM_LEFT,
  ]),
  rootId: PropTypes.string,
}

ToastContainer.defaultProps = {
  position: POSITION_TYPE.TOP_RIGHT,
  rootId: ROOT_ID,
}

export default ToastContainer
