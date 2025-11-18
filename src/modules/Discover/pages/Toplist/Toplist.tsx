import React, { FC, useMemo } from 'react'

import { PlaylistTracks } from '@/components/PlaylistTracks'
import { usePlaylistDetailQuery } from '@/hooks/playlist/usePlaylistDetailQuery'
import { useSelectedToplist } from '@/modules/Discover/pages/Toplist/hooks/useSelectedToplist'
import { PlaylistDetail } from '@/types/playlist'

import { ToplistCategory } from './components/ToplistCategory'
import { ToplistDetailHeader } from './components/ToplistDetailHeader'
import { ToplistLeft, ToplistRight, ToplistWrapper } from './Toplist.styles'

export const Toplist: FC = () => {
  const { selectedToplist, toplists } = useSelectedToplist()
  const { data } = usePlaylistDetailQuery(selectedToplist?.id)

  const playlistDetail = useMemo((): PlaylistDetail | undefined => {
    if (data) {
      return {
        ...data,
        updateFrequency: selectedToplist?.updateFrequency,
      }
    }
  }, [data, selectedToplist])

  return (
    <ToplistWrapper>
      <ToplistLeft>
        <ToplistCategory id={selectedToplist?.id} toplists={toplists} />
      </ToplistLeft>
      {playlistDetail && (
        <ToplistRight>
          <ToplistDetailHeader playlist={playlistDetail} />
          <PlaylistTracks playlist={playlistDetail} />
        </ToplistRight>
      )}
    </ToplistWrapper>
  )
}
