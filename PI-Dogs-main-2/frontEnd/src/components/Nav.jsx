import { NavLink } from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";

function Nav ({onSearch}) {
    return(
        <div className="nav-container">
            <NavLink to="/">
                <button>Home</button>
            </NavLink>
            {/* <SearchBar onSearch={onSearch} /> */}
        </div>
    )
}

export default Nav