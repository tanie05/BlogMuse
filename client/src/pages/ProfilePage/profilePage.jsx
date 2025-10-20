import React from 'react';
import Post from '../../components/Post';
import MainNav from '../../components/MainNav';
import { useProfilePageLogic } from './profilePageLogic';
import { 
  Container, 
  SmallNav, 
  CoverPicture, 
  ProfilePicture, 
  ImageContainer, 
  Username, 
  OptionButton, 
  SmallNavItems 
} from './profilePageStyles';

export default function ProfilePage() {
  const { user, savedPosts, createdPosts, selectedOption, handleOptionChange } = useProfilePageLogic();

  const displayCreatedPosts = createdPosts.map((item) => {
    return <Post item={item} key={item._id} />;
  });

  const displaySavedPosts = savedPosts.map((item) => {
    return <Post item={item} key={item._id} />;
  });

  return (
    <div>
      <MainNav />
      <Container>
        <ImageContainer>
          <CoverPicture src={user.coverImg} alt='cover picture' />
          <ProfilePicture src={user.profileImg} />
          <Username>{user.username}</Username>
        </ImageContainer>

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
          <SmallNavItems to={'/create'}>Create New Blog</SmallNavItems>
          <SmallNavItems to={'/update'}>Update Profile</SmallNavItems>
        </SmallNav>

        {selectedOption === 'created' ? 
          displayCreatedPosts.length > 0 ? displayCreatedPosts : <h3>Loading...</h3>
          : 
          displaySavedPosts.length > 0 ? displaySavedPosts : <h3>Loading...</h3>
        }
      </Container>
    </div>
  );
}