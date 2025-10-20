import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Navigate, useLocation } from 'react-router-dom';
import styled from "styled-components"
import api from '../utils/api';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import {mobile} from '../responsive'

const Container = styled.div`
margin: 10px 100px;
text-align: center;
font-family: roboto;
${mobile({
     margin : "0",
    })}
`
const Title = styled.h1`
  font-family: 'Libre Baskerville', serif;
  font-size: 90px;
  padding: 20px;
  margin-bottom: 0;
  ${mobile({
     padding: "0",
     margin : "0",
     fontSize: "30px",
    })}
`
const Cover = styled.img`
  width: 600px;
  height: 600px;
  object-fit: cover;
  ${mobile({
     width: "100vw",
     height: "250px",
    })}
  
`
const Description = styled.div`
text-align: left;
font-size: 20px;
margin: 20px 10px;
${mobile({
     fontSize: "10px"
    })}
`
const AuthorDetails = styled(Link)`
display: block;
font-size: 20px;
padding: 5px;
color: gray;
text-decoration: none;

`
const Content = styled.div`
  text-align: left;
  font-size: 30px;
  margin: 40px 0px;
  padding: 10px;
  font-family: roboto;
  ${mobile({
     fontSize : "20px",
     height: "500px",
     overflow:"scroll"
    })}

`
const SmallNav = styled.div`
  height: 50px;
  text-align: right;
`
const NavBtn = styled.button`
  background-color: #0a4423;
  color: white;
  font-size: 20px;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  ${mobile({
     fontSize: "10px",
     padding: "3px"
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
        {userInfo.flag && 
          <SmallNav>
            {   isAuthor===true ?
            <>
            <Link to= {'/create'} state={post}>
                <NavBtn>
                  Edit
                </NavBtn> 
                </Link>
                <NavBtn onClick={handleDelete}>Delete</NavBtn>
            </>    :
            <NavBtn onClick={handleSave}>
             {saved? "Saved" : "Save"}
            </NavBtn> 
            }
          </SmallNav>
        }
        
        <Title>{post.title}</Title>
        {/* <AuthorDetails>-{post.author}</AuthorDetails> */}
        <AuthorDetails to={ userInfo.username === post.author ? 
          `/profile` 
          :
          `/userprofile?username=${post.author}`}>
          -{post.author}
          </AuthorDetails>
        <Cover src = {post.cover} />
        <Description>{post.description}</Description>
          <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>

    </div>
    
  )
}