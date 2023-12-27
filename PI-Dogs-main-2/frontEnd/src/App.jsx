import './App.css'
import {Route, Routes, useLocation, useNavigate} from "react-router-dom"
import { useState } from 'react'
import Landing from './components/landing'
import Cards from './components/Cards'
import Nav from './components/Nav'
import Detail from './components/Detail'
import axios from 'axios'



function App() {
  const location = useLocation();

  return (
    <div className="App">
       {location.pathname === "/landing"  && (<Nav />)}
      <Routes>
        <Route path='/landing' element={<Landing/>} />
        <Route path='/' element={<Cards />} />
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
    </div>
  )
}

export default App
