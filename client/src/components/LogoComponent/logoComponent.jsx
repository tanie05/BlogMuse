import React from 'react';
import { useLogoComponentLogic } from './logoComponentLogic';
import { Logo, LogoText, Tagline, Navitems } from './logoComponentStyles';

export default function LogoComponent() {
  useLogoComponentLogic();

  return (
    <Logo>
      <Navitems to='/' style={{ textDecoration: "none" }}>
        <LogoText>BLOGMUSE</LogoText>
        <Tagline>INSPIRING YOUR CREATIVE JOURNEY</Tagline>
      </Navitems>
    </Logo>
  );
}