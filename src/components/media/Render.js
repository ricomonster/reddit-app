// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const Render = ({ thread }) => {
  // Determine what type of media are we going to render
  switch (thread.post_hint) {
    case 'rich:video':
      // Get the source
      return <div>embed media</div>;

    default:
      console.log(thread.post_hint);
      return <div>Unknown media</div>;
  }
};

Render.propTypes = {
  thread: PropTypes.object.isRequired,
};

export default Render;
