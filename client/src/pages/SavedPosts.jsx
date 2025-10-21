import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSavedPostsLogic } from './SavedPosts/SavedPostsLogic';
import { Container, PostsContainer, PostCard, PostTitle, PostDescription, PostAuthor, PostDate, NoPostsMessage, PostImage, PostMeta, SaveCount } from './SavedPosts/SavedPostsStyles';

export default function SavedPosts() {
  const { posts, loading, error } = useSavedPostsLogic();
  const [imageErrors, setImageErrors] = useState({});

  // Handle image load error
  const handleImageError = (postId) => {
    setImageErrors(prev => ({ ...prev, [postId]: true }));
  };

  // Format the created date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <Container>
        <h1>Saved Posts</h1>
        <div>Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <h1>Saved Posts</h1>
        <div>Error: {error}</div>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Saved Posts</h1>
      {posts.length === 0 ? (
        <NoPostsMessage>No saved posts yet.</NoPostsMessage>
      ) : (
        <PostsContainer>
          {posts.map((post) => (
            <Link key={post._id} to={`/${post._id}`} state={post._id}>
              <PostCard>
                <PostTitle>{post.title}</PostTitle>
                
                {post.cover && !imageErrors[post._id] && (
                  <PostImage 
                    src={post.cover} 
                    alt={post.title} 
                    onError={() => handleImageError(post._id)}
                  />
                )}
                
                <PostDescription>{post.desc}</PostDescription>
                
                <PostMeta>
                  <PostAuthor>By: {post.author}</PostAuthor>
                  <PostDate>{formatDate(post.createdAt)}</PostDate>
                </PostMeta>
                
                <SaveCount>{post.numberOfSaved || 0} saves</SaveCount>
              </PostCard>
            </Link>
          ))}
        </PostsContainer>
      )}
    </Container>
  );
}
