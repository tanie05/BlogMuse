import { useEffect } from 'react';

export const useScrollToBottom = (callback, hasMore, loading) => {
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to bottom (with some buffer)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Trigger when user is within 200px of bottom
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 200;
      
      if (isNearBottom && hasMore && !loading) {
        callback();
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, hasMore, loading]);
};
