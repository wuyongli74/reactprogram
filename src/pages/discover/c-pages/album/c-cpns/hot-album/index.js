import React, { memo, useEffect } from "react";

import { getAlbums } from "@/services/album";

import HotAblumHeader from "@/components/hot-album";
import HYAlbumCover from "@/components/album-cover";
import { HotAlbumWrapper } from "./style";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getAlbumsAction } from "../../store/actionCreators";

import { Pagination } from "antd";

export default memo(function HotAblum() {
  const { albums } = useSelector(
    (state) => ({
      albums: state.getIn(["album", "albums"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // getAlbums(10).then((res) => {
    //   console.log(res);
    // });
    dispatch(getAlbumsAction(10));
  }, [dispatch]);

  function onShowSizeChange(current, pageSize) {
    dispatch(getAlbumsAction());
    console.log(current, pageSize);
  }

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <button>{"<"}上一页</button>;
    }
    if (type === "next") {
      return <button>下一页 &gt;</button>;
    }
    return originalElement;
  }

  return (
    <HotAlbumWrapper>
      <HotAblumHeader
        title="全部新碟"
        keywords={["全部", "华语", "欧美", "韩国", "日本"]}
      />
      <div className="content">
        <ul className="new-songs">
          {albums.map((item, index) => {
            return (
              <li key={item.id}>
                <HYAlbumCover
                  key={item.id}
                  info={item}
                  size={130}
                  width={153}
                  bgp="-845px"
                />
              </li>
            );
          })}
        </ul>
        <Pagination
          showSizeChanger={false}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          // defaultPageSize={10}
          total={500}
          itemRender={itemRender}
        />
      </div>
    </HotAlbumWrapper>
  );
});
