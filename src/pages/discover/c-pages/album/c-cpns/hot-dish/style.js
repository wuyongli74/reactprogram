import styled from "styled-components";

export const HotDishWrapper = styled.div`
  width: 980px;
  padding: 40px;

  .content {
    margin: 20px 0 0 -33px;

    .new-songs {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;

      li {
        width: 153px;
        height: 178px;
        margin: 0 0 10px 33px ;
        line-height: 1.4;
      }
    }
  }
`;
