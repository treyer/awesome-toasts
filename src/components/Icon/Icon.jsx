import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from './components'

import { ICONS } from '@constants/icons.js'
import { TOAST_TYPE } from '@constants/toastTypes.js'

function Icon({ type }) {
  return (
    <Wrapper type={type}>
      <path d={ICONS[type]} />
    </Wrapper>
  )
}

Icon.propTypes = {
  type: PropTypes.oneOf([
    TOAST_TYPE.DEFAULT,
    TOAST_TYPE.INFO,
    TOAST_TYPE.SUCCESS,
    TOAST_TYPE.DANGER,
    TOAST_TYPE.WARNING,
  ]).isRequired,
}

export default Icon
