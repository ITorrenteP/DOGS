import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllDogs } from "../redux/actions"
import Card from "./Card"

const Cards = () => {

    const dispatch = useDispatch()
    const allBreeds = useSelector((state) => state.allBreeds)
    
    React.useEffect(() => {
        dispatch(getAllDogs())
    }, [])

    const first8Dogs = allBreeds.slice(0, 8);
    
    return (
        <div>
            { first8Dogs?.map((dog) => {
                return(
                    <Card
                    key={dog.id}
                    name={dog.name}
                    temperaments={dog.temperaments}
                    weight={dog.weight}
                    image={dog.image}
                    />
                )
            }) }
        </div>
    )

}

export default Cards