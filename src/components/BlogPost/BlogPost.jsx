import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';
import styles from './BlogPost.module.css';

function BlogPost({ title, content, author, date, readTime, image, isDarkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const previewContent = content.length > 100 ? content.substring(0, 100) + '...' : content;

  // Share URLs
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} - ${content}`
  )}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    title
  )}`;
  const instagramUrl = `https://www.instagram.com/`;

  return (
    <article
      className={`${styles.blogPost} ${isDarkMode ? styles.dark : ''}`}
    >
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

      {/* Toggle button with keyboard support */}
      <button
        className={styles.toggleButton}
        onClick={toggleExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpanded();
          }
        }}
        tabIndex="0"
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>

      {/* Social Share Buttons with keyboard support */}
      <div className={styles.socialShare}>
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          tabIndex="0"
        >
          <FaWhatsapp className={styles.shareIcon} />
        </a>
        <a
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          tabIndex="0"
        >
          <FaLinkedin className={styles.shareIcon} />
        </a>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Instagram"
          tabIndex="0"
        >
          <FaInstagram className={styles.shareIcon} />
        </a>
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
