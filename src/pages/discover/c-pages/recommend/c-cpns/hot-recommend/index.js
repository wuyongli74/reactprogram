import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { HOT_RECOMMEND_LIMIT } from "@/common/contants";

import HYThemeHeaderRCM from "@/components/theme-header-rcm";
import HYSongsCover from "@/components/songs-cover";
import { HotRecommendWrapper } from "./style";

import { getHotRecommendAction } from "../../store/actionCreators";

export default memo(function HYHotRecommend() {
  // state

  // redux hooks
  // 解构数据
  const { hotRecommends } = useSelector(
    (state) => ({
      hotRecommends: state.getIn(["recommend", "hotRecommends"]),
      // shallowEqual--进行浅层比较
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  // other hooks
  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT));
  }, [dispatch]);

  return (
    <HotRecommendWrapper>
      <HYThemeHeaderRCM
        title="热门推荐"
        keywords={["华语", "流行", "民谣", "摇滚", "电子"]}
      />
      <div className="recommend-list">
        {hotRecommends.map((item, index) => {
            {/* info传入item、key直接给唯一标识id */}
          return <HYSongsCover key={item.id} info={item} />;
        })}
      </div>
    </HotRecommendWrapper>
  );
});
