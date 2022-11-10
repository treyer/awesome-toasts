import styled from 'styled-components'

import { ANIMATION_DURATION_IN_SEC } from '@constants/common.js'

export const ToastWrapper = styled.div`
  position: relative;

  width: 320px;
  min-height: 50px;
  margin: ${({ margin }) => margin};

  color: ${({ fontColor }) => fontColor};
  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  box-shadow: 0px 4px 24px -8px rgba(0, 0, 0, 0.75);
  opacity: ${({ opacity }) => opacity};

  transform: translateX(
    ${({ positionDiff }) => positionDiff}px
  );

  animation-name: ${({ animationName }) => animationName};
  animation-duration: ${ANIMATION_DURATION_IN_SEC}s;
  animation-timing-function: ${({ animationType }) =>
    animationType};
  animation-direction: ${({ animationDirection }) =>
    animationDirection};

  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @keyframes left {
    from {
      transform: translateX(-120%);
      opacity: 0.6;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes right {
    from {
      transform: translateX(120%);
      opacity: 0.6;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes top {
    from {
      transform: translateY(-120%);
      opacity: 0.6;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes bottom {
    from {
      transform: translateY(120%);
      opacity: 0.6;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
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
  display: flex;

  padding: ${({ padding }) => padding};
`

export const IconWrapper = styled.div`
  position: relative;
  width: 30px;
`

export const MainWrapper = styled.div`
  width: calc(100% - 30px);
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
