import React, { useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { values, size, transform } from 'lodash'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

//Redux
import { useDispatch, useSelector } from 'react-redux'
//Actions
import { userLoginAction } from '../actions/usersAction'
//import AuthContext from '../actions/authContext'

import '../../assets/scss/styles.scss'

export default function SignIn(props) {
  let navigate = useNavigate()
  const { setShowModal } = props
  //utilizar useDispatchvy te crea una funcion
  const dispatch = useDispatch()
  // let redirect = Redirect()

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
    setShowModal(false)
    let valitCount = 0
    //creamos un bucle para verificar si los campos estas llenos
    values(formData).some((value) => {
      value && valitCount++
      return null
    })
    if (valitCount !== size(formData)) {
      toast.warning('Todos los campos son requeridos')
    } else if (size(formData.password) < 6) {
      toast.warning(
        'El campo Conformar contraseña debe tener minimo 6 caracteres'
      )
      return
    } else if (formData) {
      //si todo sale bien
      //toast.success('Usuario Logeado')
      setSignUpLoading(true)
      dispatch(userLoginAction(formData))
      navigate('/fornInicio')
      return
    }
  }
  return (
    <div className="sign-Ip-form">
      <h2>Entrar</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            onChange={onChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {!signUpLoading ? 'Iniciar sesion' : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  )
}
function initialFormValue() {
  return {
    email: '',
    password: '',
  }
}
