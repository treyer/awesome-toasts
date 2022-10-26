import styled from 'styled-components'

export const ToastWrapper = styled.div`
  position: relative;

  width: 250px;
  height: 50px;
  border: 1px solid black;
  border-radius: 10px;
  transition: transform 250ms ease-in-out;

  &.hidden {
    transform: translateX(-120%);
  }
`

export const RemoveButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  cursor: pointer;
`
