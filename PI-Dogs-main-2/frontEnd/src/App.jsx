import './App.css'
import {Route, Routes, useLocation, useNavigate} from "react-router-dom"
import { dogsByName } from './redux/actions'
import Landing from './components/landing/Landing'
import Cards from './components/cards/Cards'
import Nav from './components/nav/Nav'
import Detail from './components/detail/Detail'
import CreateDog from './components/form/Form'



function App() {
  const location = useLocation();
  
  return (
    <div className="App">
       {/* {location.pathname === "/landing"  && (<Nav />)} */}
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Cards />} />
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path='/create' element={<CreateDog />} />
      </Routes>
    </div>
  )
}

export default App
