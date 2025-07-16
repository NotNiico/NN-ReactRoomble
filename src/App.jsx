import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

function App() {
  // Logica de la app

  return (
    <>
      <Outlet /> 
    </>
  )
}

export default App
