import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import baseUrl from '../../appConfig';

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
    axios.get(`${baseUrl}/users/${userInfo._id}`)
      .then(response => {
        setUser(response.data.user || response.data);
      })
      .catch(err => console.log(err));

    // Getting all created posts
    axios.get(`${baseUrl}/lists/${userInfo.username}`)
      .then(response => {
        setCreatedPosts(response.data.posts || response.data);
      })
      .catch(err => console.log(err));

    // Getting all saved posts by user
    axios.get(`${baseUrl}/lists/saved/${userInfo._id}`)
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
