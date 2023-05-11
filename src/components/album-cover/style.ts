import styled from "styled-components";

export interface IAlbumProps {
  width: number,
  imgSize: number,
}
export const AlbumCoverWrapper = styled.div<IAlbumProps>`
  width: ${props => props.width + "px"};
  /* height: 150px; */

  .cover {
    width: ${props => props.imgSize + "px"};
    height: ${props => props.imgSize + "px"};
    margin-bottom: 7px;
    position: relative;

    img {
        width: 100%;
        height: 100%;
    }
    .background {
      background-position: 0 -570px;
      position: absolute;
      top: 0;
      left: 0;
      width: ${props => props.width + "px"};
      height: 100%;
    }
    .play {
      background-position: 0 -85px;
      position: absolute;
      right: 8px;
      bottom: 8px;
      width: 22px;
      height: 22px;
      display: none;
    }
  }
  .cover:hover .play {
    display: block;
  }

  .name {
    width: ${props => props.imgSize + "px"};
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
      text-decoration: underline;
    }
  }
  .album {
    color: #000;
  }
  .artist {
    color: #666;
  }
`