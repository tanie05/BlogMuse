import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import baseUrl from '../appConfig'
const Container = styled.div`
  background-image: url('https://images.unsplash.com/photo-1482976818992-9487ee04f08b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 97vh; 
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

`;
const Main = styled.div`

width: max-content;
text-align: center;
height: max-content;
padding: 50px;
    
`
const Heading = styled.h1`
  font-family: 'Libre Baskerville', serif;
  font-size: 40px;
  
`
const LoginForm = styled.form`
font-family: 'roboto';
`
const LoginInput = styled.input`
font-size: 20px;
padding: 10px;
margin: 10px;
border: 1px black solid;

`
const Button = styled.input`
  background-color: #0a4423;
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  border: 1px black solid;
  border-radius: 5px;
  cursor: pointer;
`
const Linking = styled(Link)`
text-decoration: none;
font-size: 20px;
font-weight: bold;
margin: 20px;
color: black;
font-family: 'Libre Baskerville';
`
export default function Login() {
  const [user,setUser] = useState({username: "" , password: "" })
  const { setUserInfo} = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  function handleNameChange(e) {
    setUser((prevUser) => {
      return {...prevUser, username: e.target.value}
    })
  }
  function handlePasswordChange(e) {
    setUser((prevUser) => {
      return {...prevUser, password: e.target.value}
    })
  }
  function loginFunction(event){
    event.preventDefault();

    axios.post(`${baseUrl}/auth/login`, user)
    .then((response) => {
      
        setUserInfo({...response.data.user, flag: true})
        const value = {...response.data.user, flag: true};
        localStorage.setItem('user', JSON.stringify(value))
        setRedirect(true)
    
    })
    .catch((err) => console.log(`error is ${err}`))
  }
  if(redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <Container>
      <Main>
      <Heading >Enter login details</Heading>
      <LoginForm onSubmit={loginFunction}>
        <LoginInput type='text' placeholder='username' value={user.username} onChange={(e) => handleNameChange(e)}/>
        <br/>
        <LoginInput type='password' placeholder='password' value={user.password} onChange={(e) => handlePasswordChange(e)}/>
        <br/>
        <Button type='submit' value="Login" />
        <br/>
      </LoginForm>
      <Linking to = {'/register'} >Create an account</Linking>
      </Main>
    </Container>
  )
}
