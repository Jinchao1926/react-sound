import styled from 'styled-components'

export const UserLinkWrapper = styled.div<{ color?: string }>`
  .user-links {
    width: 100%;
    display: inline-block;

    a {
      display: inline;
      color: ${({ color = '#666' }) => color};
      font-size: 12px;
      vertical-align: middle;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
