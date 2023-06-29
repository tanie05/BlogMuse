import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Logo = styled.div`
  
  font-size: 60px;
  text-align: center;
  padding: 20px;
  font-family: 'Libre Baskerville', serif;
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
