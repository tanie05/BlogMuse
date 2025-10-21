import React from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useRegisterLogic } from './registerLogic';
import { Container, Main, Heading, SubHeading, Description, RegisterForm, InputGroup, RegisterInput, Button, Linking, Divider, FormRow } from './registerStyles';

export default function Register() {
  const { 
    user, 
    redirect, 
    handleUsernameChange, 
    handleEmailChange, 
    handlePasswordChange, 
    handleNameChange, 
    registerUser 
  } = useRegisterLogic();

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container>
      <Main>
        <Heading>Join BlogMuse</Heading>
        <SubHeading>Create your account to start writing</SubHeading>
        <Description>
          BlogMuse is your creative writing platform where ideas come to life. 
          Share your stories, connect with fellow writers, and inspire others with your words.
        </Description>
        <RegisterForm onSubmit={registerUser}>
          <FormRow>
            <InputGroup>
              <RegisterInput 
                type='text' 
                placeholder='Username' 
                value={user.username} 
                onChange={handleUsernameChange} 
              />
            </InputGroup>
            <InputGroup>
              <RegisterInput 
                type='text' 
                placeholder='Full Name' 
                value={user.name} 
                onChange={handleNameChange} 
              />
            </InputGroup>
          </FormRow>
          <InputGroup>
            <RegisterInput 
              type='email' 
              placeholder='Email Address' 
              value={user.email} 
              onChange={handleEmailChange} 
            />
          </InputGroup>
          <InputGroup>
            <RegisterInput 
              type='password' 
              placeholder='Password' 
              value={user.password} 
              onChange={handlePasswordChange} 
            />
          </InputGroup>
          <Button type="submit" value="Create Account" />
        </RegisterForm>
        <Divider />
        <Linking as={Link} to={'/login'}>Already have an account? Sign in</Linking>
      </Main>
    </Container>
  );
}