import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {mobile} from '../responsive'

const PostContainer = styled.div`
  display: flex;
  padding: 30px;
  font-family: 'Poppins', sans-serif;

  ${mobile({
    flexDirection: 'column',
    padding: "0px",
    margin: "0px",
  })}
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;

  ${mobile({
    width: '100%',
    height: 'auto',
  })}
`;

const Written = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-family: 'Libre Baskerville', serif;
  margin: 10px 40px;
  font-size: 58px;
  height: 135px;
  overflow: hidden;

  ${mobile({
    margin: "0",
    fontSize: '25px',
    height: 'auto',
  })}
`;

const Description = styled.div`
  margin: 10px 40px;
  font-size: 21px;
  height: 50px;
  overflow: hidden;

  ${mobile({
    margin: '0px',
    fontSize: '12px',
    height: '25px',
  })}
`;

const Author = styled.span`
  margin: 10px 40px;
  color: gray;

  ${mobile({
    margin: '10px 0px',
  })}
`;

const Button = styled.button`
  margin: 10px 40px;
  font-size: 20px;
  background-color: #0a4423;
  color: white;
  padding: 3px;
  position: absolute;
  bottom: 0;
  cursor: pointer;

  ${mobile({
    margin: '5px',
    fontSize: '10px',
    padding: '2px',
    position: 'static',
  })}
`;
export default function Post(props) {

    const item = props.item;
    
    return (
        <div>
        <hr/>
        <PostContainer>
          <Image src = {item.cover} />
          <Written>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
          <Author>-{item.author}</Author>
          
          <Link to= {`/${item._id}`} state={item._id}>

          <Button>Read Full Blog</Button>
          </Link>
          </Written>
        </PostContainer>
        </div>
        
      )
}
