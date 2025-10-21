import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { getSavedPosts } from '../../utils/api';

export const useSavedPostsLogic = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (!userInfo.flag) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getSavedPosts(userInfo._id);
        
        if (response.success) {
          setPosts(response.posts);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch saved posts');
        console.error('Error fetching saved posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, [userInfo]);

  return {
    posts,
    loading,
    error
  };
};
