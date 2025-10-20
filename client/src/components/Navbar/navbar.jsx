import React from 'react';
import LogoComponent from '../LogoComponent';
import MainNav from '../MainNav';
import { useNavbarLogic } from './navbarLogic';
import { Container } from './navbarStyles';

export default function Navbar({ showNavbar = true }) {
  useNavbarLogic();

  return (
    <Container>
      <LogoComponent />
      <MainNav />
    </Container>
  );
}
