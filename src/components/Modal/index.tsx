import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

interface IModalProps {
  children: JSX.Element;
  isOpen: boolean;
  setIsOpen: () => void;
  closeOnOverlay: boolean;
}

const Modal = ({
  children,
  isOpen,
  setIsOpen,
  closeOnOverlay,
}: IModalProps): JSX.Element => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={closeOnOverlay}
      onRequestClose={setIsOpen}
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
