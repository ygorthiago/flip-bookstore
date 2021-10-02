import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

interface IModalProps {
  children: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Modal = ({ children, isOpen, setIsOpen }: IModalProps) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setIsOpen(false)}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: 'var(--darkGrey)',
          color: '#000000',
          borderRadius: '8px',
          width: '25rem',
          border: 'none',
          padding: '0',
        },
        overlay: {
          backgroundColor: '#121214e6',
          zIndex: 999,
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;