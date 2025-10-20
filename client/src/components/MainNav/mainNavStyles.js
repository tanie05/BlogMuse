import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../../responsive';

export const Container = styled.div`
  margin: 10px 50px;
  box-shadow: 10px gray;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  ${mobile({
    margin: "0",
  })}
`;

export const Main = styled.div`
  margin: 10px 0px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
  ${mobile({
    fontSize: "10px",
    margin: "0",
  })}
`;

export const Navitems = styled(Link)`
  padding: 10px;
  color: #050505;
  text-decoration: none;
`;
