import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Slider from '../components/Slider'
import styled from 'styled-components'
import Post from '../components/Post'

const Container = styled.div`
  margin: 50px;
`
export default function Home() {

  const [posts,setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
    .then((response) => {
      setPosts(response.data)
    })
  }, [])

  
  const displayPost = posts.map((item) => {
    return (<Post item = {item} />)
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

