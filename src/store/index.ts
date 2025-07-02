import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

// Discover
import { albumReducer } from '@/modules/Discover/pages/Album/store'
import { playlistReducer } from '@/modules/Discover/pages/Playlist/store'
import { recommendReducer } from '@/modules/Discover/pages/Recommend/store'
import { rankingReducer } from '@/modules/Discover/pages/Toplist/store'
import { radioReducer } from '@/modules/DJRadio/store'
// Player
import { playerReducer } from '@/modules/Player/store'
import { songReducer } from '@/modules/Song/store'

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
