import styled from 'styled-components'

export const ToastWrapper = styled.div`
  position: relative;

  width: 250px;
  height: 50px;
  margin: ${({ margin }) => margin};

  border: 1px solid black;
  border-radius: 10px;
  background-color: ${({ bgColor }) => bgColor};

  transition: transform 250ms ease-in-out;

  &[data-show='left'].hidden,
  &[data-hide='left'].hidden {
    transform: translateX(-120%);
  }
  &[data-show='right'].hidden,
  &[data-hide='right'].hidden {
    transform: translateX(120%);
  }
  &[data-show='top'].hidden,
  &[data-hide='top'].hidden {
    transform: translateY(-120%);
  }
  &[data-show='bottom'].hidden,
  &[data-hide='bottom'].hidden {
    transform: translateY(120%);
  }
`

export const RemoveButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  cursor: pointer;
`

export const ToastInner = styled.div`
  padding: ${({ padding }) => padding};
`
