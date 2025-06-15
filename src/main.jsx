import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './context/AuthContext.jsx'
import Router from './router/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext.Provider value={{user:{"Nombre":"Nicolas"}}}>  {/*Le provee un contexto a todo lo que se encuentre dentro de el, en este caso un array con el objeto user y una función setUser para actualizarlo*/}
      <Router />
    </AuthContext.Provider>
  </StrictMode>
)
