import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ showModal, deleteTodo, hide, todoId }) => {
  const [show, setShow] = useState(showModal);
  const onHide = () => {
    hide();
  };
  const onOk = () => {
    deleteTodo(todoId);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure want to delete<h5>task {todoId}</h5>?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onOk}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
