import { useState, useEffect } from 'react'
import { NavBar } from './components/navBar/navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>Forside</h1>} />
          <Route path="boligerTilSalg" element={<h1>Boliger til salg</h1>} />
          <Route path="login" element={<h1>Login</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
