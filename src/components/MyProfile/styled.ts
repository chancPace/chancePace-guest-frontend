import styled from 'styled-components';

export const MyProfileStyled = styled.div`
  text-align: left;
  /* background-color: coral; */
  background-color: white;
  width: 200px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 3px 4px 11px 0px #00000040;
  padding: 10px;
  position: relative;
  .user-id {
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
  }
  .profile-menu {
    line-height: 2;
  }
  .logout-btn {
    position: absolute;
    top: 92%;
  }
`;
