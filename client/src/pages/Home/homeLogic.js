import { useEffect, useState } from 'react';
import api from '../../utils/api';

export const useHomeLogic = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts')
      .then((response) => {
        setPosts(response.data.posts || response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return { posts };
};
