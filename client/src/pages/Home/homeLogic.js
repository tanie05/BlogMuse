import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../appConfig';

export const useHomeLogic = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/posts`)
      .then((response) => {
        setPosts(response.data.posts || response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return { posts };
};
