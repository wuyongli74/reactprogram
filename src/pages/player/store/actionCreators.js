import { getSongDetail, getLyric } from "@/services/player";
import { getRandomNumber } from "@/utils/math-utils";
import { parseLyric } from "@/utils/parse-lyric";

import * as actionTypes from "./constants";

const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong,
});

const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList,
});

const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index,
});

const changeLyricListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC_LIST,
  lyricList,
});

// 对外暴露的action
export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence,
});

export const changeCurrentLyricIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  index,
});

export const changeCurrentIndexAndSongAction = (tag) => {
  return (dispatch, getState) => {
    // 通过getState拿getIn()
    const playList = getState().getIn(["player", "playList"]);
    const sequence = getState().getIn(["player", "sequence"]);
    let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);
    // debugger;
    switch (sequence) {
      case 1: //随机播放
        let randomIndex = getRandomNumber(playList.length);
        while (randomIndex === currentSongIndex) {
          randomIndex = getRandomNumber(playList.length);
        }
        // let randomIndex = Math.floor(Math.random() * playList.length);
        currentSongIndex = randomIndex;
        break;
      default:
        //顺序播放
        currentSongIndex += tag;
        if (currentSongIndex >= playList.length) currentSongIndex = 0;
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
    }

    const currentSong = playList[currentSongIndex];
    dispatch(changeCurrentSongAction(currentSong));
    dispatch(changeCurrentSongIndexAction(currentSongIndex));

    // 请求歌词
    dispatch(getLyricAction(currentSong.id));
  };
};

export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    // 1.根据id查找playList中是否存在该歌曲
    // 先拿到playList
    const playList = getState().getIn(["player", "playList"]);
    // findIndex高阶函数--findIndex(item => ture/false)-- (song.id === ids)--> ture==返回item所对应的索引值
    const songIndex = playList.findIndex((song) => song.id === ids);

    // 2.判断是否找到歌曲
    let song = null;
    if (songIndex !== -1) {
      //查找歌曲(找到)
      dispatch(changeCurrentSongIndexAction(songIndex));
      song = playList[songIndex];
      dispatch(changeCurrentSongAction(song));
      dispatch(getLyricAction(song.id));
    } else {
      // 没有找到歌曲
      // 请求歌曲数据
      getSongDetail(ids).then((res) => {
        // 取当前歌曲
        song = res.songs && res.songs[0];
        // 没有取到值就直接return
        if (!song) return;

        // 取到当前歌曲
        // 1.将最新请求到的歌曲添加到播放列表中--进行浅拷贝
        const newPlayList = [...playList];
        // 把当前歌曲加到播放列表中
        newPlayList.push(song);

        // 2.更新redux中的值

        dispatch(changePlayListAction(newPlayList));
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
        dispatch(changeCurrentSongAction(song));

        // 3.请求该歌曲的歌词
        dispatch(getLyricAction(song.id));
      });
    }
  };
};

export const getLyricAction = (id) => {
  return (dispatch) => {
    getLyric(id).then((res) => {
      const lyric = res.lrc.lyric;
      // console.log(lyric);
      const lyricList = parseLyric(lyric);
      dispatch(changeLyricListAction(lyricList));
      // console.log(lyricList);
    });
  };
};
