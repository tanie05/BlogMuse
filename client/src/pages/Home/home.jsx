import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import { useHomeLogic } from './homeLogic';
import { Container } from './homeStyles';

export default function Home() {
  const { posts } = useHomeLogic();

  const displayPost = posts.map((item) => {
    return (<Post item={item} key={uuidv4()} />);
  });

  return (
    <div>
      <Navbar />
      <Container>
        {posts.length === 0 ? <h3>Loading...</h3> : displayPost}
      </Container>
    </div>
  );
}