import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faHouseLaptop,
  faComment,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import BasicModal from '../../components/modal/BasicModal'
import SignUp from '../../components/auth/SignUp'
import SignIp from '../../components/auth/SignIn'
import Logo from '../../assets/img/logo.png'
import LogoBlanco from '../../assets/img/logo-white.png'

import '../../assets/scss/styles.scss'

export default function SigninSignup() {
  const [showModal, setShowModal] = useState(false)
  const [contentModal, setContentModal] = useState(null)

  const openModal = (content) => {
    //abrimos el modal
    setShowModal(true)
    //seteamos la info del modal
    setContentModal(content)
  }

  return (
    <>
      <Container className="signin-signup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent openModal={openModal} setShowModal={setShowModal} />
        </Row>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  )
}

function LeftComponent() {
  return (
    <Col className="signin-signup_left" xs={6}>
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Busca lo que te interesa.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faHouseLaptop} /> Enterate de nuestras ultimas
          ofertas
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Nuestro equipo
        </h2>
      </div>
    </Col>
  )
}
function RightComponent(props) {
  const { openModal, setShowModal } = props
  return (
    <Col className="signin-signup_right" xs={6}>
      <div>
        <img src={LogoBlanco} alt="logBlanco" />
        <h2>Registrate Y se parte de nuestro equipo</h2>
        <Button
          variant="primary"
          onClick={() => {
            openModal(<SignUp setShowModal={setShowModal} />)
          }}
        >
          Registrarse
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => {
            openModal(<SignIp setShowModal={setShowModal} />)
          }}
        >
          Iniciar sesion
        </Button>
        <div className="home">
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
            Volver a inicio
          </Link>
        </div>
      </div>
    </Col>
  )
}
