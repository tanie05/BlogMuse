import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Slider from '../components/Slider'
import styled from 'styled-components'
import Post from '../components/Post'
import baseUrl from '../appConfig'
import { v4 as uuidv4 } from 'uuid';
import {mobile} from '../responsive'

const Container = styled.div`
  margin: 50px;
  ${mobile({
    margin: "0px"
  })}
`
export default function Home() {
  console.log("hey")
  const [posts,setPosts] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/posts`)
    .then((response) => {
      setPosts(response.data)
    })
  }, [])

  
  const displayPost = posts.map((item) => {
    return (<Post item = {item} key = {uuidv4()} />)
  })
  
  return (
    <div>

      <Navbar/>
      <Slider/>
      <Container>
        {displayPost}
      </Container>
    </div>

  )
}

