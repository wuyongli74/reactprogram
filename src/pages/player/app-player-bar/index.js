import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { getSizeImage, formatDate, getPlaySong } from "@/utils/format-utils";
// import { getSongDetail } from "@/services/player";
import {
  changeCurrentIndexAndSongAction,
  changeCurrentLyricIndexAction,
  changeSequenceAction,
  getSongDetailAction,
} from "../store/actionCreators";

import { message, Slider } from "antd";
import { NavLink } from "react-router-dom";

import { Control, Operator, PlaybarWrapper, PlayInfo } from "./style";

export default memo(function HYAppPlayerBar() {
  // props and state
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // redux hook
  const { currentSong, sequence, palyList, lyricList, currentLyricIndex } =
    useSelector(
      (state) => ({
        currentSong: state.getIn(["player", "currentSong"]),
        sequence: state.getIn(["player", "sequence"]),
        palyList: state.getIn(["player", "playList"]),
        lyricList: state.getIn(["player", "lyricList"]),
        currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
      }),
      shallowEqual
    );
  const dispatch = useDispatch();

  // other hooks
  const audioRef = useRef();
  // 模拟发送网络请求
  useEffect(() => {
    // getSongDetail(1382596189).then((res) => {
    //   console.log(res);
    // });

    dispatch(getSongDetailAction(167876));
  }, [dispatch]);

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    audioRef.current
      .play()
      .then((res) => {
        setIsPlaying(true);
      })
      .catch((err) => {
        setIsPlaying(false);
      });
  }, [currentSong]);

  // other handle
  const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
  const duration = currentSong.dt;
  const showDuration = formatDate(duration, "mm:ss");
  const showCurrentTime = formatDate(currentTime, "mm:ss");
  // const progress = (currentTime / duration) * 100;

  // handle function
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const timeUpdata = (e) => {
    const currentTime = e.target.currentTime;
    // console.log(e.target.currentTime);
    if (!isChanging) {
      setCurrentTime(currentTime * 1000);
      setProgress(((currentTime * 1000) / duration) * 100);
    }

    // 获取当前的歌词
    // let currentLyricIndex = 0;
    let i = 0;
    // for (let i = 0; i < 歌词数组.length; i++) {
    for (; i < lyricList.length; i++) {
      // let lyricItem = 歌词数组[i];
      let lyricItem = lyricList[i];
      if (currentTime * 1000 < lyricItem.time) {
        // currentLyricIndex = i;
        break;
      }
    }

    if (currentLyricIndex !== i - 1) {
      dispatch(changeCurrentLyricIndexAction(i - 1));
      // console.log(歌词数组[currentLyricIndex-1]);
      const content = lyricList[i - 1] && lyricList[i - 1].content;
      message.open({
        key: "lyric",
        content: content,
        duration: 0,
        className: "lyric-class",
      });
      // console.log(lyricList[i - 1]);
    }
  };

  const changeSequence = () => {
    let currentSequence = sequence + 1;
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence));
  };

  const changeMusic = (tag) => {
    dispatch(changeCurrentIndexAndSongAction(tag));
  };

  const handleMusicEnded = () => {
    if (sequence === 2) {
      // 单曲循环
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(changeCurrentIndexAndSongAction(1));
    }
  };

  const sliderChange = useCallback(
    (value) => {
      console.log("sliderChange", value);
      setIsChanging(true);
      const currentTime = (value / 100) * duration;
      setCurrentTime(currentTime);
      setProgress(value);
    },
    [duration]
  );

  const sliderAfterChange = useCallback(
    (value) => {
      // console.log("end", value);
      // (value / 100) * duration --> 毫秒
      const currentTime = ((value / 100) * duration) / 1000;
      audioRef.current.currentTime = currentTime;
      console.log("sliderAfterChange", currentTime);
      setCurrentTime(currentTime * 1000);
      setIsChanging(false);
      if (!isPlaying) {
        playMusic();
      }
    },
    [duration, isPlaying, playMusic]
  );

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="sprite_player prev"
            onClick={(e) => changeMusic(-1)}
          ></button>
          <button
            className="sprite_player play"
            onClick={(e) => playMusic()}
          ></button>
          <button
            className="sprite_player next"
            onClick={(e) => changeMusic(1)}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a className="singer-name" href="#/todo">
                {singerName}
              </a>
            </div>
            <div className="progress">
              <Slider
                defaultValue={30}
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button
              className="sprite_player btn loop"
              onClick={(e) => changeSequence()}
            ></button>
            <button className="sprite_player btn playlist">
             <a href="/todo" className="list-num">{palyList.length}</a> 
            </button>
          </div>
        </Operator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => timeUpdata(e)}
        onEnded={(e) => handleMusicEnded()}
      />
    </PlaybarWrapper>
  );
});
