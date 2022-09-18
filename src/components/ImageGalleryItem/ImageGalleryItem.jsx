import React from 'react';
import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ onClick, items }) {
  return (
    <>
      {items.map(item => (
        <Item key={item.id} onClick={() => onClick(item)}>
          <Image src={item.webformatURL} alt="" />
        </Item>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};
