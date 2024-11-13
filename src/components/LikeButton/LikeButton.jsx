import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import styles from './LikeButton.module.css';

function LikeButton({ initialLikes, onLikeChange, isDarkMode }) {
  // Retrieve persisted like state from localStorage on component mount
  const [likes, setLikes] = useState(() => {
    const storedLikes = localStorage.getItem('likes');
    return storedLikes ? parseInt(storedLikes, 10) : initialLikes;
  });

  const [isLiked, setIsLiked] = useState(() => {
    const storedLiked = localStorage.getItem('isLiked');
    return storedLiked ? JSON.parse(storedLiked) : false;
  });

  // Update localStorage whenever the like state changes
  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => {
      const newIsLiked = !prevIsLiked;
      setLikes((prevLikes) => {
        const newLikes = newIsLiked ? prevLikes + 1 : prevLikes - 1;
        onLikeChange?.(newLikes);

        // Persist the updated values to localStorage
        localStorage.setItem('likes', newLikes);
        localStorage.setItem('isLiked', newIsLiked);

        return newLikes;
      });
      return newIsLiked;
    });
  };

  return (
    <button
      className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
      onClick={handleLikeClick}
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
    >
      <div className={`${styles.iconContainer} ${isDarkMode ? styles.darkIconContainer : ''}`}>
        <FaHeart
          className={`${styles.likeIcon} ${
            isLiked ? styles.likedIcon : styles.unlikedIcon
          } ${isDarkMode && !isLiked ? styles.darkUnlikedIcon : ''}`}
        />
      </div>
      <span className={`${styles.likeCount} ${isDarkMode ? styles.darkLikeCount : ''}`}>
        {likes}
      </span>
    </button>
  );
}

LikeButton.propTypes = {
  initialLikes: PropTypes.number.isRequired,
  onLikeChange: PropTypes.func,
  isDarkMode: PropTypes.bool.isRequired,
};

export default LikeButton;