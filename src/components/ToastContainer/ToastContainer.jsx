import React, { useState } from "react"
import ReactDOM from "react-dom"
import toaster from "../../ToastService"
import ToastContainerInner from "./ToastContainerInner"

function ToastContainer() {
  const [toasts, setToasts] = useState([...toaster.getToasts()])

  const uploadToasts = () => {
    setToasts([...toaster.getToasts()])
  }

  toaster.subscribe(uploadToasts)

  return ReactDOM.createPortal(
    <ul>
      <ToastContainerInner toasts={toasts} />
    </ul>,
    document.getElementById("root1"),
  )
}

export default ToastContainer
