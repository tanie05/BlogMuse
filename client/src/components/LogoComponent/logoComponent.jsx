import React from 'react';
import { useLogoComponentLogic } from './logoComponentLogic';
import { Logo, Navitems } from './logoComponentStyles';

export default function LogoComponent() {
  useLogoComponentLogic();

  return (
    <Logo>
      <Navitems to='/' style={{ textDecoration: "none", color: "black" }}>BlogMuse</Navitems>
    </Logo>
  );
}