import './App.css'
import {Route, Routes, useLocation, useNavigate} from "react-router-dom"
import Landing from './components/landing'
import Cards from './components/Cards'

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/landing' element={<Landing/>} />
        <Route path='/home' element={<Cards />} />
      </Routes>
    </div>
  )
}

export default App
