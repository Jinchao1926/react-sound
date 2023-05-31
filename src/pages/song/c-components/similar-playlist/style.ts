import styled from "styled-components";

export const SimilarPlaylistWrapper = styled.div`
  margin-bottom: 40px;

  .header {
    width: 100%;
    height: 24px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    .title {
      font-weight: bold;
    }
  }
`

export const SimilarPlaylistItem = styled.div`
  display: flex;
  width: 200px;
  height: 50px;
  margin-bottom: 15px;

  a:hover {
    text-decoration: underline;
  }

  .cover {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    margin-left: 10px;
    width: 140px;
    
    .playlist, .author {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .playlist {
      color: #000;
      font-size: 14px;
      line-height: 24px;
    }
    .author {
      color: #999;
      line-height: 24px;

      .author-name {
        display: inline-block;
        color: #666;
        margin-left: 5px;
      }
    }
  }
`