import React from 'react'

import { Wrapper } from './components'

import { ICONS } from '@constants/icons.js'

function Icon({ type }) {
  return (
    <Wrapper type={type}>
      <path d={ICONS[type]} />
    </Wrapper>
  )
}

export default Icon
