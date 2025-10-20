import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import api from '../../utils/api';

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
      console.log('Attempting to save/unsave post:', item._id);
      console.log('User info:', userInfo);
      
      if (isSaved) {
        console.log('Unsaving post...');
        await api.post(`/posts/${item._id}/unsave`);
        setIsSaved(false);
        // Update user context to remove from saved posts
        setUserInfo(prev => ({
          ...prev,
          savedPosts: prev.savedPosts.filter(id => id !== item._id)
        }));
      } else {
        console.log('Saving post...');
        await api.post(`/posts/${item._id}/save`);
        setIsSaved(true);
        // Update user context to add to saved posts
        setUserInfo(prev => ({
          ...prev,
          savedPosts: [...prev.savedPosts, item._id]
        }));
      }
    } catch (error) {
      console.error('Error toggling save:', error);
      console.error('Error response:', error.response?.data);
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
