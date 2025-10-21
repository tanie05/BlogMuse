import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import api from '../../utils/api';

export const useProfilePageLogic = () => {
  const [user, setUser] = useState({});
  const { userInfo } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState('created');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // Created posts infinite scroll
  const createdPostsHook = useInfiniteScroll(userInfo.username ? `/lists/${userInfo.username}` : null, { limit: 12 });
  const savedPostsHook = useInfiniteScroll(userInfo._id ? `/lists/saved/${userInfo._id}` : null, { limit: 12 });

  // Auto-load more posts when user scrolls to bottom
  useScrollToBottom(
    selectedOption === 'created' ? createdPostsHook.loadMore : savedPostsHook.loadMore,
    selectedOption === 'created' ? createdPostsHook.hasMore : savedPostsHook.hasMore,
    selectedOption === 'created' ? createdPostsHook.loading : savedPostsHook.loading
  );

  useEffect(() => {
    api.get(`/users/${userInfo._id}`)
      .then(response => {
        setUser(response.data.user || response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return {
    user,
    savedPosts: savedPostsHook.data,
    createdPosts: createdPostsHook.data,
    savedLoading: savedPostsHook.loading,
    createdLoading: createdPostsHook.loading,
    savedHasMore: savedPostsHook.hasMore,
    createdHasMore: createdPostsHook.hasMore,
    savedError: savedPostsHook.error,
    createdError: createdPostsHook.error,
    selectedOption,
    handleOptionChange
  };
};
