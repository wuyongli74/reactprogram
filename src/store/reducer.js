// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as recommendReducer } from '../pages/discover/c-pages/recommend/store';
import {reducer as playerReducer} from '../pages/player/store'
import {reducer as albumReducer} from '../pages/discover/c-pages/album/store'

// 合并reducer
const cReducer = combineReducers({
  recommend: recommendReducer,
  player: playerReducer,
  album: albumReducer
})

export default cReducer
