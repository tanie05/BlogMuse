import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {mobile} from '../responsive'
import { UserContext } from '../UserContext'
import { useContext } from 'react'
import api from '../utils/api'
const PostContainer = styled.div`
  display: flex;
  padding: 30px;
  font-family: 'Poppins', sans-serif;

  ${mobile({
    flexDirection: 'column',
    padding: "0px",
    margin: "0px",
  })}
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;

  ${mobile({
    width: '100%',
    height: 'auto',
  })}
`;

const Written = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-family: 'Libre Baskerville', serif;
  margin: 10px 40px;
  font-size: 58px;
  height: 135px;
  overflow: hidden;

  ${mobile({
    margin: "0",
    fontSize: '25px',
    height: 'auto',
  })}
`;

const Description = styled.div`
  margin: 10px 40px;
  font-size: 21px;
  height: 50px;
  overflow: hidden;

  ${mobile({
    margin: '0px',
    fontSize: '12px',
    height: '25px',
  })}
`;

const Author = styled(Link)`
  margin: 10px 40px;
  color: gray;
  text-decoration: none;

  ${mobile({
    margin: '10px 0px',
  })}
`;

const Button = styled.button`
  margin: 10px 40px;
  font-size: 20px;
  background-color: #0a4423;
  color: white;
  padding: 3px;
  bottom: 0;
  cursor: pointer;

  ${mobile({
    margin: '5px',
    fontSize: '10px',
    padding: '2px',
    
  })}
`;

const SaveButton = styled.button`
  margin: 10px 40px;
  font-size: 16px;
  background-color: ${props => props.saved ? '#28a745' : '#6c757d'};
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.saved ? '#218838' : '#5a6268'};
  }

  ${mobile({
    margin: '5px',
    fontSize: '12px',
    padding: '3px 6px',
  })}
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export default function Post(props) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const item = props.item;
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if post is saved when component mounts
  useEffect(() => {
    if (userInfo.flag && item._id) {
      const isPostSaved = userInfo.savedPosts.includes(item._id);
      setIsSaved(isPostSaved);
    }
  }, [userInfo.flag, userInfo.savedPosts, item._id]);

  const handleSaveToggle = async () => {
    if (!userInfo.flag) {
      alert('Please login to save posts');
      return;
    }

    setLoading(true);
    try {
      if (isSaved) {
        await api.post(`/posts/${item._id}/unsave`);
        setIsSaved(false);
        // Update user context to remove from saved posts
        setUserInfo(prev => ({
          ...prev,
          savedPosts: prev.savedPosts.filter(id => id !== item._id)
        }));
      } else {
        await api.post(`/posts/${item._id}/save`);
        setIsSaved(true);
        // Update user context to add to saved posts
        setUserInfo(prev => ({
          ...prev,
          savedPosts: [...prev.savedPosts, item._id]
        }));
      }
    } catch (error) {
      console.error('Error toggling save:', error);
      alert('Error saving/unsaving post');
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <div>
      <hr/>
      <PostContainer>
        <Image src={item.cover} />
        <Written>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
          <Author to={userInfo.username === item.author ? 
            `/profile` 
            :
            `/userprofile?username=${item.author}`}>
            -{item.author}
          </Author>
          
          <ButtonContainer>
            <Link to={`/${item._id}`} state={item._id}>
              <Button>Read Full Blog</Button>
            </Link>
            {userInfo.flag && (
              <SaveButton 
                saved={isSaved} 
                onClick={handleSaveToggle}
                disabled={loading}
              >
                {loading ? '...' : (isSaved ? 'Saved' : 'Save')}
              </SaveButton>
            )}
          </ButtonContainer>
        </Written>
      </PostContainer>
    </div>
  );
}
