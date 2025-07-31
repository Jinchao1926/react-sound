import styled from 'styled-components'

export interface IAlbumStyleConfig {
  width: number
  imgSize: number
  isLarge: boolean
}

export const getAlbumStyleConfig = (isLarge: boolean): IAlbumStyleConfig => {
  const imgSize = isLarge ? 130 : 100
  const width = isLarge ? 150 : 118

  return { width, imgSize, isLarge }
}

export const AlbumCoverWrapper = styled.div<IAlbumStyleConfig>`
  width: ${(props) => props.width + 'px'};

  .cover {
    width: ${(props) => props.imgSize + 'px'};
    height: ${(props) => props.imgSize + 'px'};
    margin-bottom: 8px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
    .background {
      background-position: 0 ${(props) => (props.isLarge ? '-845px' : '-570px')};
      position: absolute;
      top: 0;
      left: 0;
      width: ${(props) => props.width + 'px'};
      height: 100%;
    }
    .play {
      background-position: 0 ${(props) => (props.isLarge ? '-140px' : '-85px')};
      position: absolute;
      right: 8px;
      bottom: 8px;
      width: ${(props) => (props.isLarge ? '28px' : '22px')};
      height: ${(props) => (props.isLarge ? '28px' : '22px')};
      display: none;
      cursor: pointer;
    }
  }
  .cover:hover .play {
    display: block;
  }

  .name {
    width: ${(props) => props.width + 'px'};
    &:hover {
      text-decoration: underline;
    }
  }
  .album {
    color: #000;
    font-size: ${(props) => (props.isLarge ? '14px' : '12px')};
    line-height: ${(props) => (props.isLarge ? 1.4 : 1)};
    margin-bottom: ${(props) => (props.isLarge ? '4px' : '0')};
  }
  .artist {
    color: #666;
    font-size: 12px;
  }
  .user-links {
    width: ${(props) => props.imgSize + 'px'} !important;
  }
`
