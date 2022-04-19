import * as actionTypes from "./constants";

import { getAlbums,getDishs } from "@/services/album";

const changeAlbumsAction = (res) => ({
  type: actionTypes.CHANGE_ALBUMS,
  albums: res.albums,
});

const changeDishsAction = (res) =>({
  type:actionTypes.CHANGE_DISHS,
  dishs: res.albums
})

export const getAlbumsAction = (id) => {
  return (dispatch) => {
    getAlbums(id).then((res) => {
      dispatch(changeAlbumsAction(res));
      console.log(res);
    });
  };
};

export const getDishsAction = () =>{
  return (dispatch) =>{
    getDishs().then((res)=>{
      dispatch(changeDishsAction(res))
      console.log(res);
    })
  }
}
