import styled from "styled-components";

export const Container = styled.div`
  background-image: url('https://images.unsplash.com/photo-1482976818992-9487ee04f08b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 97vh; 
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.div`
  width: max-content;
  text-align: center;
  height: max-content;
  padding: 50px;
`;

export const Heading = styled.h1`
  font-family: 'Libre Baskerville', serif;
  font-size: 40px;
`;

export const LoginForm = styled.form`
  font-family: 'roboto';
`;

export const LoginInput = styled.input`
  font-size: 20px;
  padding: 10px;
  margin: 10px;
  border: 1px black solid;
`;

export const Button = styled.input`
  background-color: #0a4423;
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  border: 1px black solid;
  border-radius: 5px;
  cursor: pointer;
`;

export const Linking = styled.a`
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
  color: black;
  font-family: 'Libre Baskerville';
`;
