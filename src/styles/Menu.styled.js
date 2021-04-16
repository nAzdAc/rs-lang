import styled from 'styled-components';

export const MenuStyled = styled.nav`
  width: 60%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #FFFFFF;

  @media (max-width: 1080px) {
    width: unset;
  }

  > ul {
    display: flex;

    & > .MuiListItem-gutters {
      @media (max-width: 800px) {
        padding: 6px;
      }
    }
  }

  > ul > div {
    display: flex;

    & > .MuiButton-root {
      min-width: 20px;
    }

    & > .MuiButton-text {
      padding: 0;
      margin-right: 10px;
    }

    & > .MuiListItem-gutters {
      @media (max-width: 800px) {
        padding: 6px;
      }
    }
  }
`;
