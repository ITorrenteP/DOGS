import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, dogsByName, setCurrentPage } from "../../redux/actions";
import styles from "./SearchBar.module.css";

function SearchBar() {
    
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('')
    const error = useSelector(state => state.error)

    useEffect(()=>{
      if (error) {
        alert(error)
      }
    }, [error])

    const handleSearch = async () => {
        if (!searchTerm) {
          alert('Please enter a breed')
          return;
        }
        
        if (searchTerm.trim() !== '') {
          await dispatch(dogsByName(searchTerm));
          setSearchTerm('');
          dispatch(setCurrentPage(1))
        }
    };

    const handleClear = () => {
      setSearchTerm('');
      dispatch(getAllDogs());
      dispatch(setCurrentPage(1));
    };
   
    return (
        <div className={styles['search-bar']}>
            <input
              type="search"
              placeholder="Enter a breed.."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className={styles['search-bar-input']}
            />
            <button onClick={handleSearch} className={styles['search-bar-button']}>Search</button>
            <button onClick={handleClear} >Clear</button>
        </div>
    )
}

export default SearchBar