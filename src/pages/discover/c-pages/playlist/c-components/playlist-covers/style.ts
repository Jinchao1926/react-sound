import styled from "styled-components";

export const PlaylistCoversWrapper = styled.div`
  margin-top: 10px;

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-right: -50px;
    margin-bottom: 40px;

    .song-cover {
      flex-basis: 20%;
    }
  }
`;