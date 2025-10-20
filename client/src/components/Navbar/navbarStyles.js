import styled from 'styled-components';
import { mobile } from '../../responsive';

export const Container = styled.div`
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 80px;
  ${mobile({
    padding: "0 20px",
    height: "70px"
  })}
`;

export const Main = styled.div`
  margin: 10px 0px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
`;
