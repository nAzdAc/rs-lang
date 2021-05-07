import styled from 'styled-components'

export const HeaderStyled = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #5600E8;
  
  & + div {
    flex: 1 0 auto;
  }

  > a {
    text-decoration: none;

    & > p {
      font-family: 'Permanent Marker', cursive;
      font-size: 48px;
      line-height: 80px;
      color: #F2F2F2;
      margin: 0;

      @media (max-width: 800px) {
        font-size: 30px;
      }
    }
  }
`;
