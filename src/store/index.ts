import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux' 

import { recommendReducer } from "@/pages/discover/c-pages/recommend/store"
import { playerReducer } from "@/pages/player/store"
import { songReducer } from "@/pages/song/store";

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    player: playerReducer,
    song: songReducer,
  }
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