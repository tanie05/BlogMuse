import React from 'react';
import { Link } from 'react-router-dom';
import { usePostLogic } from './postLogic';
import { 
  PostContainer, 
  Image, 
  Written, 
  Title, 
  Author, 
  Button, 
  SaveButton, 
  ButtonContainer
} from './postStyles';

export default function Post(props) {
  const { userInfo, isSaved, loading, handleSaveToggle } = usePostLogic(props.item);
  const item = props.item;

  return (
    <PostContainer>
      {item.cover && <Image src={item.cover} alt={item.title} />}
      <Written>
        <Title>{item.title}</Title>
        
        <Author to={userInfo.username === item.author ? 
          `/profile` 
          :
          `/userprofile?username=${item.author}`}>
          By {item.author}
        </Author>
        
        <ButtonContainer>
          <Link to={`/${item._id}`} state={item._id}>
            <Button>Read More</Button>
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
  );
}
