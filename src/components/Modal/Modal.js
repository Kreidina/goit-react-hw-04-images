import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const onEscKeyPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscKeyPress);
    return () => {
      window.removeEventListener('keydown', onEscKeyPress);
    };
  }, [onClose]);

  const onBackdropClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={onBackdropClose}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
