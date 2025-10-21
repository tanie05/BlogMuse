import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../../responsive';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #F2F2F2;
  min-height: 100vh;
`;

export const SmallNav = styled.div`
  margin: 20px 0px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  gap: 10px;
  ${mobile({
    width: "100%",
    overflow: "scroll",
    margin: "0",
    padding: "10px",
    gap: "5px"
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
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1E594E;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  ${mobile({
    width: "100px",
    height: "100px",
  })}
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  ${mobile({
    flexDirection: "column",
    textAlign: "center",
    gap: "20px",
    padding: "20px"
  })}
`;

export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProfileActions = styled.div`
  display: flex;
  gap: 15px;
  ${mobile({
    flexDirection: "column",
    width: "100%"
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
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: #1E594E;
  font-family: 'Roboto', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  ${mobile({
    fontSize: "24px",
  })}
`;

export const OptionButton = styled.button`
  border: none;
  background: ${(props) => (props.selected ? '#1E594E' : 'transparent')};
  color: ${(props) => (props.selected ? '#F2F2F2' : '#1E594E')};
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 2px solid ${(props) => (props.selected ? '#1E594E' : 'transparent')};

  &:hover {
    background: ${(props) => (props.selected ? '#1E594E' : '#F2B035')};
    color: ${(props) => (props.selected ? '#F2F2F2' : '#1E594E')};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const SmallNavItems = styled(Link)`
  padding: 12px 20px;
  color: #1E594E;
  text-decoration: none;
  background: #F2B035;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
  border: 2px solid transparent;

  &:hover {
    background: #F26B1D;
    color: #F2F2F2;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  ${mobile({
    padding: "10px 15px",
    fontSize: "14px"
  })}
`;

export const PostsContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  padding: 30px 0;
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  /* Responsive breakpoints */
  @media (max-width: 1199px) {
    max-width: 800px;
  }
  
  @media (max-width: 799px) {
    flex-direction: column;
    padding: 20px 15px;
    gap: 20px;
    max-width: 400px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
  max-width: 350px;
  min-width: 0; /* Prevents flex items from overflowing */
  
  @media (max-width: 1199px) {
    max-width: 350px;
  }
  
  @media (max-width: 799px) {
    max-width: 100%;
    gap: 20px;
  }
`;
