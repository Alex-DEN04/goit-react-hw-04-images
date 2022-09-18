import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export default function ImageGallery({ onClick, images }) {
  return (
    <>
      <Gallery>
        <ImageGalleryItem items={images} onClick={onClick} />
      </Gallery>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};
