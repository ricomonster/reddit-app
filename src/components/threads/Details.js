// Dependencies
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Images from './Images';

// Context
import RedditContext from '@context/RedditContext';

// Hooks
import { useFetch } from '@hooks';

const Details = () => {
  // Reddit Context
  const redditContext = useContext(RedditContext);

  // Active Thread Permalink
  const [thread, setThread] = useState({});

  // Loading state
  const [loading, setLoading] = useState(true);

  // Set the fetch
  const [redditThread, getRedditThread] = useFetch(
    `https://www.reddit.com${redditContext.thread}.json`
  );

  // Listen for changes
  useEffect(() => {
    if (redditContext.thread && redditContext.thread !== thread.permanlink) {
      setLoading(true);
      getRedditThread();
    }
  }, [redditContext.thread]); // eslint-disable-line react-hooks/exhaustive-deps

  // Response from the Reddit?
  useEffect(() => {
    const { data, loading: threadLoading } = redditThread;

    if (!threadLoading && data) {
      // get the thread
      if (data && data[0]) {
        const { children } = data[0].data;

        // set the thread
        setThread(children[0].data);
      }

      setLoading(false);
    }
  }, [redditThread]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(thread);

  return (
    <div className="thread-details">
      {loading && <div className="loading-state">Loading...</div>}
      {!loading && (
        <>
          <div
            className="media thread-header"
            style={{ margin: '0 1rem 1.2rem 1rem' }}
          >
            <figure className="media-left">
              <p>{thread.ups}</p>
            </figure>

            <div className="media-content">
              <div className="content">
                <nav className="level thread-meta">
                  <div className="level-left">
                    <a
                      className="level-item subreddit"
                      style={{ textTransform: 'uppercase' }}
                    >
                      <strong>{thread.subreddit}</strong>
                    </a>

                    <p className="level-item submitted-by">
                      <span className="submitted-label">
                        Submitted 8 hours ago by
                      </span>{' '}
                      <a style={{ marginLeft: '0.3rem' }}>u/{thread.author}</a>
                    </p>
                  </div>
                </nav>

                <h2 className="thread-title" style={{ fontSize: '1.6em' }}>
                  {thread.title}
                </h2>

                <div className="thread-content">
                  {thread.selftext && <p>{thread.selftext}</p>}

                  {thread.domain &&
                    !['i.redd.it', 'gfycat.com'].includes(thread.domain) && (
                      <a
                        href={thread.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {thread.url}
                      </a>
                    )}

                  {thread.preview &&
                    !thread.media &&
                    thread.preview.images &&
                    thread.preview.images.length > 0 && (
                      <div className="thread-images">
                        <Images
                          images={thread.preview.images}
                          alt={thread.title}
                        />
                      </div>
                    )}
                </div>
              </div>

              <nav className="level thread-meta">
                <div className="level-left">
                  <p className="level-item comments">
                    {thread.num_comments} comments
                  </p>
                </div>
              </nav>
            </div>

            {thread.domain && thread.domain.indexOf('i.redd.it') === -1 && (
              <div className="media-right" style={{ alignSelf: 'flex-start' }}>
                {thread.thumbnail &&
                  !['default', 'self'].includes(thread.thumbnail) && (
                    <a href={thread.url} target="_blank">
                      <p className="image is-96x96">
                        <img src={thread.thumbnail} alt={thread.title} />
                      </p>
                    </a>
                  )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

Details.propTypes = {};

export default Details;
