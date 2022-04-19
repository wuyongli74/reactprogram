import React, { memo } from "react";
import { HotDishWrapper } from "./style";

import HYAlbumCover from "@/components/album-cover";
import HotAblumHeader from "@/components/hot-album";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDishsAction } from "../../store/actionCreators";

export default memo(function HotDishs() {
  const { dishs } = useSelector(
    (state) => ({
      dishs: state.getIn(["album", "dishs"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDishsAction(10));
  }, [dispatch]);

  return (
    <HotDishWrapper>
      <HotAblumHeader title="热门新碟" />
      <div className="content">
        <ul className="new-songs">
          {dishs.map((item, index) => {
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
      </div>
    </HotDishWrapper>
  );
});
