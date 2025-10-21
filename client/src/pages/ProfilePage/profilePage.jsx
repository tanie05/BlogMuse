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
  const { user, savedPosts, createdPosts, selectedOption, handleOptionChange } = useProfilePageLogic();
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
    if (createdPosts.length === 0) return <h3>Loading...</h3>;
    
    const columns = distributePosts(createdPosts, numColumns);
    return (
      <PostsContainer>
        {columns.map((columnPosts, index) => (
          <Column key={index}>
            {columnPosts.map((item) => (
              <Post item={item} key={uuidv4()} />
            ))}
          </Column>
        ))}
      </PostsContainer>
    );
  };

  const displaySavedPosts = () => {
    if (savedPosts.length === 0) return <h3>Loading...</h3>;
    
    const columns = distributePosts(savedPosts, numColumns);
    return (
      <PostsContainer>
        {columns.map((columnPosts, index) => (
          <Column key={index}>
            {columnPosts.map((item) => (
              <Post item={item} key={uuidv4()} />
            ))}
          </Column>
        ))}
      </PostsContainer>
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