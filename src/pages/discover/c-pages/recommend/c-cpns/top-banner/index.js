import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { getTopBannerAction } from "../../store/actionCreators";

import {
  BannerControl,
  BannerLeft,
  BannerRight,
  BannerWrapper,
} from "./style.js";
import { Carousel } from "antd";

export default memo(function HYTopBanner() {
  // state
  const [currentIndex, setCurrentIndex] = useState(0);

  // 组件额redux关联：获取数据和进行操作

  // useSelector(参数1(state)：回调函数,--返回值（对象）可赋值给定义的‘recommend’,参数二:shallowEqual--解决性能问题 );
  // const recommend = useSelector((state) => ({
  // 对函数进行解构，直接写topBanners
  const { topBanners } = useSelector(
    (state) => ({
      // topBanners: state.recommend.topBanners,
      // topBanners: state.get("recommend").get("topBanners"),
      topBanners: state.getIn(["recommend", "topBanners"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  // 其他hooks
  const bannerRef = useRef();

  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction());
    // dispatch发生改变就会重新渲染
  }, [dispatch]);

  const bannerChange = useCallback((from, to) => {
    // 传入最新的currentIndex
    setTimeout(() => {
      setCurrentIndex(to);
    }, 0);
    // console.log(to);
  }, []);

  // 其他业务逻辑
  const bgImage =
    topBanners[currentIndex] &&
    topBanners[currentIndex].imageUrl + "?imageView&blur=40x20";

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            effect="fade"
            autoplay
            ref={bannerRef}
            beforeChange={bannerChange}
          >
            {topBanners.map((item, index) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              );
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight/>
        <BannerControl>
          <button
            className="btn left"
            onClick={(e) => bannerRef.current.prev()}
          ></button>
          <button
            className="btn right"
            onClick={(e) => bannerRef.current.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  );
});
