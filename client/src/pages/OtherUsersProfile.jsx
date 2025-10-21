import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Post from '../components/Post'
import api from '../utils/api'
import MainNav from '../components/MainNav'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { useScrollToBottom } from '../hooks/useScrollToBottom'
import {mobile} from '../responsive'
import { useLocation } from 'react-router-dom';
import { getProfilePicture } from '../utils/profilePicture';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #F2F2F2;
  min-height: 100vh;
`

const PostsContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  padding: 30px 0;
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  /* Responsive breakpoints */
  @media (max-width: 1199px) {
    max-width: 800px;
  }
  
  @media (max-width: 799px) {
    flex-direction: column;
    padding: 20px 15px;
    gap: 20px;
    max-width: 400px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
  max-width: 350px;
  min-width: 0; /* Prevents flex items from overflowing */
  
  @media (max-width: 1199px) {
    max-width: 350px;
  }
  
  @media (max-width: 799px) {
    max-width: 100%;
    gap: 20px;
  }
`;

const SmallNav = styled.div`
  margin: 20px 0px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  gap: 10px;
  ${mobile({
      width: "100%",
      overflow: "scroll",
      margin :"0",
      padding: "10px",
      gap: "5px"
    })}
`
const CoverPicture = styled.img`
  width: 100%;
  height: 300px;
  ${mobile({
      height: "150px"
    })}
`
const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1E594E;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  ${mobile({
      width : "100px",
      height: "100px",
    })}
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  ${mobile({
    flexDirection: "column",
    textAlign: "center",
    gap: "20px",
    padding: "20px"
  })}
`

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 50px;
  box-shadow: 10px gray;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  ${mobile({
     margin : "0",
     width : "100vw"
    })}
`
const Username = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: #1E594E;
  font-family: 'Roboto', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  ${mobile({
      fontSize: "24px",
    })}
`;
const OptionButton = styled.button`
  border: none;
  background: ${(props) => (props.selected ? '#1E594E' : 'transparent')};
  color: ${(props) => (props.selected ? '#F2F2F2' : '#1E594E')};
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 2px solid ${(props) => (props.selected ? '#1E594E' : 'transparent')};

  &:hover {
    background: ${(props) => (props.selected ? '#1E594E' : '#F2B035')};
    color: ${(props) => (props.selected ? '#F2F2F2' : '#1E594E')};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;


export default function OtherUsersProfile() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const username = params.get('username');
  const [selectedOption, setSelectedOption] = useState('created');
  const [user, setUser] = useState(null);
  const [id,setId] = useState(null);
  const [numColumns, setNumColumns] = useState(2);
  const [loading, setLoading] = useState(true);

  // Infinite scroll hooks for created and saved posts
  const createdPostsHook = useInfiniteScroll(username ? `/lists/${username}` : null, { limit: 12 });
  const savedPostsHook = useInfiniteScroll(id ? `/lists/saved/${id}` : null, { limit: 12 });

  // Auto-load more posts when user scrolls to bottom
  useScrollToBottom(
    selectedOption === 'created' ? createdPostsHook.loadMore : savedPostsHook.loadMore,
    selectedOption === 'created' ? createdPostsHook.hasMore : savedPostsHook.hasMore,
    selectedOption === 'created' ? createdPostsHook.loading : savedPostsHook.loading
  );

  // Function to distribute posts across dynamic columns
  const distributePosts = (posts, numColumns) => {
    const postsArray = posts.posts;
    const columns = Array.from({ length: numColumns }, () => []);
    postsArray.forEach((post, index) => {
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

  useEffect(() => {
    //getting the user with username = username
    console.log(username)
    api.get(`/users/username/${username}`)
    .then(response => {
      console.log(response)
      console.log(response.data)
      setUser(response.data.user)
      setId(response.data.user._id)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [username])

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

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const displayCreatedPosts = () => {
    if (createdPostsHook.loading && createdPostsHook.data.length === 0) return <h3>Loading...</h3>;
    if (createdPostsHook.data.length === 0) return <h3>No created posts found</h3>;
    
    const columns = distributePosts({ posts: createdPostsHook.data }, numColumns);
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
        {createdPostsHook.loading && createdPostsHook.data.length > 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h4>Loading more posts...</h4>
          </div>
        )}
        {!createdPostsHook.hasMore && createdPostsHook.data.length > 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            <p>You've reached the end! No more posts to load.</p>
          </div>
        )}
        {createdPostsHook.error && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#e74c3c' }}>
            <p>Error loading posts: {createdPostsHook.error}</p>
          </div>
        )}
      </>
    );
  };

  const displaySavedPosts = () => {
    if (savedPostsHook.loading && savedPostsHook.data.length === 0) return <h3>Loading...</h3>;
    if (savedPostsHook.data.length === 0) return <h3>No saved posts found</h3>;
    
    const columns = distributePosts({ posts: savedPostsHook.data }, numColumns);
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
        {savedPostsHook.loading && savedPostsHook.data.length > 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h4>Loading more posts...</h4>
          </div>
        )}
        {!savedPostsHook.hasMore && savedPostsHook.data.length > 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            <p>You've reached the end! No more posts to load.</p>
          </div>
        )}
        {savedPostsHook.error && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#e74c3c' }}>
            <p>Error loading posts: {savedPostsHook.error}</p>
          </div>
        )}
      </>
    );
  };
  

  if (loading) {
    return (
      <div>
        <MainNav/>
        <Container>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Loading...</h2>
          </div>
        </Container>
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        <MainNav/>
        <Container>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>User not found</h2>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div>
      <MainNav/>
      <Container>
        <ProfileHeader>
          <ProfilePicture src={getProfilePicture(user.profileImg)} />
          <ProfileInfo>
            <Username>{user.username}</Username>
          </ProfileInfo>
        </ProfileHeader>
        
        <SmallNav>
          <OptionButton selected={selectedOption === 'created'} onClick={() => handleOptionChange('created')}>
            Created
          </OptionButton>
          <OptionButton selected={selectedOption === 'saved'} onClick={() => handleOptionChange('saved')}>
            Saved
          </OptionButton>
        </SmallNav>
        
        {selectedOption === 'created' ? displayCreatedPosts() : displaySavedPosts()}
      </Container>
    </div>
  )
}
