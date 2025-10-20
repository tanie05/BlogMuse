import React from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLoginLogic } from './loginLogic';
import { Container, Main, Heading, LoginForm, LoginInput, Button, Linking } from './loginStyles';

export default function Login() {
  const { user, redirect, handleNameChange, handlePasswordChange, loginFunction } = useLoginLogic();

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container>
      <Main>
        <Heading>Enter login details</Heading>
        <LoginForm onSubmit={loginFunction}>
          <LoginInput 
            type='text' 
            placeholder='username' 
            value={user.username} 
            onChange={handleNameChange} 
          />
          <br />
          <LoginInput 
            type='password' 
            placeholder='password' 
            value={user.password} 
            onChange={handlePasswordChange} 
          />
          <br />
          <Button type='submit' value="Login" />
          <br />
        </LoginForm>
        <Linking as={Link} to={'/register'}>Create an account</Linking>
      </Main>
    </Container>
  );
}