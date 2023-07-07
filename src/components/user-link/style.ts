import styled from "styled-components";

export const UserLinkWrapper = styled.div`

  .user-links {
    width: 100%;
    display: inline-block;

    a {
      display: inline;
      color: #666;
      font-size: 12px;
      vertical-align: middle;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`