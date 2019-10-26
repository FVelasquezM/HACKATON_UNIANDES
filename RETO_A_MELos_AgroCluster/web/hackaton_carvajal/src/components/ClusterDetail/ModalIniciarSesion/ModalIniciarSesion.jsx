import React from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalIniciarSesion.css";

function ModalIniciarSesion(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h1>¡Felicitaciones!</h1>
      </Modal.Header>
      <Modal.Body>
        <label>Se ha iniciado su inscripción al grupo</label>
      </Modal.Body>
    </Modal>
  );
}
export default ModalIniciarSesion;
