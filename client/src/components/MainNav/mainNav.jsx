import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMainNavLogic } from './mainNavLogic';
import { Container, Main, Navitems } from './mainNavStyles';

export default function MainNav({ showNavbar = true }) {
  const { userInfo, Redirect, handleClick } = useMainNavLogic();

  if (Redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container>
      <Main>
        <Navitems to="/">HOME</Navitems>
        {userInfo.flag ? (
          <>
            <Navitems to="/saved">SAVED POSTS</Navitems>
            <Navitems to="/profile">{userInfo.username.toUpperCase()}</Navitems>
            <Navitems onClick={handleClick} to="/">LOGOUT</Navitems>
          </>
        ) : (
          <>
            <Navitems to="/login">LOGIN</Navitems>
            <Navitems to="/register">REGISTER</Navitems>
          </>
        )}
      </Main>
    </Container>
  );
}
