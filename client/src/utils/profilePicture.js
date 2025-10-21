// Default profile picture utility
import defaultProfilePic from '../assets/default_profile.jpg';

/**
 * Returns the user's profile picture or the default profile picture if none is set
 * @param {string} profileImg - The user's profile image URL
 * @returns {string} - The profile image URL to use
 */
export const getProfilePicture = (profileImg) => {
  // If profileImg is null, undefined, empty string, or just whitespace, use default
  if (!profileImg || profileImg.trim() === '') {
    return defaultProfilePic;
  }
  
  return profileImg;
};

/**
 * Returns the user's profile picture with fallback handling
 * @param {string} profileImg - The user's profile image URL
 * @param {string} fallback - Fallback image URL (optional)
 * @returns {string} - The profile image URL to use
 */
export const getProfilePictureWithFallback = (profileImg, fallback = defaultProfilePic) => {
  if (!profileImg || profileImg.trim() === '') {
    return fallback;
  }
  
  return profileImg;
};
