// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ thread }) => {
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
          {thread.thumbnail && !['default', 'self'].includes(thread.thumbnail) && (
            <p className="image is-64x64">
              <img src={thread.thumbnail} alt={thread.title} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  thread: PropTypes.object.isRequired,
};

export default ListItem;
