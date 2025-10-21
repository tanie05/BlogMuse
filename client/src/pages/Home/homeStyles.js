import styled from 'styled-components';
import { mobile } from '../../responsive';

export const Container = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  padding: 30px 50px;
  max-width: 1400px;
  margin: 0 auto;
  
  /* Responsive breakpoints */
  @media (max-width: 1199px) {
    max-width: 800px;
  }
  
  @media (max-width: 799px) {
    flex-direction: column;
    padding: 20px 15px;
    gap: 20px;
    max-width: 400px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
  max-width: 350px;
  min-width: 0; /* Prevents flex items from overflowing */
  
  @media (max-width: 1199px) {
    max-width: 350px;
  }
  
  @media (max-width: 799px) {
    max-width: 100%;
    gap: 20px;
  }
`;
