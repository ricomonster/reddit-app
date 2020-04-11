// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const Images = ({ alt, images }) => {
  return images.map((image, index) => {
    // Let's get the highest resolution possible
    const selectedImage = image.resolutions[image.resolutions.length - 1].url;
    const imageUrl = selectedImage.replace(/(&amp;)/gm, '&');

    return (
      <figure className="thread-image" key={index}>
        <img src={imageUrl} alt={alt} />
      </figure>
    );
  });
};

Images.propTypes = {
  images: PropTypes.array,
  alt: PropTypes.string,
};

export default Images;
