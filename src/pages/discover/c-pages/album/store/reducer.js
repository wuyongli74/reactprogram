import { Map } from "immutable";

import * as actionTypes from "./constants";

const defaultState = Map({
  albums: [],
  dishs: [],
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_ALBUMS:
      return state.set("albums", action.albums);
    case actionTypes.CHANGE_DISHS:
      return state.set("dishs", action.dishs);
    default:
      // 返回state
      return state;
  }
}

export default reducer;
