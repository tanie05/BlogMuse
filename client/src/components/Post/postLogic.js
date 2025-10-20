import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import baseUrl from '../../appConfig';

export const usePostLogic = (item) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if post is saved when component mounts
  useEffect(() => {
    if (userInfo.flag && item._id) {
      const isPostSaved = userInfo.savedPosts.includes(item._id);
      setIsSaved(isPostSaved);
    }
  }, [userInfo.flag, userInfo.savedPosts, item._id]);

  const handleSaveToggle = async () => {
    if (!userInfo.flag) {
      alert('Please login to save posts');
      return;
    }

    setLoading(true);
    try {
      if (isSaved) {
        await axios.post(`${baseUrl}/posts/${item._id}/unsave`);
        setIsSaved(false);
        // Update user context to remove from saved posts
        setUserInfo(prev => ({
          ...prev,
          savedPosts: prev.savedPosts.filter(id => id !== item._id)
        }));
      } else {
        await axios.post(`${baseUrl}/posts/${item._id}/save`);
        setIsSaved(true);
        // Update user context to add to saved posts
        setUserInfo(prev => ({
          ...prev,
          savedPosts: [...prev.savedPosts, item._id]
        }));
      }
    } catch (error) {
      console.error('Error toggling save:', error);
      alert('Error saving/unsaving post');
    } finally {
      setLoading(false);
    }
  };

  return {
    userInfo,
    isSaved,
    loading,
    handleSaveToggle
  };
};
