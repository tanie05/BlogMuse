import React, { useContext, useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import {UserContext} from '../UserContext'
import styled from 'styled-components'
import LogoComponent from './LogoComponent'
import MainNav from './MainNav'
import {mobile} from '../responsive'

const Container = styled.div`
  margin: 10px 50px;
  box-shadow: 10px gray;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  ${mobile({
      
      margin: "5px 0px",
      width : "100vw"

    })}
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
export default function Navbar({ showNavbar = true }) {
  
  const { logout } = useContext(UserContext);
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
      <LogoComponent/>
      <MainNav/>
    </Container>
  )
}