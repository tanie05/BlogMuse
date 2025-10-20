import styled from 'styled-components';
import { mobile } from '../../responsive';

export const Container = styled.div`
  margin: 50px;
  ${mobile({
    margin: "0px"
  })}
`;
