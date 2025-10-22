import styled from 'styled-components'

export const BannerTransitionContainer = styled.div`
  width: 730px;

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0.2;
    transition: opacity 0.3s ease-in-out;
  }

  /*
  .slide-enter {
    opacity: 0;
    transform: translateY(100%);
  }

  .slide-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 500ms, transform 500ms;
  }

  .slide-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-exit-active {
    opacity: 0;
    transform: translateY(-100%);
    transition: opacity 500ms, transform 500ms;
  } */
`
