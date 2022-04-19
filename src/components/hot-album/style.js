import styled from "styled-components";

export const HotAlbumHeaderWrapper = styled.div`
  height: 40px;
  border-bottom: 2px solid #c10d0c;

  .header {
    display: flex;
    align-items: center;

    .title {
      font-size: 24px;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
      margin-right: 20px;
      font-weight: normal;
    }

    .keyword {
      display: flex;

      .item {
        .divider {
          margin: 0 15px;
          color: #ccc;
        }
      }
    }
  }
`;
