import styled from 'styled-components'

export const Wrapper = styled.svg`
  position: absolute;
  top: -2px;
  right: -18px;

  width: 50px;
  height: 50px;

  fill: ${({ iconColor }) => iconColor};
`
