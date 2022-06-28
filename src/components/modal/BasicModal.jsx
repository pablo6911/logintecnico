import React from 'react'
import { Modal } from 'react-bootstrap'
import LogoBlanco from '../../assets/img/logo-white.png'
import '../../assets/scss/styles.scss'
export default function BasicModal(props) {
  //show-Si el modal esta visible o oculto
  //setShow-cerramos del modal
  //children-lo que el modal va a renderizar
  const { show, setShow, children } = props
  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      sizes="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <img src={LogoBlanco} alt="logBlanco" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body> {children}</Modal.Body>
    </Modal>
  )
}
