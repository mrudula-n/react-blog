import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';
import styles from './BlogPost.module.css';
import LikeButton from '../LikeButton/LikeButton';
import CommentSection from '../CommentSection/CommentSection'; 

function BlogPost({ title, content, author, date, readTime, image, isDarkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const previewContent = content.length > 100 ? content.substring(0, 100) + '...' : content;

  return (
    <article className={`${styles.blogPost} ${isDarkMode ? styles.dark : ''}`}>
      {image && <img src={image} alt={title} className={styles.blogPostImage} />}

      <div className={styles.blogPost__header}>
        <h2 className={styles.blogPost__title}>{title}</h2>
        <div className={styles.blogPost__meta}>
          <span className={styles.blogPost__author}>By {author}</span>
          <time className={styles.blogPost__date}>{date}</time>
          <span className={styles.blogPost__readTime}>{readTime} min read</span>
        </div>
      </div>

      <div className={styles.blogPost__content}>
        {isExpanded ? content : previewContent}
      </div>

      <button 
        className={styles.toggleButton} 
        onClick={toggleExpanded} 
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>

      {/* Like Button */}
      <LikeButton initialLikes={0} isDarkMode={isDarkMode} />


      {/* Comment Section */}
      <CommentSection postId={1} /> {/* Replace '1' with a unique post ID if available */}

      <div className={styles.socialShare}>
        <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><FaWhatsapp className={styles.shareIcon} /></a>
        <a href="https://in.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><FaLinkedin className={styles.shareIcon} /></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram"><FaInstagram className={styles.shareIcon} /></a>
      </div>
    </article>
  );
}

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readTime: PropTypes.number.isRequired,
  image: PropTypes.string,
  isDarkMode: PropTypes.bool.isRequired,
};

export default BlogPost;