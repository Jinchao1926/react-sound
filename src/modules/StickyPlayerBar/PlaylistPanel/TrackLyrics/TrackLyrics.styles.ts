import styled from 'styled-components'

export const TrackLyricsWrapper = styled.div`
  background-color: #1a1a1a;
  height: 260px;
  flex: 1;
`

export const TrackLyricsContent = styled.div`
  width: 100%;
  height: 220px;
  box-sizing: border-box;
  margin: 20px 0;
  padding: 0 33px;

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #000;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #404040;
    border: 1px solid #4f4f4f;
    border-radius: 5px;
  }
`

export interface TrackLyricProps {
  highlight: boolean
}
export const TrackLyric = styled.p<TrackLyricProps>`
  margin: 0;
  line-height: 32px;
  text-align: center;
  color: ${({ highlight }) => (highlight ? 'white' : '#989898')};
  font-size: ${({ highlight }) => (highlight ? 14 : 12)}px;
`
