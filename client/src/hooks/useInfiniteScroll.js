import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export const useInfiniteScroll = (endpoint, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const limit = options.limit || 12;

  const fetchData = useCallback(async (reset = false) => {
    if (loading || !endpoint || endpoint.includes('null') || endpoint.includes('undefined')) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const currentOffset = reset ? 0 : offset;
      const response = await api.get(`${endpoint}?offset=${currentOffset}&limit=${limit}`);
      
      const newPosts = response.data.posts || response.data;
      const hasMoreData = response.data.hasMore;
      const total = response.data.totalPosts || 0;
      
      if (reset) {
        setData(newPosts);
        setOffset(limit);
      } else {
        setData(prevData => [...prevData, ...newPosts]);
        setOffset(prevOffset => prevOffset + limit);
      }
      
      setHasMore(hasMoreData);
      setTotalPosts(total);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, limit, offset, loading]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchData(false);
    }
  }, [hasMore, loading, fetchData]);

  const reset = useCallback(() => {
    setData([]);
    setOffset(0);
    setHasMore(true);
    setError(null);
  }, []);

  // Initial load - only when endpoint changes and is valid
  useEffect(() => {
    if (endpoint && !endpoint.includes('null') && !endpoint.includes('undefined')) {
      setData([]);
      setOffset(0);
      setHasMore(true);
      setError(null);
      setLoading(true);
      
      // Fetch initial data
      const fetchInitialData = async () => {
        try {
          const response = await api.get(`${endpoint}?offset=0&limit=${limit}`);
          const newPosts = response.data.posts || response.data;
          const hasMoreData = response.data.hasMore;
          const total = response.data.totalPosts || 0;
          
          setData(newPosts);
          setOffset(limit);
          setHasMore(hasMoreData);
          setTotalPosts(total);
        } catch (err) {
          setError(err.message);
          console.error('Error fetching data:', err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchInitialData();
    }
  }, [endpoint, limit]);

  return {
    data,
    loading,
    hasMore,
    error,
    loadMore,
    reset,
    totalPosts
  };
};