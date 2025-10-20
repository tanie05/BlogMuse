import React from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLoginLogic } from './loginLogic';
import { Container, Main, Heading, SubHeading, LoginForm, InputGroup, LoginInput, Button, Linking, Divider } from './loginStyles';

export default function Login() {
  const { user, redirect, handleNameChange, handlePasswordChange, loginFunction } = useLoginLogic();

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container>
      <Main>
        <Heading>Welcome Back</Heading>
        <SubHeading>Sign in to your account</SubHeading>
        <LoginForm onSubmit={loginFunction}>
          <InputGroup>
            <LoginInput 
              type='text' 
              placeholder='Username' 
              value={user.username} 
              onChange={handleNameChange} 
            />
          </InputGroup>
          <InputGroup>
            <LoginInput 
              type='password' 
              placeholder='Password' 
              value={user.password} 
              onChange={handlePasswordChange} 
            />
          </InputGroup>
          <Button type='submit' value="Sign In" />
        </LoginForm>
        <Divider />
        <Linking as={Link} to={'/register'}>Don't have an account? Create one</Linking>
      </Main>
    </Container>
  );
}