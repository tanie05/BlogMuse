import styled from "styled-components";

export const Container = styled.div`
  background: #1E594E;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Main = styled.div`
  background: white;
  border-radius: 20px;
  padding: 16px 50px;
  box-shadow: 0 10px 30px rgba(30, 89, 78, 0.1);
  text-align: center;
  width: 100%;
  max-width: 500px;
  position: relative;
  border: 2px solid #1E594E;
`;

export const Heading = styled.h1`
  font-family: 'Libre Baskerville', serif;
  font-size: 2.5rem;
  color: #1E594E;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const SubHeading = styled.p`
  color: #1E594E;
  font-size: 1.1rem;
  margin-bottom: 20px;
  opacity: 0.8;
`;

export const Description = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  text-align: center;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const RegisterInput = styled.input`
  width: 100%;
  padding: 18px 20px;
  font-size: 16px;
  border: 2px solid #F2F2F2;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;

  &:focus {
    outline: none;
    border-color: #F26B1D;
    box-shadow: 0 0 0 3px rgba(242, 107, 29, 0.1);
    background: white;
  }

  &::placeholder {
    color: #999;
    font-weight: 400;
  }
`;

export const Button = styled.input`
  background: #F26B1D;
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 18px 30px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #F24452;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(242, 107, 29, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Linking = styled.a`
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  margin-top: 30px;
  color: #1E594E;
  font-family: 'Roboto', sans-serif;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    color: #F26B1D;
    transform: translateY(-1px);
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, #1E594E, transparent);
  margin: 30px 0;
  opacity: 0.3;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
