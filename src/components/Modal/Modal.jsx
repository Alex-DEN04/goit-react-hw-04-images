import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalStyled, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImage } = this.props;
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalStyled>
          <img src={modalImage} alt="Large foto" />
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  modalImage: PropTypes.string,
  onClick: PropTypes.func,
};
