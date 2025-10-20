import styled from 'styled-components';
import { mobile } from '../../responsive';

export const Container = styled.div`
  height: 500px;
  margin: 0px 50px;
  background-image: url('https://images.unsplash.com/photo-1485498128961-422168ba5f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mobile({
    height: '300px',
    margin: '0px',
    color: "white"
  })}
`;

export const Newsletter = styled.div`
  font-family: 'Libre Baskerville', serif;
  width: max-content;
  text-align: center;
  height: max-content;
  padding: 50px;

  ${mobile({
    padding: '30px',
  })}
`;

export const FormInput = styled.input`
  font-family: 'Roboto';
  width: 350px;
  height: 35px;
  font-size: 20px;
  border: 1px black solid;
  border-radius: 5px;

  ${mobile({
    width: '150px',
    height: '20px',
    fontSize: '12px',
  })}
`;

export const SubmitBtn = styled.input`
  font-family: 'Roboto';
  height: 35px;
  background-color: #0a4423;
  color: white;
  font-size: 20px;
  padding: 3px 8px;
  border: 1px black solid;
  border-radius: 5px;
  margin-left: 10px;
  width: 85px;

  ${mobile({
    height: '20px',
    fontSize: '12px',
    padding: '1px 6px',
    margin: '5px 0',
    width: '50px',
  })}
`;

export const Heading = styled.h1`
  font-size: 50px;

  ${mobile({
    fontSize: '30px',
  })}
`;

export const Form = styled.form``;
