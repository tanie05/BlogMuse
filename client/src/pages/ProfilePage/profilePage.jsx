import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Post from '../../components/Post';
import MainNav from '../../components/MainNav';
import { useProfilePageLogic } from './profilePageLogic';
import { getProfilePicture } from '../../utils/profilePicture';
import { 
  Container, 
  SmallNav, 
  CoverPicture, 
  ProfilePicture, 
  ImageContainer, 
  Username, 
  OptionButton, 
  SmallNavItems,
  PostsContainer,
  Column,
  ProfileHeader,
  ProfileInfo,
  ProfileActions
} from './profilePageStyles';

export default function ProfilePage() {
  const { 
    user, 
    savedPosts, 
    createdPosts, 
    savedLoading,
    createdLoading,
    savedHasMore,
    createdHasMore,
    savedError,
    createdError,
    selectedOption, 
    handleOptionChange
  } = useProfilePageLogic();
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

  const displayCreatedPosts = () => {
    if (createdLoading && createdPosts.length === 0) return <h3>Loading...</h3>;
    if (createdPosts.length === 0) return <h3>No created posts found</h3>;
    
    const columns = distributePosts(createdPosts, numColumns);
    return (
      <>
        <PostsContainer>
          {columns.map((columnPosts, index) => (
            <Column key={index}>
              {columnPosts.map((item) => (
                <Post item={item} key={uuidv4()} />
              ))}
            </Column>
          ))}
        </PostsContainer>
        {createdLoading && createdPosts.length > 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h4>Loading more posts...</h4>
          </div>
        )}
        {!createdHasMore && createdPosts.length > 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            <p>You've reached the end! No more posts to load.</p>
          </div>
        )}
        {createdError && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#e74c3c' }}>
            <p>Error loading posts: {createdError}</p>
          </div>
        )}
      </>
    );
  };

  const displaySavedPosts = () => {
    if (savedLoading && savedPosts.length === 0) return <h3>Loading...</h3>;
    if (savedPosts.length === 0) return <h3>No saved posts found</h3>;
    
    const columns = distributePosts(savedPosts, numColumns);
    return (
      <>
        <PostsContainer>
          {columns.map((columnPosts, index) => (
            <Column key={index}>
              {columnPosts.map((item) => (
                <Post item={item} key={uuidv4()} />
              ))}
            </Column>
          ))}
        </PostsContainer>
        {savedLoading && savedPosts.length > 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h4>Loading more posts...</h4>
          </div>
        )}
        {!savedHasMore && savedPosts.length > 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            <p>You've reached the end! No more posts to load.</p>
          </div>
        )}
        {savedError && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#e74c3c' }}>
            <p>Error loading posts: {savedError}</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <MainNav />
      <Container>
        <ProfileHeader>
          <ProfilePicture src={getProfilePicture(user.profileImg)} />
          <ProfileInfo>
            <Username>{user.username}</Username>
            <ProfileActions>
              <SmallNavItems to={'/create'}>Create New Blog</SmallNavItems>
              <SmallNavItems to={'/update'}>Update Profile</SmallNavItems>
            </ProfileActions>
          </ProfileInfo>
        </ProfileHeader>

        <SmallNav>
          <OptionButton 
            selected={selectedOption === 'created'} 
            onClick={() => handleOptionChange('created')}
          >
            Created
          </OptionButton>
          <OptionButton 
            selected={selectedOption === 'saved'} 
            onClick={() => handleOptionChange('saved')}
          >
            Saved
          </OptionButton>
        </SmallNav>

        {selectedOption === 'created' ? displayCreatedPosts() : displaySavedPosts()}
      </Container>
    </div>
  );
}