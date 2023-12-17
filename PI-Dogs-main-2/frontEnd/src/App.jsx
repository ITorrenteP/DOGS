import './App.css'
import {Route, Routes, useLocation, useNavigate} from "react-router-dom"
import Landing from './components/landing'

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/landing' element={<Landing/>} /> 
      </Routes>
    </div>
  )
}

export default App
