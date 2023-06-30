import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Post from '../components/Post'
import { UserContext } from '../UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MainNav from '../components/MainNav'
import baseUrl from '../appConfig'

const Container = styled.div`

`

const SmallNav = styled.div`
  
  margin: 10px 0px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
  

`
const CoverPicture = styled.img`
  width: 100%;
  height: 300px;
`
const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: -75px; 
`
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 50px;
  box-shadow: 10px gray;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`
const Username = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  font-family: 'ruleway';
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
`

export default function ProfilePage() {

  const [user,setUser] = useState({})
  const [savedPosts, setSavedPosts] = useState([])
  const [createdPosts, setCreatedPosts] = useState([])
  const {userInfo, setUserInfo} = useContext(UserContext)
  const [selectedOption, setSelectedOption] = useState('created');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect( () => {
    
    axios.get(`${baseUrl}/users/${userInfo._id}`)
    .then(response => {
      setUser(response.data)
      
    })
    .catch(err => console.log(err))

    //getting all created posts
    axios.get(`${baseUrl}/lists/${userInfo.username}`)
    .then(response => {
      setCreatedPosts(response.data)
    })
    .catch(err => console.log(err))

    //getting all saved posts by user
    axios.get(`${baseUrl}/lists/saved/${userInfo._id}`)
    .then(response => {
      setSavedPosts(response.data)
    })
    .catch(err => console.log(err))
  }, [])
   

  const displayCreatedPosts = createdPosts.map((item) => {
    return <Post item = {item} />
  })
  const displaySavedPosts = savedPosts.map((item) => {
    return <Post item = {item} />
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
        {selectedOption === 'created' ? displayCreatedPosts : displaySavedPosts}
      </Container>
    </div>
  )
}
