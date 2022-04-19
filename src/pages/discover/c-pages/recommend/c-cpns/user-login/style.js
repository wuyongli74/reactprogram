import styled from "styled-components";

export const UserLoginWrapper = styled.div`
  text-align: left;
  padding: 18px;
  line-height:20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${require("@/assets/img/sprite_02.png")});

  button {
    width: 100px;
    height: 31px;
    margin-top: 18px;
    border-radius: 4px;
    color: #fff;
    text-shadow: 0 1px 0 #8a060b;
    background: url(${require("@/assets/img/sprite_button2.png")});
    background-position: 0px -1330px;
    
    :hover {
      cursor: pointer;
      background-position: 0px -1390px;
    }
  }
`;
