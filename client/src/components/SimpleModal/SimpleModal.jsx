import React from 'react';
import Modal from '@material-ui/core/Modal';

export default function ModalPokemon({isVisible,onHandleClose,children}) {
  return (
    <div>
      <Modal
        open={isVisible}
        onClose={onHandleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {children}
      </Modal>
    </div>
  );
}