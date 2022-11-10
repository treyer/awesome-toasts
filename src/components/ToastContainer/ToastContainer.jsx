import React, { useEffect } from 'react'
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
import toaster from '@/ToastService.js'

function ToastContainer({ position, rootId }) {
  let rootElement = document.getElementById(rootId)
  if (!rootElement) rootElement = createRootElement(rootId)

  useEffect(() => {
    toaster.updateRenderRoot()
  }, [])

  useEffect(() => {
    toaster.setContainerPosition(position)
    return () => toaster.setContainerPosition(null)
  }, [position])

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
  position: PropTypes.oneOf(Object.values(POSITION_TYPE)),
  rootId: PropTypes.string,
}

ToastContainer.defaultProps = {
  position: POSITION_TYPE.TOP_RIGHT,
  rootId: ROOT_ID,
}

export default ToastContainer
