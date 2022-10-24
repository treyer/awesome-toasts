import React, { useState } from 'react'

import ToastContainer from '../ToastContainer/ToastContainer'

function Test() {
  const [isContainerShown, setIsContainerShown] =
    useState(true)

  const handleShowContainer = () => {
    setIsContainerShown((prev) => !prev)
  }

  return (
    <>
      <button onClick={handleShowContainer}>
        Show/Hide container
      </button>
      {isContainerShown && <ToastContainer />}
    </>
  )
}

export default Test
