import { Map } from "immutable";

import * as actionTypes from "./constants";

const defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],
  upRanking: {},
  newRanking: {},
  originRanking: {},
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      // 先拷贝state，然后赋值新的state
      // return { ...state, topBanners: action.topBanners }
      // set修改数据
      return state.set("topBanners", action.topBanners);
    case actionTypes.CHANGE_HOT_REAOMMEND:
      return state.set("hotRecommends", action.hotRecommends);
    case actionTypes.CHANGE_NEW_ALBUM:
      return state.set("newAlbums", action.newAlbums);
    case actionTypes.CHANGE_UP_RANKING:
      return state.set("upRanking", action.upRanking);
    case actionTypes.CHANGE_NEW_RANKING:
      return state.set("newRanking", action.newRanking);
    case actionTypes.CHANGE_ORIGIN_RANKING:
      return state.set("originRanking", action.originRanking);
    default:
      // 返回state
      return state;
  }
}

export default reducer;
