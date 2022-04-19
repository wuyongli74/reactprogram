import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

// import { getTopList } from "@/services/recommend";
import HYThemeHeaderRCM from "@/components/theme-header-rcm";
import HYTopRanking from "@/components/top-ranking";
import { RankingWrapper } from "./style";
import { getTopListAction } from "../../store/actionCreators";

export default memo(function HYRecommendRanking() {
  // redux-hooks
  const { upRanking, newRanking, originRanking } = useSelector(
    (state) => ({
      upRanking: state.getIn(["recommend", "upRanking"]),
      newRanking: state.getIn(["recommend", "newRanking"]),
      originRanking: state.getIn(["recommend", "originRanking"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  // other-hooks
  useEffect(() => {
    // getTopList(0).then((res) => {
    //     console.log(res);
    // });
    // getTopList(2).then((res) => {
    //   console.log(res);
    // });
    // getTopList(3).then((res) => {
    //   console.log(res);
    // });

    dispatch(getTopListAction(0));
    dispatch(getTopListAction(2));
    dispatch(getTopListAction(3));
  }, [dispatch]);

  return (
    <RankingWrapper>
      <HYThemeHeaderRCM title="榜单" />
      <div className="tops">
        <HYTopRanking info={upRanking} />
        <HYTopRanking info={newRanking} />
        <HYTopRanking info={originRanking} />
      </div>
    </RankingWrapper>
  );
});
