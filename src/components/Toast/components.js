import styled from 'styled-components'

export const ToastWrapper = styled.div`
  position: relative;

  width: 250px;
  min-height: 50px;
  margin: ${({ margin }) => margin};

  border: 1px solid #d0d0d0;
  border-radius: 10px;
  background-color: ${({ bgColor }) => bgColor};
  box-shadow: 0px 4px 24px -8px rgba(0, 0, 0, 0.75);

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
  top: 3px;
  right: 6px;

  font-size: 15px;

  cursor: pointer;

  &:hover {
    font-weight: 900;
    font-size: 20px;
    top: 0;
    right: 6px;
  }
`

export const ToastInner = styled.div`
  display: flex,
  flex-direction: column;

  padding: ${({ padding }) => padding};
`

export const Header = styled.div`
  position: relative;
  font-weight: 700;
  margin-bottom: 5px;

  &::after {
    content: ' ';
    position: absolute;
    bottom: -3px;
    right: 0px;
    width: 100%;
    height: 2px;
    background-color: #b8b8b8;
    opacity: 0.4;
  }
`

export const Body = styled.div``
