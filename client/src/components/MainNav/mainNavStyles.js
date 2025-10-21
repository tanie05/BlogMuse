import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../../responsive';

export const Container = styled.div`
  margin: 0;
  padding: 0;
`;

export const Main = styled.div`
  margin: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  font-family: 'Arial', sans-serif;
  gap: 30px;
  ${mobile({
    fontSize: "14px",
    gap: "20px"
  })}
`;

export const Navitems = styled(Link)`
  padding: 10px 0;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  
  &:hover {
    color: #1E594E;
    border-bottom-color: #1E594E;
  }
`;
