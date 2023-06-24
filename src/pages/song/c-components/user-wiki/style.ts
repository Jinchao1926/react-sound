import styled from "styled-components";

export const UserWikiWrapper = styled.div`
  .song-data {
    margin-top: 20px;
  }
  
  .wiki {
    display: flex;
    align-items: center;
    margin-left: -4px;

    .file {
      margin-right: 5px;
    }
    .name {
      &:hover {
        text-decoration: underline;
      }
    }
  } 
`