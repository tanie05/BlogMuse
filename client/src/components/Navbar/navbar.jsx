import React from 'react';
import LogoComponent from '../LogoComponent';
import MainNav from '../MainNav';
import { useNavbarLogic } from './navbarLogic';
import { Container, NavContent } from './navbarStyles';

export default function Navbar({ showNavbar = true }) {
  useNavbarLogic();

  return (
    <Container>
      <NavContent>
        <LogoComponent />
        <MainNav />
      </NavContent>
    </Container>
  );
}
