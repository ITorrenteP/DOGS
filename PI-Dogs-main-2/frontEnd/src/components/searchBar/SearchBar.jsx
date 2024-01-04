import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs, dogsByName, setCurrentPage } from "../../redux/actions";
import styles from "./SearchBar.module.css";

function SearchBar() {
    
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = () => {
        if (!searchTerm) {
          alert('Please enter a breed')
        }
        

        if (searchTerm.trim() !== '') {
          const info = dispatch(dogsByName(searchTerm));
          if (!info.includes(searchTerm)) {
            
            alert('Breed not found')
          }
          setSearchTerm('');
          dispatch(setCurrentPage(1))
        }
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
        </div>
    )
}

export default SearchBar