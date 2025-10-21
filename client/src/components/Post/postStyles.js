import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../../responsive';

export const PostContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  ${mobile({
    width: "100%",
  })}
`;

export const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;

  ${mobile({
    height: "200px",
  })}
`;

export const Written = styled.div`
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  /* Add extra top padding when there's no image */
  &:first-child {
    padding-top: 40px;
  }
  
  ${mobile({
    padding: "20px",
    "&:first-child": {
      paddingTop: "30px"
    }
  })}
`;

export const Title = styled.h1`
  font-family: 'Libre Baskerville', serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.4;
  word-wrap: break-word;
  hyphens: auto;

  ${mobile({
    fontSize: "1.3rem",
    margin: "0 0 15px 0",
  })}
`;

export const Author = styled(Link)`
  color: #1E594E;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #F26B1D;
  }
`;

export const Button = styled.button`
  background: #1E594E;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #F26B1D;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(242, 107, 29, 0.3);
  }

  ${mobile({
    padding: "10px 20px",
    fontSize: "0.9rem",
  })}
`;

export const SaveButton = styled.button`
  background: ${props => props.saved ? '#1E594E' : '#F2F2F2'};
  color: ${props => props.saved ? 'white' : '#666'};
  border: 1px solid ${props => props.saved ? '#1E594E' : '#ddd'};
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${props => props.saved ? '#F26B1D' : '#1E594E'};
    color: white;
    border-color: ${props => props.saved ? '#F26B1D' : '#1E594E'};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${mobile({
    padding: "8px 16px",
    fontSize: "0.8rem",
  })}
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: auto;

  ${mobile({
    gap: "10px",
    flexDirection: "column",
    alignItems: "stretch",
  })}
`;

