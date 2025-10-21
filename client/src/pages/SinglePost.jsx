import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Navigate, useLocation } from 'react-router-dom';
import styled from "styled-components"
import api from '../utils/api';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import {mobile} from '../responsive'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #F2F2F2;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  
  ${mobile({
    padding: "20px 10px",
    margin: "0",
  })}
`
const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #1E594E;
  text-align: center;
  padding: 30px 0;
  margin: 0 0 20px 0;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  ${mobile({
    fontSize: "32px",
    padding: "20px 0",
    margin: "0 0 15px 0",
  })}
`
const Cover = styled.img`
  width: 100%;
  max-width: 800px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin: 20px auto;
  display: block;
  
  ${mobile({
    height: "250px",
    margin: "15px auto",
  })}
`
const Description = styled.div`
  text-align: center;
  font-size: 20px;
  color: #666;
  font-style: italic;
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #1E594E;
  
  ${mobile({
    fontSize: "16px",
    margin: "15px 0",
    padding: "15px",
  })}
`
const AuthorDetails = styled(Link)`
  display: inline-block;
  font-size: 18px;
  padding: 10px 20px;
  color: #1E594E;
  text-decoration: none;
  background: white;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 10px 0;
  font-weight: 600;

  &:hover {
    background: #1E594E;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 89, 78, 0.3);
  }
`
const Content = styled.div`
  text-align: left;
  font-size: 18px;
  line-height: 1.8;
  margin: 40px 0;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  color: #333;
  
  /* Rich text editor content styling */
  h1, h2, h3, h4, h5, h6 {
    color: #1E594E;
    margin: 20px 0 10px 0;
  }
  
  p {
    margin: 15px 0;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 15px 0;
  }
  
  ${mobile({
    fontSize: "16px",
    padding: "20px",
    margin: "20px 0",
  })}
`
const SmallNav = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`
const NavBtn = styled.button`
  background: linear-gradient(135deg, #1E594E 0%, #2A6B5F 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(30, 89, 78, 0.3);

  &:hover {
    background: linear-gradient(135deg, #2A6B5F 0%, #1E594E 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 89, 78, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  ${mobile({
    fontSize: "14px",
    padding: "10px 20px",
  })}
`

const PostMeta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  ${mobile({
    flexDirection: "column",
    gap: "10px",
    padding: "15px",
  })}
`

const SaveButton = styled.button`
  background: ${props => props.saved ? '#F24452' : '#F2B035'};
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${props => props.saved ? '#D63E4A' : '#F26B1D'};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  ${mobile({
    fontSize: "14px",
    padding: "10px 20px",
  })}
`



export default function SinglePost() {
  const location = useLocation();
  const postId = location.state;
  const [post,setPost] = useState(null);
  const {userInfo,setUserInfo} = useContext(UserContext)
  const [saved,setSaved] = useState();
  const [isAuthor, setIsAuthor] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [redirectSave, setRedirectSave] = useState(false);
 
 
  useEffect(() => {
    api.get(`/posts/${postId}`)
    .then(response => {
      setPost(response.data.post);
      
      if(userInfo.flag){
        const isPostSaved = userInfo.savedPosts.includes(postId);
        setSaved(isPostSaved);
        setIsAuthor(response.data.post.author === userInfo.username);
      }
    })
    .catch(err => console.log(err))
  },[userInfo.flag, userInfo.savedPosts, postId])

  function handleDelete() {
  
        api.delete(`/posts/${postId}`)
        .then(() => {
          setRedirect(true)
        })
        .catch(err => console.log(err))
    
  }
  async function handleUserUpdate() {

    try {
            await api.put(`/users/${userInfo._id}`, {
            savedPosts: userInfo.savedPosts,})
            .then(res => console.log(res))
          } catch (error) {
            console.error(error);
        }
  }
    

  async function handleSave() {
    if (!userInfo.flag) {
      alert("Please login to save posts.");
      return;
    }

    try {
      if (saved) {
        await api.post(`/posts/${postId}/unsave`);
        setSaved(false);
        // Update user context to remove from saved posts
        setUserInfo(prev => ({
          ...prev,
          savedPosts: prev.savedPosts.filter(id => id !== postId)
        }));
      } else {
        await api.post(`/posts/${postId}/save`);
        setSaved(true);
        // Update user context to add to saved posts
        setUserInfo(prev => ({
          ...prev,
          savedPosts: [...prev.savedPosts, postId]
        }));
      }
      
      // Update the post's save count
      setPost(prev => ({
        ...prev,
        numberOfSaved: saved ? prev.numberOfSaved - 1 : prev.numberOfSaved + 1
      }));
      
    } catch (error) {
      console.error('Error saving/unsaving post:', error);
      alert('Error saving/unsaving post');
    }
  }
  

  if(redirect){
    return <Navigate to={"/"}/>
  }
  if(redirectSave){
    
    handleUserUpdate()
    
  }
  if (post === null) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <Navbar/>
      <Container>
        <Title>{post.title}</Title>
        
        <PostMeta>
          <AuthorDetails to={ userInfo.username === post.author ? 
            `/profile` 
            :
            `/userprofile?username=${post.author}`}>
            By {post.author}
          </AuthorDetails>
          
          {userInfo.flag && (
            isAuthor ? (
              <SmallNav>
                <Link to={'/create'} state={post}>
                  <NavBtn>Edit</NavBtn> 
                </Link>
                <NavBtn onClick={handleDelete}>Delete</NavBtn>
              </SmallNav>
            ) : (
              <SaveButton saved={saved} onClick={handleSave}>
                {saved ? "Saved" : "Save"}
              </SaveButton>
            )
          )}
        </PostMeta>
        
        {post.cover && <Cover src={post.cover} alt={post.title} />}
        
        {post.description && <Description>{post.description}</Description>}
        
        <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>
    </div>
  )
}