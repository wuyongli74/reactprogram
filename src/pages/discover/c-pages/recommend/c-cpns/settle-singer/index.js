import React, { memo } from "react";
import { SettleSingerWrapper } from "./style";

export default memo(function HYSettleSinger() {
  return (
    <SettleSingerWrapper>
      <div className="singer-title">
        <p>入驻歌手</p>
        <a href="/todo">查看全部 &gt;</a>
      </div>
      <div className="singer-card">
        <img alt="" src="https://p1.music.126.net/TiRAIiIihOgtBgYB6DZRXA==/109951162916034289.jpg?param=62y62" />
        <div className="singer-info">
          <p className="name">萬曉利</p>
          <p className="message">民谣歌手、中国现代民谣的代表人物之一</p>
        </div>
      </div>
      <div className="singer-card">
        <img alt="" src="https://p1.music.126.net/TiRAIiIihOgtBgYB6DZRXA==/109951162916034289.jpg?param=62y62" />
        <div className="singer-info">
          <p className="name">萬曉利</p>
          <p className="message">民谣歌手、中国现代民谣的代表人物之一</p>
        </div>
      </div>
    </SettleSingerWrapper>
  );
});
