import React from 'react';
import PropTypes from 'prop-types';

import { LoadButton } from './Buttton.styled';

export const Button = ({ onClick }) => {
  return (
    <LoadButton onClick={onClick} type="button">
      Load more
    </LoadButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
