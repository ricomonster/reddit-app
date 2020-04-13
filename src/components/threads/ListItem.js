// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ thread }) => {
  const renderThumbnail = () => {
    // No content?
    if (!thread.thumbnail) {
      return false;
    }

    // Default render
    if (!['default', 'self', 'nsfw', 'image'].includes(thread.thumbnail)) {
      return (
        <p className="image is-64x64">
          <img src={thread.thumbnail} alt={thread.title} />
        </p>
      );
    }

    // Image
    if (thread.thumbnail === 'image') {
      // Get the image from the previews
      const imagePreview = thread.preview.images[0].source.url;
      const imageUrl = imagePreview.replace(/(&amp;)/gm, '&');

      return (
        <p className="image is-64x64">
          <img src={imageUrl} alt={thread.title} />
        </p>
      );
    }

    // NSFW
    if (thread.thumbnail === 'nsfw') {
      return <span className="tag is-danger">NSFW</span>;
    }
  };

  return (
    <div className="thread-list-item" style={{ padding: '1rem 0.5rem' }}>
      <div
        className="media thread"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <figure className="media-left">
          <p>{thread.ups}</p>
        </figure>

        <div className="media-content" style={{ alignSelf: 'flex-start' }}>
          <div className="content">
            <nav
              className="level thread-meta"
              style={{ marginBottom: '0.5rem' }}
            >
              <div className="level-left">
                <a
                  className="level-item subreddit"
                  style={{ textTransform: 'uppercase' }}
                >
                  <strong>{thread.subreddit}</strong>
                </a>
              </div>
            </nav>

            <h2
              className="thread-title"
              style={{ fontSize: '1.2em', marginTop: 0 }}
            >
              {thread.title}
            </h2>
          </div>

          <nav className="level thread-meta">
            <div className="level-left">
              <p className="level-item submitted-by">
                <span className="submitted-label">Posted 8 hours ago by</span>{' '}
                <a style={{ marginLeft: '0.3rem' }}>u/{thread.author}</a>
              </p>
            </div>

            <div className="level-right">
              <p className="level-item submitted-by">
                {thread.num_comments} comments
              </p>
            </div>
          </nav>
        </div>

        <div className="media-right" style={{ alignSelf: 'flex-start' }}>
          {renderThumbnail()}
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  thread: PropTypes.object.isRequired,
};

export default ListItem;
