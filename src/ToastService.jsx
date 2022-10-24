import React from 'react'
import ReactDOM from 'react-dom/client'
import { v4 as uuid } from 'uuid'

import Toast from './components/Toast/Toast'

import { ROOT_CONTAINER_ID } from './constants/common'

class ToastService {
  constructor() {
    this.toasts = []
    this.queue = []
    this.renderRoot = null
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ToastService()
    }
    return this.instance
  }

  getToasts() {
    return this.toasts
  }

  addToast(text) {
    this.toasts.push({
      id: uuid(),
      text,
    })
    this.renderToasts(this.hydrateToasts(this.toasts))
  }

  removeToast(toastId) {
    this.toasts = this.toasts.filter(
      el => el.id !== toastId,
    )
    this.renderToasts(this.hydrateToasts(this.toasts))
  }

  hydrateToasts(toasts) {
    return toasts.map(toast => {
      return (
        <Toast
          key={toast.id}
          id={toast.id}
          text={toast.text}
        />
      )
    })
  }

  renderToasts(hydratedToasts) {
    if (this.renderRoot === null) {
      this.renderRoot = ReactDOM.createRoot(
        document.getElementById(ROOT_CONTAINER_ID),
      )
    }
    this.renderRoot.render(hydratedToasts)
  }

  dropRenderRoot() {
    this.renderRoot = null
    this.toasts = []
  }
}

const toaster = ToastService.getInstance()

export default toaster
