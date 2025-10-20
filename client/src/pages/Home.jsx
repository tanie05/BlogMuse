import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../utils/api'
import Slider from '../components/Slider'
import styled from 'styled-components'
import Post from '../components/Post'
import { v4 as uuidv4 } from 'uuid';
import {mobile} from '../responsive'

const Container = styled.div`
  margin: 50px;
  ${mobile({
    margin: "0px"
  })}
`
export default function Home() {
  
  const [posts,setPosts] = useState([])

  useEffect(() => {
    api.get('/posts')
    .then((response) => {
      setPosts(response.data.posts || response.data)
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
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
        {posts.length===0 ? <h3>Loading...</h3> : displayPost}
        {/* {displayPost} */}
      </Container>
    </div>

  )
}

