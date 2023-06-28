import React, { useContext, useState } from 'react'
import styled from "styled-components"
import { UserContext } from '../UserContext'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
const Main = styled.div`
background-image: url('https://images.unsplash.com/photo-1482976818992-9487ee04f08b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 97vh; 
  margin: 0;
  padding: 0;
`
const Container = styled.div`
  padding: 20px;
  margin: 0px 100px;
  text-align: center;
  font-family: 'Libre Baskerville', serif;
  

`
const Heading = styled.h1`
  font-size: 40px;
  text-align: center;
  padding: 20px;
  
  
`
const Form = styled.form`
`
const FormItem = styled.input`
font-size: 20px;
padding: 10px;
margin: 10px;
border: 1px black solid;
width: 300px;
background-color: whitesmoke;
  
`
const Button = styled.input`
  background-color: #0a4423;
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  border: 1px black solid;
  border-radius: 5px;
  cursor: pointer;
  margin: 50px;
`
const Label = styled.label`
    
    font-size: 22px;
    padding: 10px;
    margin: 10px 0px ;
    font-weight: bold;

`

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

  function handleUserUpdate(event) {
    event.preventDefault()
    const data = {
        name: updatedName,
        profileImg : ProfileImage,
        coverImg : CoverImage
      }
    try {
        axios.put(`http://localhost:5000/users/${userInfo._id}`, data)
        .then(res => setUserInfo(res.data.updatedObject))
        
      } 
      catch (error) {
        console.error(error);
        }
    
        setRedirect(true)

  }
  if(redirect){
    return <Navigate to = { "/profile"} />
  }
  return (
    <Main>
        <Container>
        <Heading>User Profile</Heading>
        <Form onSubmit={handleUserUpdate}>
            <Label htmlFor='name' style={{paddingLeft: "146px"}} >Name:</Label>
            <FormItem 
                type='text' 
                placeholder='Name' 
                value = {updatedName} 
                id='name'
                onChange={(e) => setUpdatedName(e.target.value)} 
            />
            <br/>
            <Label htmlFor='profile'>Select Profile Picture:</Label>
            <FormItem 
                type='file' 
                placeholder='Choose Profile Picture' 
                id = 'profile'
                onChange={handleProfileImageSelect}
            />
            <br/>
            <Label htmlFor='cover'>Select Cover Picture:</Label>
            <FormItem 
            type='file' 
            placeholder='Choose Cover Picture' 
            id = 'cover'
            onChange={handleCoverImageSelect}
            />
            <br/>

            <Button type='submit' value= "Submit" />
        </Form>
    </Container>
    </Main>
  )
}
