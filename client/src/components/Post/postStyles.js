import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../../responsive';

export const PostContainer = styled.div`
  display: flex;
  padding: 30px;
  font-family: 'Poppins', sans-serif;

  ${mobile({
    flexDirection: 'column',
    padding: "0px",
    margin: "0px",
  })}
`;

export const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;

  ${mobile({
    width: '100%',
    height: 'auto',
  })}
`;

export const Written = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  font-family: 'Libre Baskerville', serif;
  margin: 10px 40px;
  font-size: 58px;
  height: 135px;
  overflow: hidden;

  ${mobile({
    margin: "0",
    fontSize: '25px',
    height: 'auto',
  })}
`;

export const Description = styled.div`
  margin: 10px 40px;
  font-size: 21px;
  height: 50px;
  overflow: hidden;

  ${mobile({
    margin: '0px',
    fontSize: '12px',
    height: '25px',
  })}
`;

export const Author = styled(Link)`
  margin: 10px 40px;
  color: gray;
  text-decoration: none;

  ${mobile({
    margin: '10px 0px',
  })}
`;

export const Button = styled.button`
  margin: 10px 40px;
  font-size: 20px;
  background-color: #0a4423;
  color: white;
  padding: 3px;
  bottom: 0;
  cursor: pointer;

  ${mobile({
    margin: '5px',
    fontSize: '10px',
    padding: '2px',
  })}
`;

export const SaveButton = styled.button`
  margin: 10px 40px;
  font-size: 16px;
  background-color: ${props => props.saved ? '#28a745' : '#6c757d'};
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.saved ? '#218838' : '#5a6268'};
  }

  ${mobile({
    margin: '5px',
    fontSize: '12px',
    padding: '3px 6px',
  })}
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
