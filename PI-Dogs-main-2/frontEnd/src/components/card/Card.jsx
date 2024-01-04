import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({name, image, id, temperaments, weight}) => {
    

    
      return(
            
            <div className={styles.card}>

            <Link to={`detail/${id}`} className={styles.link}>
            <h2>{name}</h2>
            </Link>
            <h2>Temperaments: {temperaments}</h2>
            <h2>Weight: {weight} Kg</h2>
            <img src={image} alt={name} className={styles.image}/> 
            </div>         
    )
}

export default Card