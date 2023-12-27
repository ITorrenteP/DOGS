import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs, dogsByName } from "../redux/actions";

function SearchBar() {
    
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
          dispatch(dogsByName(searchTerm));
          setSearchTerm('');
        }
    };

    const handleClearSearch = async (event) => {
        event.preventDefault();
        dispatch(getAllDogs());
    };    


    return (
        <div>
            <input
              type="search"
              placeholder="Enter a breed.."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchBar