import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  h1 {
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

export const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const PostCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const PostTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const PostDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PostAuthor = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const PostDate = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0.5rem;
`;

export const SaveCount = styled.p`
  color: #888;
  font-size: 0.8rem;
  margin: 0;
`;

export const NoPostsMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-top: 3rem;
`;
