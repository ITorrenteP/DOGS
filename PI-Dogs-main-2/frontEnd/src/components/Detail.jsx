import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

const Detail = () => {

    const imageStyle = {
        width: "60%", // Make sure the image takes up 100% of the container's width
        height: "60%", // Make sure the image takes up 100% of the container's height
        objectFit: "cover",
        borderRadius: '100%' // Resize the image while maintaining its aspect ratio and covering the entire container
      };


    const { id } = useParams()
    const [dog, setDog] = useState({})

    const URL_BASE = "http://localhost:3001/dogs/"
    
    useEffect(() => {
        axios(`${URL_BASE}${id}`).then(({data}) => setDog(data))
        return setDog({})
        },[id])

    return <div>
        {
           dog ? (
            <div>
                <h4>Id: {dog.id}</h4>
                <h2>Name: {dog.name}</h2>
                    <h4>Height: {dog.height} </h4>
                    <h4>Weight: {dog.weight} </h4>
                    <h4>Temperaments: {dog.temperament} </h4>
                    <h4>Lifespan: {dog.life_span} </h4>
                    <img src={dog.image} alt={dog.name} style={imageStyle}/>
            </div> 
           ) : ''
        }
    </div> 
}

export default Detail