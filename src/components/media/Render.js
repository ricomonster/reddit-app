// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const Render = ({ thread }) => {
  const cleanupString = (string) => {
    return string
      .replace(/(&amp;)/gm, '&')
      .replace(/(&lt;)/gm, '<')
      .replace(/(&gt;)/gm, '>')
      .replace(/(%2F)/gm, '/')
      .replace(/(%3A)/gm, ':');
  };

  // Determine what type of media are we going to render
  switch (thread.post_hint) {
    case 'image':
      return (
        <div className="media-render images">
          {thread.preview &&
            thread.preview.images.map((image, index) => {
              const imageUrl = cleanupString(image.source.url);

              return (
                <figure className="image" key={index}>
                  <img src={imageUrl} alt={thread.title} />
                </figure>
              );
            })}
        </div>
      );

    case 'hosted:video':
      // Content is uploaded to Reddit
      // Get the content
      const videoUrl = thread.secure_media.reddit_video.fallback_url;

      return (
        <div className="media-render hosted-video">
          <video controls>
            <source src={videoUrl} />
          </video>
        </div>
      );

    case 'rich:video':
      // Get the content
      const content = thread.secure_media_embed.content;
      // Clenaup
      const iframeCode = cleanupString(content);

      // Get the source
      return (
        <div className="media-render rich-video">
          <div dangerouslySetInnerHTML={{ __html: iframeCode }}></div>
        </div>
      );

    default:
      console.log(thread.post_hint);
      return <div>Unknown media</div>;
  }
};

Render.propTypes = {
  thread: PropTypes.object.isRequired,
};

export default Render;
