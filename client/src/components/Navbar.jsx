import React, { useContext, useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import {UserContext} from '../UserContext'
import styled from 'styled-components'
const Container = styled.div`
  margin: 10px 50px;
  box-shadow: 10px gray;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`
const Logo = styled.div`
  
  font-size: 60px;
  text-align: center;
  padding: 20px;
  font-family: 'Libre Baskerville', serif;
`
const Main = styled.div`
  
  margin: 10px 0px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';

`
const Navitems = styled(Link)`
  padding: 10px;
  color: #050505;
  text-decoration: none;
`
export default function Navbar() {
  
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [Redirect, setRedirect] = useState(false);

  function handleClick() {
    setUserInfo({
        flag: false
    })
    setRedirect(true)
  }

  if(Redirect){
    <Navigate to = {'/'}/>
  }

  return (
    <Container>
      <Logo>
        <Navitems to= '/' style={{textDecoration: "none", color:"black"}}>BlogMuse</Navitems>
      </Logo>
      
      
      <Main>
        <Navitems to = "/">HOME</Navitems>
      { 
      userInfo.flag ?
      <>
      <Navitems to = "/profile">{userInfo.username.toUpperCase()}</Navitems>
      <Navitems onClick={handleClick} to="/">LOGOUT</Navitems>
      </>
      :
      <>
      <Navitems to = "/login">LOGIN</Navitems>
      <Navitems to = "/register">REGISTER</Navitems>
      </>
      }
      </Main>
      
      
    </Container>
  )
}