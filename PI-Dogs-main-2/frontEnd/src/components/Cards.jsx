import React, {useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllDogs, dogsByName } from "../redux/actions"
import Card from "./Card"
import Pagination from "./Pagination"
import SearchBar from "./SearchBar"

const Cards = () => {

    const dispatch = useDispatch()
    const allBreeds = useSelector((state) => state.allBreeds)
    
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
  
    
    React.useEffect(() => {
        dispatch(getAllDogs())
    }, [])


  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allBreeds.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   dogsByName(name)
    
    return (
        <div>
            <SearchBar />
            
            { currentDogs.map((dog) => {
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
                    dogsPerPage={dogsPerPage}
                    totalDogs={allBreeds.length}
                    paginate={paginate}
                />
                
        </div>
    )

}

export default Cards