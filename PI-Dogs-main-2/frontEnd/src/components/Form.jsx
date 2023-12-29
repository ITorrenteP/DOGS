import { useState } from "react"
import axios from "axios"

const CreateDog = () => {

    const [input, setInput] = useState({
        id:"",
        name:"",
        height:"",
        weight:"",
        temperament:[],
        life_span:"",
        image: "",
    })

    const handleChange = (event) => {

        setInput({
            ...input,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("Input before submission:", input);

        try {
          const response = await axios.post("http://localhost:3001/dogs", input)
          
          console.log("Dog data successfully submitted", response.data);
        } catch (error) {
          console.error("Error submitting dog data:", error.response);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="id">Id </label>
                <input type="id" name="id" value={input.id} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="name">Name </label>
                <input type="text" name="name" value={input.name} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Height </label>
                <input type="text" name="height" value={input.height} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Weight </label>
                <input type="text" name="weight" value={input.weight} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Temperaments </label>
                <input type="text" name="temperament" value={input.temperament} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Lifespan </label>
                <input type="text" name="life_span" value={input.life_span} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Image Url </label>
                <input type="text" name="image" value={input.image} onChange={handleChange}/>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )

}

export default CreateDog