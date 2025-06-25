import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

// Discover
import { albumReducer } from '@/pages/discover/c-pages/album/store'
import { radioReducer } from '@/pages/discover/c-pages/djradio/store'
import { playlistReducer } from '@/pages/discover/c-pages/playlist/store'
import { rankingReducer } from '@/pages/discover/c-pages/ranking/store'
import { recommendReducer } from '@/pages/discover/c-pages/recommend/store'
// Player
import { playerReducer } from '@/pages/player/store'
import { songReducer } from '@/pages/song/store'

const store = configureStore({
  reducer: {
    // discover
    recommend: recommendReducer,
    ranking: rankingReducer,
    playlist: playlistReducer,
    radio: radioReducer,
    album: albumReducer,
    // detail
    player: playerReducer,
    song: songReducer,
  },
})

// https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete
// Fix：Argument of type 'AsyncThunkAction<void, void, AsyncThunkConfig>' is not assignable
// to parameter of type 'AnyAction'.
type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// 自定义 hooks 来解决 ts 的严格类型检查
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
