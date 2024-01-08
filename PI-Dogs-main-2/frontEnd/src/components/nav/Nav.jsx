import { NavLink } from "react-router-dom";
import React from "react";
import styles from "./Nav.module.css";


function Nav () {
    return(
        <div className="nav-container">
            <NavLink to="/home">
                <button className={styles.button}>HOME</button>
            </NavLink>
            
        </div>
    )
}

export default Nav