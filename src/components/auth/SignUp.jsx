import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { history } from 'react-router-dom'

import { values, size } from 'lodash'
import { toast } from 'react-toastify'
import { isEmailValid } from '../../utils/validations'
import Swal from 'sweetalert2'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Actions
import { crearNuevoUsuarioAction } from '../actions/usersAction'
//import AuthContext from '../actions/authContext'

import '../../assets/scss/styles.scss'

export default function SignUp(props) {
  const { setShowModal } = props
  //let navigate = NavLink()
  //utilizar useDispatchvy te crea una funcion
  const dispatch = useDispatch()

  //Mandar a llamar action de crearNuevoUsuarioAction

  const [formData, setFormData] = useState(initialFormValue())
  //Spinner
  const [signUpLoading, setSignUpLoading] = useState(false)
  //Acceder al state del store
  const mensageError = useSelector((state) => state.usuarios.error)
  console.log(mensageError)

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    //console.log(formData)
    setShowModal(false)
    //cuando el usuario haga submit

    let valitCount = 0
    //creamos un bucle para verificar si los campos estas llenos
    values(formData).some((value) => {
      value && valitCount++
      return null
    })
    //constante userTemp para eliminar confirPassword

    if (valitCount !== size(formData)) {
      toast.warning('Todos los campos son requeridos')
    } else {
      //Validamos email

      if (!isEmailValid(formData.email)) {
        toast.warning('Email invalido')
        return
      } else if (size(formData.password) < 6) {
        toast.warning(
          'El campo Conformar contraseña debe tener minimo 6 caracteres'
        )
      } else if (size(formData.confirPassword) < 6) {
        toast.warning(
          'El campo Conformar contraseña debe tener minimo 6 caracteres'
        )
        return
      } else if (formData.password !== formData.confirPassword) {
        toast.warning('Las Contraseñas no son iguales')
        return
      } else if (mensageError) {
        Swal.fire({
          icon: 'error',
          title: 'El usuario ya existe',
        })
      } else if (formData) {
        //si todo sale bien
        setSignUpLoading(true)
        Swal.fire({
          title: 'Usuario Registrado-Porfavor inici sesion',
        })
        //toast.success('Usuario Registrado-Porfavor inici sesion')
        // Pasarlo al action
        //Creamos un nuevo usuario
        dispatch(crearNuevoUsuarioAction(formData))
        console.log(formData)
        //navigate(/fornInicio)
      }
    }
  }
  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Apellido"
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="number"
                id="telefono"
                name="telefono"
                placeholder="Telefono"
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Conformar contraseña"
                id="confirPassword"
                name="confirPassword"
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Group controlId="formBasicCheckBox">
                <Form.Check
                  type="checkbox"
                  label="Aceptar terminos y condiciones"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          {!signUpLoading ? 'Registrarse' : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  )
}

function initialFormValue() {
  return {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirPassword: '',
  }
}
