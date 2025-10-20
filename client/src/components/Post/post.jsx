import React from 'react';
import { Link } from 'react-router-dom';
import { usePostLogic } from './postLogic';
import { 
  PostContainer, 
  Image, 
  Written, 
  Title, 
  Description, 
  Author, 
  Button, 
  SaveButton, 
  ButtonContainer 
} from './postStyles';

export default function Post(props) {
  const { userInfo, isSaved, loading, handleSaveToggle } = usePostLogic(props.item);
  const item = props.item;

  return (
    <div>
      <hr />
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
