import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {mobile} from '../responsive'

const PostContainer = styled.div`
display: flex;
padding: 30px;
margin: 10px;
font-family: 'Poppins', sans-serif;
${mobile({
      width: "100vw",
      margin: "0",
      padding: "0",
      display: "flex",
      flexDirection: "column",
     

    })}
`
const Image = styled.img`

width: 250px;
height:250px;
object-fit: cover;
${mobile({
      width: "100vw",
      height: "300px",
  
    })}

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
${mobile({
      fontSize : "30px",
      margin : "0"
})}

`
const Description = styled.div`
 margin: 10px 40px;
  font-size: 21px;
  height: 50px;
  overflow: hidden;
  ${mobile({
      fontSize: "15px",
      margin: "0",
    })}

  
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
  ${mobile({
      fontSize: "15px",
      margin: "0",
    })}

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
