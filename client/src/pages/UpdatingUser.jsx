import React, { useContext, useState } from 'react'
import styled from "styled-components"
import { UserContext } from '../UserContext'
import api from '../utils/api'
import { Navigate } from 'react-router-dom'
import {mobile} from '../responsive'

const Main = styled.div`
  background: #F2F2F2;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({
    padding: "20px 0",
  })}
`;

const Container = styled.div`
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;

  ${mobile({
    margin: "10px",
    padding: "20px",
  })}
`;

const Heading = styled.h1`
  font-size: 36px;
  text-align: center;
  padding: 0 0 30px 0;
  font-family: 'Roboto', sans-serif;
  color: #1E594E;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${mobile({
    fontSize: "28px",
    padding: "0 0 20px 0",
  })}
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormItem = styled.input`
  font-size: 16px;
  padding: 15px;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  background: #F9F9F9;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #1E594E;
    background: white;
    box-shadow: 0 0 0 3px rgba(30, 89, 78, 0.1);
  }

  &::placeholder {
    color: #999;
  }

  ${mobile({
    fontSize: "14px",
    padding: "12px",
  })}
`;

const Button = styled.input`
  background: linear-gradient(135deg, #1E594E 0%, #2A6B5F 100%);
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(30, 89, 78, 0.3);

  &:hover {
    background: linear-gradient(135deg, #2A6B5F 0%, #1E594E 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 89, 78, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  ${mobile({
    fontSize: "16px",
    padding: "12px 24px",
    margin: "10px 0",
  })}
`;

const Label = styled.label`
  font-size: 18px;
  padding: 0;
  margin: 0 0 8px 0;
  font-weight: 600;
  color: #1E594E;
  text-align: left;
  width: 100%;

  ${mobile({
    fontSize: "16px",
    margin: "0 0 6px 0",
  })}
`;

export default function UpdatingUser() {
  const {userInfo, setUserInfo} = useContext(UserContext)
  const [updatedName, setUpdatedName] = useState(userInfo.name)
  const [ProfileImage, setProfileImage] = useState(userInfo.profileImg);
  const [CoverImage, setCoverImage] = useState(userInfo.coverImg);
  const [redirect, setRedirect] = useState(false);
  

  const handleProfileImageSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCoverImageSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  async function handleUserUpdate(event) {
    event.preventDefault();
    const data = {
      name: updatedName,
      profileImg: ProfileImage,
      coverImg: CoverImage
    };
    try {
      const res = await api.put(`/users/${userInfo._id}`, data);
      const value = {
        ...userInfo,
        name: updatedName,
        profileImg: ProfileImage,
        coverImg: CoverImage,
        flag: true
      };
      setUserInfo(value);
      setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  }
  
  if(redirect){
    return <Navigate to = { "/profile"} />
  }
  return (
    <Main>
        <Container>
        <Heading>User Profile</Heading>
        <Form onSubmit={handleUserUpdate}>
            <Label htmlFor='name'>Name:</Label>
            <FormItem 
                type='text' 
                placeholder='Name' 
                value = {updatedName} 
                id='name'
                onChange={(e) => setUpdatedName(e.target.value)} 
            />
            
            <Label htmlFor='profile'>Select Profile Picture:</Label>
            <FormItem 
                type='file' 
                placeholder='Choose Profile Picture' 
                id = 'profile'
                onChange={handleProfileImageSelect}
            />

            <Button type='submit' value= "Submit" />
        </Form>
    </Container>
    </Main>
  )
}
