import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  changeBannersAction,
  changeHotRecommendsAction,
  changeNewAlbumsAction
} from "./reducer";

import { 
  fetchBanners,
  fetchHotRecommends,
  fetchTopAlbums
} from "../service/recommend";

// 定义获取推荐列表数据的异步 Action
export const fetchRecommendDataAsync = createAsyncThunk(
  "fetchRecommendDatas",
  async (_, { dispatch }) => {
    try {
      const { banners } = await fetchBanners()
      dispatch(changeBannersAction(banners))
    } catch (error) {
      console.log("fetchBanners error: ", error)
    }

    // fetchBanners().then((res: any) => {
    //   console.log("banners: ", res.banners)
    //   dispatch(changeBannersAction(res.banners))
    // }).catch((err: any) => {
    //   console.log("fetchBanners error: ", err)
    // })

    try {
      const { result } = await fetchHotRecommends()
      dispatch(changeHotRecommendsAction(result))
    } catch (error) {
      console.log("fetchHotRecommends error: ", error)
    }

    try {
      const { albums } = await fetchTopAlbums()
      dispatch(changeNewAlbumsAction(albums))
    } catch (error) {
      console.log("fetchTopAlbums error: ", error)
    }
  }
)