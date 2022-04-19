import React, { memo } from "react";
import { HotAnchorWrapper } from "./style";

export default memo(function HYHotAnchor() {
  return (
    <HotAnchorWrapper>
      <p className="anchor-title">热门主播</p>
      <div className="anchor-card">
        <img
          src="https://p2.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=40y40"
          alt=""
        />
        <div className="anchor-info">
          <p className="name">陈立</p>
          <p className="message">心理学家、美食家陈立教授</p>
        </div>
      </div>
    </HotAnchorWrapper>
  );
});
