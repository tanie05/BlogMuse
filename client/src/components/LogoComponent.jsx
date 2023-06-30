import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {mobile} from '../responsive'

const Logo = styled.div`
  
  font-size: 60px;
  text-align: center;
  padding: 20px;
  font-family: 'Libre Baskerville', serif;
  ${mobile({
      fontSize: "30px",
      margin: "0",
      padding: "5px",
      margin : "0"
    })}
`

const Navitems = styled(Link)`
  padding: 10px;
  color: #050505;
  text-decoration: none;
`
export default function LogoComponent() {
  return (
      <Logo>
        <Navitems to= '/' style={{textDecoration: "none", color:"black"}}>BlogMuse</Navitems>
      </Logo>
  )
}
