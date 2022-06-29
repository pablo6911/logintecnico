import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'

//Redux
import { Provider } from 'react-redux'
import store from './components/state/store'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
/*  */
