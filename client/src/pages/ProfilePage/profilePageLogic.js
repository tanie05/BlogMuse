import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import api from '../../utils/api';

export const useProfilePageLogic = () => {
  const [user, setUser] = useState({});
  const [savedPosts, setSavedPosts] = useState([]);
  const [createdPosts, setCreatedPosts] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState('created');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    api.get(`/users/${userInfo._id}`)
      .then(response => {
        setUser(response.data.user || response.data);
      })
      .catch(err => console.log(err));

    // Getting all created posts
    api.get(`/lists/${userInfo.username}`)
      .then(response => {
        setCreatedPosts(response.data.posts || response.data);
      })
      .catch(err => console.log(err));

    // Getting all saved posts by user
    api.get(`/lists/saved/${userInfo._id}`)
      .then(response => {
        setSavedPosts(response.data.posts || response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return {
    user,
    savedPosts,
    createdPosts,
    selectedOption,
    handleOptionChange
  };
};
