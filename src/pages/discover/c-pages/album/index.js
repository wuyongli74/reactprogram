import React, { memo } from "react";
import HotAlbum from "./c-cpns/hot-album";
import HotDishs from "./c-cpns/hot-dish";
import { HotAlbumWrapper } from "./style";

export default memo(function HYAlbum() {
  return (
    <HotAlbumWrapper>
      <div className="wrap-v2 content">
        <HotDishs />
        <HotAlbum />
      </div>
    </HotAlbumWrapper>
  );
});
