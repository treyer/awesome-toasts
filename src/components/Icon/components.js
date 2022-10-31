import styled from 'styled-components'

import { TOAST_TYPE } from '@constants/toastTypes.js'

export const Wrapper = styled.svg`
  position: absolute;
  top: -2px;
  right: -18px;

  width: 50px;
  height: 50px;

  fill: ${({ type }) =>
    type === TOAST_TYPE.DEFAULT ? '#d3d3d3' : '#ffffff'};
`
