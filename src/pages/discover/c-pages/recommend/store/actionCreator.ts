import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  changeBannersAction 
} from "./reducer";

import { 
  fetchBanners 
} from "../service/recommend";

// 定义获取推荐列表数据的异步 Action
export const fetchRecommendDataAsync = createAsyncThunk(
  "fetchRecommendDatas",
  async (_, { dispatch }) => {
    try {
      const { banners } = await fetchBanners();
      dispatch(changeBannersAction(banners))
      console.log("banners: ", banners)
    } catch (error) {
      console.log("fetchBanners error: ", error)
    }

    // fetchBanners().then((res: any) => {
    //   console.log("banners: ", res.banners)
    //   dispatch(changeBannersAction(res.banners))
    // }).catch((err: any) => {
    //   console.log("fetchBanners error: ", err)
    // })
  }
)