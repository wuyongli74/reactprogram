import styled from "styled-components";

export const SettleSingerWrapper = styled.div`
  margin: 20px;

  .singer-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    border-bottom: 1px solid #d2d2d2;

    p {
      font-weight: bold;
    }
  }

  .singer-card {
    margin: 10px 0 5px 0;
    display: flex;
    align-items: center;
    background: #fafafa;
    border: 1px solid #e9e9e9;
    border-left: none;

    .singer-info {
      display: flex;
      flex-direction: column;
      margin: 0 14px;

      .name {
        font-weight: bold;
        font-size: 16px;
        padding-bottom: 5px;
      }

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
