import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Navigate, useLocation } from 'react-router-dom';
import styled from "styled-components"
import axios from 'axios';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import baseUrl from '../appConfig'
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
    axios.get(`${baseUrl}/posts/${postId}`)
    .then(response => {
      
      setPost(response.data);
      
      if(userInfo.flag){
        const isSaved = userInfo.savedPosts.includes(postId)
        // console.log(isSaved)
        setSaved(isSaved)
        setIsAuthor(response.data.author === userInfo.username)
      }
      
    })
    .catch(err => console.log(err))
  },[])

  function handleDelete() {
  
        axios.delete(`${baseUrl}/posts/${postId}`)
        .then(() => {
          setRedirect(true)
        })
        .catch(err => console.log(err))
    
  }
  async function handleUserUpdate() {

    try {
            await axios.put(`${baseUrl}/users/${userInfo._id}`, {
            savedPosts: userInfo.savedPosts,})
            .then(res => console.log(res))
          } catch (error) {
            console.error(error);
        }
  }
    

  async function handleSave() {
    const val = saved;
    let updatedSavedArray = userInfo.savedPosts;
    let updatedNumberOfSaves = post.numberOfSaved ;
    // setNumSaved(post.numberOfSaved)

   if(val){
      updatedSavedArray = updatedSavedArray.filter((item) => item !== postId)
      updatedNumberOfSaves -= 1 
      
    }
    else{
      updatedSavedArray.push(postId)
      updatedNumberOfSaves += 1
    } 
    setSaved(!saved)
    
    //update userInfo 
    // console.log(updatedSavedArray)
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      savedPosts: updatedSavedArray,
    }));

   

    //updating post
    try{
      axios.put(`${baseUrl}/posts/${postId}`, {
        numberOfSaved : updatedNumberOfSaves
      })
      .then(res => console.log(res))
    }
    catch(err) {
      console.log(err)
    }
    setRedirectSave(true);
    
    

    
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