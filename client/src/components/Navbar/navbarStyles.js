import styled from 'styled-components';
import { mobile } from '../../responsive';

export const Container = styled.div`
  margin: 10px 50px;
  box-shadow: 10px gray;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  ${mobile({
    margin: "5px 0px",
    width: "100vw"
  })}
`;

export const Main = styled.div`
  margin: 10px 0px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
`;
