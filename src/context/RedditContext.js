// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RedditContext = React.createContext({});

export const RedditProvider = ({ children }) => {
  // change this once we have user module
  const [subreddit, setSubreddit] = useState('/');
  const [thread, setThread] = useState('');

  return (
    <RedditContext.Provider
      value={{
        subreddit,
        thread,
        setSubreddit,
        setThread,
      }}
    >
      {children}
    </RedditContext.Provider>
  );
};

RedditProvider.propTypes = {
  children: PropTypes.any,
};

export default RedditContext;
