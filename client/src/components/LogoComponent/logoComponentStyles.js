import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../../responsive';

export const Logo = styled.div`
  font-size: 60px;
  text-align: center;
  padding: 20px;
  font-family: 'Libre Baskerville', serif;
  ${mobile({
    fontSize: "30px",
    margin: "0",
    padding: "5px"
  })}
`;

export const Navitems = styled(Link)`
  padding: 10px;
  color: #050505;
  text-decoration: none;
`;
