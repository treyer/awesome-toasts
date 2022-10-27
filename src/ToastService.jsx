import React from 'react'
import ReactDOM from 'react-dom/client'
import { v4 as uuid } from 'uuid'

import Toast from './components/Toast/Toast'

import { ROOT_CONTAINER_ID } from './constants/common'
import { TOAST_STATE } from './constants/toastStates'

class ToastService {
  constructor() {
    this.toasts = []
    this.queue = []
    this.root = null
    this.renderRoot = null
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ToastService()
    }
    return this.instance
  }

  getToastById(toastId) {
    return this.toasts.find(el => el.id === toastId)
  }

  addToast(text, lifeTime = 0) {
    const toast = {
      id: uuid(),
      text,
      lifeTime,
      toastState: TOAST_STATE.WILL_APPEAR,
    }
    if (this.toasts.length < 3) {
      this.toasts.push(toast)
      this.renderToasts(this.hydrateToasts(this.toasts))
    } else {
      this.queue.push(toast)
    }
  }

  addToastFromQueue(toast) {
    this.toasts.push({
      id: toast.id,
      text: toast.text,
      lifeTime: toast.lifeTime,
      toastState: this.toastState,
    })
  }

  removeToast(toastId) {
    this.toasts = this.toasts.filter(
      el => el.id !== toastId,
    )
    if (this.queue.length > 0) {
      this.addToastFromQueue(this.queue.shift())
    }
    this.renderToasts(this.hydrateToasts(this.toasts))
  }

  setToastStatus(toastId, state) {
    this.toasts.map(el => {
      if (el.id === toastId) el.toastState = state
      return el
    })
  }

  hydrateToasts(toasts) {
    return toasts.map(toast => {
      return (
        <Toast
          key={toast.id}
          id={toast.id}
          text={toast.text}
          toastState={toast.toastState}
          lifeTime={toast.lifeTime}
        />
      )
    })
  }

  renderToasts(hydratedToasts) {
    if (!this.root) {
      this.root = document.getElementById(ROOT_CONTAINER_ID)
      this.renderRoot = ReactDOM.createRoot(this.root)
    } else {
      const currentRoot = document.getElementById(
        ROOT_CONTAINER_ID,
      )
      if (currentRoot !== this.root) {
        this.root = currentRoot
        this.renderRoot = ReactDOM.createRoot(this.root)
      }
    }
    this.renderRoot.render(hydratedToasts)
  }
}

const toaster = ToastService.getInstance()

export default toaster
