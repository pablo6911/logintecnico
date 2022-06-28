import { ToastContainer } from 'react-toastify'

export default function Toast() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        //la barra se oculta despues de 500mls
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
