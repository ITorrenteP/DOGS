import './App.css'
import {Route, Routes, useLocation, useNavigate} from "react-router-dom"
import { dogsByName } from './redux/actions'
import Landing from './components/landing'
import Cards from './components/Cards'
import Nav from './components/Nav'
import Detail from './components/Detail'
import CreateDog from './components/Form'



function App() {
  const location = useLocation();
  // const navigate = useNavigate();


  // const onClose = () => {
  //   navigate(-1)
  // };

  // const handleSearch = async (searchValue) => {
  //   try {
  //     // Dispatch the action to search for dogs by name
  //     await dispatch(dogsByName(searchValue));
  //     // Reset the current page to 1 when performing a new search
  //     setCurrentPage(1);
  //   } catch (error) {
  //     // Handle error if needed
  //     console.error('Error searching dogs by name:', error);
  //   }
  // };

  return (
    <div className="App">
       {location.pathname === "/landing"  && (<Nav />)}
      <Routes>
        <Route path='/landing' element={<Landing/>} />
        <Route path='/' element={<Cards />} />
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path='/create' element={<CreateDog />} />
      </Routes>
    </div>
  )
}

export default App
