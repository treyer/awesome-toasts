import styled from 'styled-components'

export const ContainerWrapper = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;

  width: 320px;

  &[data-position^='top-'] {
    top: 0;
  }

  &[data-position^='bottom-'] {
    bottom: 0;
  }

  &[data-position$='-right'] {
    right: 10px;
  }

  &[data-position$='-left'] {
    left: 10px;
  }

  &[data-position$='-center'] {
    left: 50%;
    transform: translateX(-50%);
  }
`
