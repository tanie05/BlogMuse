import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Post from '../components/Post'
import { UserContext } from '../UserContext'
import api from '../utils/api'
import { Link } from 'react-router-dom'
import MainNav from '../components/MainNav'
import {mobile} from '../responsive'

const Container = styled.div`

`

const SmallNav = styled.div`
  
  margin: 10px 0px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
  ${mobile({
      width: "100%",
      overflow: "scroll",
      margin :"0",
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
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: -75px; 
  ${mobile({
      width : "100px",
      height: "100px",
    })}
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
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  font-family: 'ruleway';
  ${mobile({
      fontSize: "15px",
    })}
`;
const OptionButton = styled.button`
  border: none;
  background: transparent;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.selected ? 'blue' : 'black')};
  cursor: pointer;

  &:hover {
    color: #0a4423;
  }
`;

const SmallNavItems = styled(Link)`
  padding: 10px;
  color: #050505;
  text-decoration: none;
  ${mobile({
     
    })}
  
`



export default function ProfilePage() {

  const [user,setUser] = useState({})
  const [savedPosts, setSavedPosts] = useState([])
  const [createdPosts, setCreatedPosts] = useState([])
  const {userInfo } = useContext(UserContext)
  const [selectedOption, setSelectedOption] = useState('created');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    
    api.get(`/users/${userInfo._id}`)
    .then(response => {
      setUser(response.data.user || response.data)
    })
    .catch(err => console.log(err))

    //getting all created posts
    api.get(`/lists/${userInfo.username}`)
    .then(response => {
      setCreatedPosts(response.data.posts || response.data)
    })
    .catch(err => console.log(err))

    //getting all saved posts by user
    api.get(`/lists/saved/${userInfo._id}`)
    .then(response => {
      setSavedPosts(response.data.posts || response.data)
    })
    .catch(err => console.log(err))
  },[])
   

  const displayCreatedPosts = createdPosts.map((item) => {
    return <Post item = {item} key = {item._id} />
  })
  const displaySavedPosts = savedPosts.map((item) => {
    return <Post item = {item} key = {item._id}/>
  }
  )
  

  return (
    <div>
      
      <MainNav/>
      <Container>
        <ImageContainer>
        <CoverPicture src = {user.coverImg} alt='cover picture' />
        <ProfilePicture src = {user.profileImg} />
        <Username>{user.username}</Username>
        </ImageContainer>

        <SmallNav>
        <OptionButton selected={selectedOption === 'created'} onClick={() => handleOptionChange('created')}>
          Created
        </OptionButton>
        <OptionButton selected={selectedOption === 'saved'} onClick={() => handleOptionChange('saved')}>
          Saved
      </OptionButton>
        <SmallNavItems to={'/create'}>Create New Blog</SmallNavItems>
        <SmallNavItems to = {'/update'}>Update Profile</SmallNavItems>
        </SmallNav>

        {
        selectedOption === 'created' ? 
        displayCreatedPosts.length>0 ? displayCreatedPosts : <h3>Loading...</h3>
        : 
        displaySavedPosts.length>0 ? displaySavedPosts : <h3>Loading...</h3>
        }
      </Container>
    </div>
  )
}
