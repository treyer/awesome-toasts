import ReactDOM from 'react-dom/client'
import { v4 as uuid } from 'uuid'

import { getToastSettings } from '@helpers/getToastSettings.js'
import { ROOT_CONTAINER_ID } from '@constants/common.js'
import { ANIMATION_DURATION } from '@constants/common.js'
import { TOAST_STATES } from '@constants/toastStates.js'
import { hydrateToasts } from '@helpers/hydrateToasts.jsx'

class ToastService {
  constructor() {
    this.toasts = []
    this.queue = []
    this.renderRoot = null
    this.containerPosition = null
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

  addToast(...args) {
    const { text, headerText, options } = getToastSettings(
      args,
      this.containerPosition,
    )
    const toast = {
      id: uuid(),
      state: TOAST_STATES.INIT,
      timer: null,
      headerText,
      text,
      options,
    }
    if (this.toasts.length < 3) {
      this.toasts.push(toast)
      this.activateToastTimers(this.toasts)
      this.renderToasts(hydrateToasts(this.toasts))
    } else {
      this.queue.push(toast)
    }
  }

  initRemove(toastId) {
    const toast = this.getToastById(toastId)
    if (toast.state === TOAST_STATES.INIT) {
      toast.state = TOAST_STATES.ON_REMOVE
      if (toast.timer) {
        clearTimeout(toast.timer)
      }
      const timer = setTimeout(() => {
        this.removeToast(toastId)
      }, ANIMATION_DURATION - 50)
      toast.timer = timer
      this.renderToasts(hydrateToasts(this.toasts))
    }
  }

  removeToast(toastId) {
    const toast = this.getToastById(toastId)
    if (toast.timer) {
      clearTimeout(toast.timer)
    }
    this.toasts = this.toasts.filter(
      el => el.id !== toastId,
    )
    if (this.queue.length > 0) {
      this.toasts.push(this.queue.shift())
    }
    this.activateToastTimers(this.toasts)
    this.renderToasts(hydrateToasts(this.toasts))
  }

  activateToastTimers = toasts => {
    toasts.forEach(toast => {
      if (!toast.timer) {
        if (toast.options.lifeTime > 0) {
          const timer = setTimeout(() => {
            this.initRemove(toast.id)
          }, toast.options.lifeTime + ANIMATION_DURATION)
          toast.timer = timer
        }
      }
    })
  }

  renderToasts(hydratedToasts) {
    this.renderRoot.render(hydratedToasts)
  }

  setContainerPosition(position) {
    this.containerPosition = position
  }

  updateRenderRoot() {
    this.renderRoot = ReactDOM.createRoot(
      document.getElementById(ROOT_CONTAINER_ID),
    )
  }
}

const toaster = ToastService.getInstance()

export default toaster
