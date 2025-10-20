import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRegisterLogic } from './registerLogic';
import { Container, Main, Heading, RegisterForm, RegisterInput, Button } from './registerStyles';

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
        <Heading>Enter register details</Heading>
        <br />
        <RegisterForm onSubmit={registerUser}>
          <RegisterInput 
            type='text' 
            placeholder='username' 
            value={user.username} 
            onChange={handleUsernameChange} 
          />
          <br />
          <RegisterInput 
            type='password' 
            placeholder='password' 
            value={user.password} 
            onChange={handlePasswordChange} 
          />
          <br />
          <RegisterInput 
            type='email' 
            placeholder='email' 
            value={user.email} 
            onChange={handleEmailChange} 
          />
          <br />
          <RegisterInput 
            type='text' 
            placeholder='name' 
            value={user.name} 
            onChange={handleNameChange} 
          />
          <br />
          <Button type="submit" value="Register" />
        </RegisterForm>
      </Main>
    </Container>
  );
}