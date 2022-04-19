import React, { memo, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { getNewAlbumAction } from "../../store/actionCreators";

import { Carousel } from "antd";
import HYAlbumCover from "@/components/album-cover";
import HYThemeHeaderRCM from "@/components/theme-header-rcm";
// import { getNewAlbums } from "@/services/recommend";
import { AlbumWrapper } from "./style";

export default memo(function HYNewAlbum() {
  // 1.方法1
  // const [albums, setAlbums] = useState([]);

  // redux-hooks
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(["recommend", "newAlbums"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  // other hooks
  const pageRef = useRef();
  useEffect(() => {
    // 1.方法1
    // getNewAlbums(10).then((res) => {
    //   setAlbums(res.albums);
    //   console.log(res);
    // });
    // dispatch(函数的返回值)
    dispatch(getNewAlbumAction(10));
  }, [dispatch]);

  return (
    <AlbumWrapper>
      <HYThemeHeaderRCM title="新碟上架" />
      <div className="content">
        {/* // 1.方法1
        {albums.map((item, index) => {
          return <div>{item.name}</div>;
        })} */}
        <button
          className="arrow arrow-left sprite_02"
          onClick={(e) => pageRef.current.prev()}
        ></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {[0, 1].map((item) => {
              return (
                <div className="page" key={item}>
                  {newAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
                    return (
                      <HYAlbumCover
                        key={iten.id}
                        info={iten}
                        size={100}
                        width={118}
                        bgp="-570px"
                      />
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={(e) => pageRef.current.next()}
        ></button>
      </div>
    </AlbumWrapper>
  );
});
