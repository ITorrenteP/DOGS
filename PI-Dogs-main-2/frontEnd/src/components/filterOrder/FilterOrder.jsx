import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { orderCards, orderWeight, filterTemperaments, getAllTemperaments, filterSource, setCurrentPage } from "../../redux/actions"
import styles from "./FilterOrder.module.css"

const FilterOrder = () => {
    const dispatch = useDispatch()
    const allTemperaments = useSelector((state) => state.allTemperaments);
  

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
        dispatch(setCurrentPage(1));
    }

    const handleOrderWeight = (event) => {
        dispatch(orderWeight(event.target.value))
        dispatch(setCurrentPage(1));
    }

    const handleFilterTemperament = (event) => {
        // event.preventDefault();
        dispatch(filterTemperaments(event.target.value))
        dispatch(setCurrentPage(1));
    }

    const handleFilterSource = (event) => {
        dispatch(filterSource(event.target.value))
        dispatch(setCurrentPage(1));
    }

    React.useEffect(() => {
        dispatch(getAllTemperaments())
        // dispatch(getAllDogs())
    }, [])

    return (
        <div className={styles['filter-order-container']}>
            <div>
                <label>Select Temperament: </label>
                <select 
                name="filterTemperament"
                onChange={(event) => {handleFilterTemperament(event)}}
                >
                <option value="all">All</option>
                {allTemperaments.map((temperament, index) => (
                    <option key={`${temperament}-${index}`} value={temperament}>
                        {temperament}
                    </option>
                ))}
                </select>
                
                <label>Select Source: </label>
                <select name="filterSource" onChange={handleFilterSource}>
                    <option value="all">All Breeds</option>
                    <option value="api">API Dog Breeds</option>
                    <option value="database">My Dog Breeds</option>
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
            </div>
        </div>
    )
}

export default FilterOrder