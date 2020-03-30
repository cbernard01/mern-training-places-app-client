import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = props => {
  const renderErrors = () => {
    return props.errors.map((error, index) => {
      return (
        <p key={index}>{error.message}</p>
      );
    })
  };

  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.errors}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      {renderErrors()}
    </Modal>
  );
};

export default ErrorModal;
