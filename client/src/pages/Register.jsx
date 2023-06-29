import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'
import styled from "styled-components"
import { Link } from 'react-router-dom'

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
const RegisterForm = styled.form`
font-family: 'roboto';
`
const RegisterInput = styled.input`
font-size: 20px;
padding: 10px;
margin: 10px;
border: 1px black solid;

`
const Linking = styled(Link)`
text-decoration: none;
font-size: 20px;
color: black;
padding: 50px;
font-weight: bold;
font-family: 'Libre Baskerville';
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
export default function Register() {

  const [user,setUser] = useState({username: "", name: "", email: "", password: ""})
  const {userInfo, setUserInfo} = useContext(UserContext)
  const [redirect, setRedirect] = useState(false);
 
  function handleUsernameChange(e){
    setUser(prevUser => {
      return {...prevUser, username: e.target.value}
    })
  }
  function handleEmailChange(e){
    setUser(prevUser => {
      return {...prevUser, email: e.target.value}
    })
  }
  function handlePasswordChange(e){
    setUser(prevUser => {
      return {...prevUser, password: e.target.value}
    })
  }
  function handleNameChange(e){
    setUser(prevUser => {
      return {...prevUser, name: e.target.value}
    })
  }
  function registerUser(event){
    event.preventDefault()

    axios.post('http://localhost:5000/auth/register', user)
    .then((response) => {
      
        setUserInfo({...response.data.user, flag: true})
        const value = {...response.data.user, flag: true};
        localStorage.setItem('user', JSON.stringify(value));

        setRedirect(true)

    })
    .catch((err) => console.log(`the error is ${err}`))
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <Container>
      <Main>
      <Heading>Enter register details</Heading>
      <br/>
      <RegisterForm onSubmit={registerUser}>
        <RegisterInput type='text' placeholder='username' value={user.username} onChange={(e) => handleUsernameChange(e)}/>
        <br/>
        <RegisterInput type='password' placeholder='password' value={user.password} onChange={(e) => handlePasswordChange(e)} />
        <br/>
        <RegisterInput type='email' placeholder='email' value={user.email} onChange={(e) => handleEmailChange(e)}/>
        <br/>
        <RegisterInput type='text' placeholder='name' value={user.name} onChange={(e) => handleNameChange(e)}/>
        <br/>
        <Button type="submit" value="Register"/>
      </RegisterForm>
      <Linking to = {'/login'} >Already have an account ? Login</Linking>
      </Main>
    </Container>
  )
}