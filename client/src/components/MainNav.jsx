import React, { useContext, useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import {UserContext} from '../UserContext'
import styled from 'styled-components'
import LogoComponent from './LogoComponent'
import {mobile} from '../responsive'
const Container = styled.div`
  margin: 10px 50px;
  box-shadow: 10px gray;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  ${mobile({
      margin:"0",
      
    })}
`

const Main = styled.div`
  
  margin: 10px 0px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
  ${mobile({
      fontSize: "10px",
      margin: "0",
    })}

`
const Navitems = styled(Link)`
  padding: 10px;
  color: #050505;
  text-decoration: none;
`
export default function Navbar({ showNavbar = true }) {
  
  const { userInfo, logout } = useContext(UserContext);
  const [Redirect, setRedirect] = useState(false);

  async function handleClick() {
    await logout();
    setRedirect(true);
  }

  if(Redirect){
    return <Navigate to = {'/'}/>
  }

  return (
    <Container>
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