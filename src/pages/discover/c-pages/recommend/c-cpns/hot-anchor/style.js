import styled from "styled-components";

export const HotAnchorWrapper = styled.div`
  margin: 20px;

  .anchor-title {
    padding-bottom: 5px;
    border-bottom: 1px solid #d2d2d2;
    font-weight: bold;
  }

  .anchor-card {
    margin: 10px 0 5px 0;
    display: flex;
    align-items: center;

    .anchor-info {
      display: flex;
      flex-direction: column;
      margin: 0 14px;

      .message {
        color: #999;
        width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
    }
  }
`;
