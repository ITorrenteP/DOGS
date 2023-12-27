import { Link } from "react-router-dom";

const Card = ({name, image, id, temperaments, weight}) => {
    
    

    const imageStyle = {
        width: "60%", // Make sure the image takes up 100% of the container's width
        height: "60%", // Make sure the image takes up 100% of the container's height
        objectFit: "cover",
        borderRadius: '100%' // Resize the image while maintaining its aspect ratio and covering the entire container
      };
    
      return(
            <div>
            <Link to={`detail/${id}`}>
            <h2>{name}</h2>
            </Link>
            <h2>Temperaments: {temperaments}</h2>
            <h2>Weight: {weight} Kg</h2>
            <img src={image} alt={name} style={imageStyle}/> 
            </div>         
    )
}

export default Card