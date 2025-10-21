import React, { useState } from 'react';
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
  ButtonContainer,
  PostMeta,
  CreatedDate,
  SaveCount,
  MetaContainer
} from './postStyles';

export default function Post(props) {
  const { userInfo, isSaved, loading, handleSaveToggle } = usePostLogic(props.item);
  const item = props.item;
  const [imageError, setImageError] = useState(false);

  // Format the created date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <PostContainer>
      <Written>
        <Title>{item.title}</Title>
        
        {item.cover && !imageError && (
          <Image 
            src={item.cover} 
            alt={item.title} 
            onError={handleImageError}
          />
        )}
        
        <Author to={userInfo.username === item.author ? 
          `/profile` 
          :
          `/userprofile?username=${item.author}`}>
          By {item.author}
        </Author>

        <MetaContainer>
          <CreatedDate>{formatDate(item.createdAt)}</CreatedDate>
          <SaveCount>{item.numberOfSaved || 0} saves</SaveCount>
        </MetaContainer>
        
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
