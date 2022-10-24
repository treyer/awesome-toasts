import styled from 'styled-components'

export const ContainerWrapper = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 250px;

  &[data-position^='top-'] {
    top: 0;
  }

  &[data-position^='bottom-'] {
    bottom: 0;
  }

  &[data-position$='-right'] {
    right: 0;
  }

  &[data-position$='-left'] {
    left: 0;
  }

  &[data-position$='-center'] {
    left: 50%;
    transform: translateX(-50%);
  }
`
