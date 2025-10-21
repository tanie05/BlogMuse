import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../../responsive';

export const PostContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #F2F2F2;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  ${mobile({
    width: "100%",
  })}
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin: 15px 0;

  ${mobile({
    height: "150px",
  })}
`;

export const Written = styled.div`
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  ${mobile({
    padding: "20px",
  })}
`;

export const Title = styled.h1`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
  margin: 0 0 15px 0;
  line-height: 1.4;
  word-wrap: break-word;
  hyphens: auto;

  ${mobile({
    fontSize: "1.3rem",
    margin: "0 0 12px 0",
  })}
`;

export const Author = styled(Link)`
  color: #1E594E;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 15px;
  transition: color 0.3s ease;

  &:hover {
    color: #F26B1D;
  }
`;

export const Button = styled.button`
  background: #1E594E;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  &:hover {
    background: #F26B1D;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(242, 107, 29, 0.3);
  }

  ${mobile({
    padding: "6px 12px",
    fontSize: "0.8rem",
  })}
`;

export const SaveButton = styled.button`
  background: ${props => props.saved ? '#1E594E' : '#F2F2F2'};
  color: ${props => props.saved ? 'white' : '#666'};
  border: 1px solid ${props => props.saved ? '#1E594E' : '#ddd'};
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  &:hover {
    background: ${props => props.saved ? '#F26B1D' : '#1E594E'};
    color: white;
    border-color: ${props => props.saved ? '#F26B1D' : '#1E594E'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${mobile({
    padding: "6px 12px",
    fontSize: "0.8rem",
  })}
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: auto;

  ${mobile({
    gap: "8px",
    flexDirection: "column",
    alignItems: "stretch",
  })}
`;

export const MetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 8px 0;
  border-top: 1px solid #F2F2F2;
  border-bottom: 1px solid #F2F2F2;

  ${mobile({
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "5px",
  })}
`;

export const CreatedDate = styled.span`
  color: #666;
  font-size: 0.8rem;
  font-weight: 400;
`;

export const SaveCount = styled.span`
  color: #F26B1D;
  font-size: 0.8rem;
  font-weight: 500;
  background: #F2F2F2;
  padding: 4px 8px;
  border-radius: 4px;
`;

