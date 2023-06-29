import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const PostContainer = styled.div`
display: flex;
padding: 30px;
margin: 10px;
font-family: 'Poppins', sans-serif;
`
const Image = styled.img`

width: 250px;
height:250px;
object-fit: cover;

`
const Written = styled.div`
flex: 1;
position: relative;

`
const Title = styled.h1`
font-family: 'Libre Baskerville', serif;
margin: 10px 40px;
font-size: 58px;
height: 135px;
overflow: hidden;


`
const Description = styled.div`
 margin: 10px 40px;
  font-size: 21px;
  height: 50px;
  overflow: hidden;

  
`
const Author = styled.span`
margin: 10px 40px;
color: gray;
`
const Button = styled.button`
  margin: 10px 40px;
  font-size: 20px;
  background-color: #0a4423;
  color: white;
  padding: 3px;
  position: absolute;
  bottom: 0;
  cursor: pointer;

`
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
