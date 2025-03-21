import { useState, useEffect } from 'react'
import { NavBar } from './components/navBar/navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<homePage />} />
          <Route path="/boligTilSalg" element={<boligPage />} />
          <Route path="/login" element={<loginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
