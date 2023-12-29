import React, {useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllDogs, dogsByName, orderCards, orderWeight, filterTemperaments, getAllTemperaments } from "../redux/actions"
import { NavLink } from "react-router-dom"
import Card from "./Card"
import Pagination from "./Pagination"
import SearchBar from "./SearchBar"
import { SELECT_TEMPERAMENT } from "../redux/actionTypes"

// import styles from './CSS/Landing.module.css'

const Cards = () => {

    // const [selectedTemperament, setSelectedTemperament] = useState("")

    const dispatch = useDispatch()
    
    const allBreeds = useSelector((state) => state.allBreeds)
    const allTemperaments = useSelector((state) => state.allTemperaments);
    const selectedTemperament = useSelector((state) => state.selectedTemperament)
    

    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 8
  
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = allBreeds.slice(firstPostIndex, lastPostIndex)

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
    }

    const handleOrderWeight = (event) => {
        dispatch(orderWeight(event.target.value))
    }

    const handleFilterTemperament = (event) => {
        event.preventDefault();
        dispatch({type: SELECT_TEMPERAMENT, payload: event.target.value })
        dispatch(filterTemperaments(event.target.value))
        selectedTemperament(event.target.value)
    }
    
    React.useEffect(() => {
        dispatch(getAllTemperaments())
        dispatch(getAllDogs())
    }, [dispatch])

    // console.log("All Temperaments in Component:", allTemperaments);

    
    return (
        <div >
            <div>
                <label>Select Temperament: </label>
                <select 
                name="filterTemperament"
                value={selectedTemperament}
                onChange={handleFilterTemperament}
                >
                <option value="">All</option>
                {allTemperaments.map((temperament, index) => (
                    <option key={`${temperament}-${index}`} value={temperament}>
                        {temperament}
                    </option>
                ))}
                </select>
            </div>
            <div>
                <select name="order" onChange={handleOrder}>
                    <option value="ascending">A to Z</option>
                    <option value="descending">Z to A</option>
                </select>

                <select name="orderWeight" onChange={handleOrderWeight}>
                    <option value="lowToHigh">Weight: Low to High</option>
                    <option value="highToLow">Weight: High to Low</option>
                </select>

                {/* <select name="filterTemperament" onChange={handleFilterTemperament}>
                    <option value="">All</option>
                    {allTemperaments.map((temperament) => {
                        <option key={temperament} value={temperament}>
                            {temperament}
                        </option>
                    })}
                </select> */}
            </div>
            

            <div >
                <NavLink to='/create'>
                    <button>Create your own breed!</button>
                </NavLink>
            </div>

            <SearchBar />
            
            { currentPosts.map((dog) => {
                return(
                    <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    temperaments={dog.temperaments}
                    weight={dog.weight}
                    image={dog.image}
                    />
                 )
                }) }
                    <Pagination
                    totalDogs={allBreeds.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
        </div>
    )

}

export default Cards