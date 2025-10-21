import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../../responsive';

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${mobile({
    alignItems: "center"
  })}
`;

export const LogoText = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  letter-spacing: 2px;
  margin-bottom: 2px;
  font-family: 'Arial', sans-serif;
  ${mobile({
    fontSize: "1.4rem",
    letterSpacing: "1px"
  })}
`;

export const Tagline = styled.div`
  font-size: 0.7rem;
  color: #666;
  letter-spacing: 1px;
  font-weight: 400;
  font-family: 'Arial', sans-serif;
  ${mobile({
    fontSize: "0.6rem",
    letterSpacing: "0.5px"
  })}
`;

export const Navitems = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    opacity: 0.8;
  }
`;
