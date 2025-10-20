import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Post from '../components/Post'
import api from '../utils/api'
import MainNav from '../components/MainNav'
import {mobile} from '../responsive'
import { useLocation } from 'react-router-dom';

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


export default function OtherUsersProfile() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const username = params.get('username');
  const [selectedOption, setSelectedOption] = useState('created');
  const [createdPosts, setCreatedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [user, setUser] = useState({});
  const [id,setId] = useState(0);

  function fetchingPost() {

        //getting all created posts
        api.get(`/lists/${username}`)
        .then(response => {
          setCreatedPosts(response.data)
        })
        .catch(err => console.log(err))
    
  }
  useEffect(() => {
    //getting the user with username = username
    api.get(`/users/username/${username}`)
    .then(response => {
      setUser(response.data[0])
      setId(response.data[0]._id)
      fetchingPost();
    })
    .catch(err => console.log(err))

    //getting all saved posts by user
    api.get(`/lists/saved/${id}`)
    .then(response => {
      setSavedPosts(response.data)
    })
    .catch(err => console.log(err))
      }, [id])
  

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
   

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
        </SmallNav>
        {selectedOption === 'created' ? displayCreatedPosts : displaySavedPosts}
      </Container>
    </div>
  )
}
