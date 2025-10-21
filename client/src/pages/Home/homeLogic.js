import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';

export const useHomeLogic = () => {
  const {
    data: posts,
    loading,
    hasMore,
    error,
    loadMore,
    totalPosts
  } = useInfiniteScroll('/posts', { limit: 12 });

  // Auto-load more posts when user scrolls to bottom
  useScrollToBottom(loadMore, hasMore, loading);

  return { 
    posts, 
    loading, 
    hasMore, 
    error, 
    totalPosts 
  };
};
