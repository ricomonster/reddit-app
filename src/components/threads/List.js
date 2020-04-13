// Dependencies
import React, { useContext, useEffect, useState } from 'react';

// Components
import ListItem from './ListItem';

// Context
import RedditContext from '@context/RedditContext';

// Hooks
import { useFetch } from '@hooks';

const List = () => {
  // Reddit Context
  const redditContext = useContext(RedditContext);

  // Loading state
  const [loading, setLoading] = useState(true);

  // List of threads
  const [threads, setThreads] = useState([]);

  // After
  const [after, setAfter] = useState('');

  // Setup the fetching of thread list
  const [redditThreads, getRedditThreads] = useFetch(
    `https://www.reddit.com/r/all/best.json${after ? '?after=' + after : ''}`
  );

  // This will only run once the component is loaded.
  useEffect(() => {
    getRedditThreads();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for changes
  useEffect(() => {
    const { data, loading: threadLoading } = redditThreads;

    if (!threadLoading && data.data) {
      setLoading(false);
      setThreads(
        Object.keys(threads).length > 0
          ? [...threads, ...data.data.children]
          : data.data.children
      );

      // Is the thread empty from the context?
      if (!redditContext.thread) {
        // Set the first from the list
        redditContext.setThread(data.data.children[0].data.permalink);
      }

      // Set the next page
      setAfter(data.data.after);
    }
  }, [redditThreads]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="thread-list">
      {loading && <div className="loading-state">Loading...</div>}
      {!loading &&
        threads.length > 0 &&
        threads.map((thread, index) => {
          const { data } = thread;
          return (
            <div
              className={`thread-container${
                redditContext.thread === data.permalink ? ' active' : ''
              }`}
              key={index}
              onClick={() => {
                redditContext.setThread(data.permalink);
              }}
            >
              <ListItem thread={data} />
            </div>
          );
        })}
    </div>
  );
};

List.propTypes = {};

export default List;
