import React from 'react'

import Toast from '@components/Toast/Toast.jsx'
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary.jsx'

import { ANIMATION_DIRECTIONS } from '@constants/animationDirections.js'
import { TOAST_STATES } from '@constants/toastStates.js'

export const hydrateToasts = toasts => {
  return (
    <ErrorBoundary>
      {toasts.map(toast => {
        const { lifeTime, showFrom, hideTo, ...rest } =
          toast.options

        return (
          <Toast
            key={toast.id}
            id={toast.id}
            headerText={toast.headerText}
            text={toast.text}
            animationName={
              toast.state === TOAST_STATES.INIT
                ? showFrom
                : hideTo
            }
            animationDirection={
              toast.state === TOAST_STATES.INIT
                ? ANIMATION_DIRECTIONS.NORMAL
                : ANIMATION_DIRECTIONS.REVERSE
            }
            {...rest}
          />
        )
      })}
    </ErrorBoundary>
  )
}
