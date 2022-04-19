import React, { memo } from "react";
import { RecommendWrapper, Content, RecommendLeft, RecommendRight } from './style'
import HYTopBanner from './c-cpns/top-banner'
import HYHotRecommend from './c-cpns/hot-recommend'
import HYNewAlbum from './c-cpns/new-album';
import HYUserLogin from './c-cpns/user-login';
import HYSettleSinger from './c-cpns/settle-singer';
import HYHotAnchor from './c-cpns/hot-anchor';
import HYRecommendRanking from './c-cpns/recommend-ranking'

function HYRecommend(props) {

  return (
    <RecommendWrapper>
      <HYTopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <HYHotRecommend />
          <HYNewAlbum/>
          <HYRecommendRanking/>
        </RecommendLeft>
        <RecommendRight>
          <HYUserLogin/>
          <HYSettleSinger/>
          <HYHotAnchor/>
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  );
}

export default memo(HYRecommend);

// function HYRecommend(props) {
//   // 对函数进行解构
//   const {getBanners,topBanners} = props;

//   useEffect(() => {
//     getBanners();
//   }, [getBanners]);

//   return (
//     <div>
//       <h2>HYRecommend:{topBanners.length}</h2>
//     </div>
//   );
// }

// const mapStateToProps = (state) => ({
//   topBanners: state.recommend.topBanners,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getBanners: () => {
//     dispatch(getTopBannerAction());
//   },
// });
// export default connect(mapStateToProps,mapDispatchToProps)(memo(HYRecommend));
