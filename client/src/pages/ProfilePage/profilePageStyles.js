import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../../responsive';

export const Container = styled.div``;

export const SmallNav = styled.div`
  margin: 10px 0px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
  ${mobile({
    width: "100%",
    overflow: "scroll",
    margin: "0",
  })}
`;

export const CoverPicture = styled.img`
  width: 100%;
  height: 300px;
  ${mobile({
    height: "150px"
  })}
`;

export const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: -75px; 
  ${mobile({
    width: "100px",
    height: "100px",
  })}
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 50px;
  box-shadow: 10px gray;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  ${mobile({
    margin: "0",
    width: "100vw"
  })}
`;

export const Username = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  font-family: 'ruleway';
  ${mobile({
    fontSize: "15px",
  })}
`;

export const OptionButton = styled.button`
  border: none;
  background: transparent;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.selected ? 'blue' : 'black')};
  cursor: pointer;

  &:hover {
    color: #0a4423;
  }
`;

export const SmallNavItems = styled(Link)`
  padding: 10px;
  color: #050505;
  text-decoration: none;
  ${mobile({})}
`;
