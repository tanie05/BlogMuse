import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import { useHomeLogic } from './homeLogic';
import { Container, Column } from './homeStyles';

export default function Home() {
  const { posts, loading, hasMore, error, totalPosts } = useHomeLogic();
  const [numColumns, setNumColumns] = useState(2);

  // Function to distribute posts across dynamic columns
  const distributePosts = (posts, numColumns) => {
    const columns = Array.from({ length: numColumns }, () => []);
    posts.forEach((post, index) => {
      columns[index % numColumns].push(post);
    });
    return columns;
  };

  // Get number of columns based on screen size
  const getColumnCount = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1200) return 3;
      if (width >= 800) return 2;
      return 1;
    }
    return 2; // Default fallback
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setNumColumns(getColumnCount());
    };

    // Set initial column count
    setNumColumns(getColumnCount());

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns = distributePosts(posts, numColumns);

  return (
    <div>
      <Navbar />
      <Container>
        {loading && posts.length === 0 ? (
          <h3>Loading...</h3>
        ) : posts.length === 0 ? (
          <h3>No posts found</h3>
        ) : (
          <>
            {columns.map((columnPosts, index) => (
              <Column key={index}>
                {columnPosts.map((item) => (
                  <Post item={item} key={uuidv4()} />
                ))}
              </Column>
            ))}
            {loading && posts.length > 0 && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h4>Loading more posts...</h4>
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                <p>You've reached the end! No more posts to load.</p>
              </div>
            )}
            {error && (
              <div style={{ textAlign: 'center', padding: '20px', color: '#e74c3c' }}>
                <p>Error loading posts: {error}</p>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}