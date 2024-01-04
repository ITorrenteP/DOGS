import React, {useState, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllDogs, setCurrentPage } from "../../redux/actions"
import { NavLink } from "react-router-dom"
import Card from "../card/Card"
import Pagination from "../pagination/Pagination"
import SearchBar from "../searchBar/SearchBar"
import styles from "./Cards.module.css"
import FilterOrder from "../filterOrder/FilterOrder"



const Cards = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const dispatch = useDispatch()
    
    const allBreeds = useSelector((state) => state.allBreeds)
  

    // const [currentPage, setCurrentPage] = useState(1)
    const currentPage = useSelector((state) => state.currentPage);
    const postsPerPage = 8
  
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    // const currentPosts = allBreeds.slice(firstPostIndex, lastPostIndex)
    const currentPosts = allBreeds.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    
    React.useEffect(() => {
        dispatch(getAllDogs())
    }, [])

    // dispatch(setCurrentPage(newPage));


    return (
        <div >
            <div>
                <FilterOrder />
            </div>

            <div className={styles['top-container']}>
                <NavLink to='/create'>
                    <button className={styles['create-breed-button']}>Create your own breed!</button>
                </NavLink>
            </div>

            <SearchBar />
            <div className={styles.cardsContainer}>
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
            </div>
            
                    <Pagination
                    totalDogs={allBreeds.length}
                    postsPerPage={postsPerPage}
                    // setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
        </div>
    )

}

export default Cards