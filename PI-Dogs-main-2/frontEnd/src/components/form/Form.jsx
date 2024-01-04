import { useEffect, useState } from "react"
import { getAllTemperaments, PostDog } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import styles from "./Form.module.css"

const CreateDog = () => {

    const [input, setInput] = useState({
        id:"",
        name:"",
        minHeight:"",
        maxHeight:"",
        minWeight:"",
        maxWeight:"",
        temperament:[],
        life_span:"",
        image: "",
    })

    const [error, setError] = useState(null);

    const allTemperaments = useSelector(state => state.allTemperaments)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTemperaments())
    },[dispatch])
    

    const handleChange = (event) => {
        if (event.target.name === 'temperament') {
            const { options } = event.target;
            const value = [];
            for (let i = 0, l = options.length; i < l; i += 1) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            console.log('Selected temperament:', value);
            setInput(prevState => ({ ...prevState, [event.target.name]: value }));
        } else {
            setInput(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
        }

        if (event.target.name === 'maxWeight' && Number(event.target.value) < Number(input.minWeight)) {
            setError('Max weight cannot be smaller than min weight');
        } else if (event.target.name === 'maxHeight' && Number(event.target.value) < Number(input.minHeight)) {
            setError('Max height cannot be smaller than min height');
        } else if (Number(input.maxWeight) >= Number(input.minWeight) && Number(input.maxHeight) >= Number(input.minHeight)) {
            setError(null);
        }
    }

     

    const handleSubmit = async (event) => {
        event.preventDefault()
        

        const combinedInput = {
            ...input,
            height: `${input.minHeight} - ${input.maxHeight}`,
            weight: `${input.minWeight} - ${input.maxWeight}`,
        }
        
        delete combinedInput.minHeight;
        delete combinedInput.maxHeight;
        delete combinedInput.minWeight;
        delete combinedInput.maxWeight;  

        
        dispatch(PostDog(combinedInput))
        .then(() => {
            alert('Your dog was created successfuly!');
        })
        .catch((error) => {
            alert('Oh no! Something went wrong. Please try again. '+ error.message);
        });


        setInput({ 
            name:"",
            minHeight:"",
            maxHeight:"",
            minWeight:"",
            maxWeight:"",
            temperament:[],
            life_span:"",
            image: "",
            id: "",
        })
    }

    const allInputsFilled = () => {
        for (let key in input) {
            if (input[key] === "") {
                return false;
            }
        }
        return true;
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.div}>
                <label htmlFor="id" className={styles.label}>Id </label>
                <input type="id" name="id" value={input.id} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="name" className={styles.label}>Name </label>
                <input type="text" name="name" value={input.name} onChange={handleChange}/>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="" className={styles.label}>Min Height </label>
                <input type="text" name="minHeight" value={input.minHeight} onChange={handleChange}/>
                <label htmlFor="" className={styles.label}>Max Height </label>
                <input type="text" name="maxHeight" value={input.maxHeight} onChange={handleChange}/>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="" className={styles.label}>Min Weight </label>
                <input type="text" name="minWeight" value={input.minWeight} onChange={handleChange}/>
                <label htmlFor="" className={styles.label}>Max Weight </label>
                <input type="text" name="maxWeight" value={input.maxWeight} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="" className={styles.label}>Lifespan </label>
                <input type="text" name="life_span" value={input.life_span} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="" className={styles.label}>Image Url </label>
                <input type="text" name="image" value={input.image} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="temperament" className={styles.label}>Temperaments </label>
                <select 
                multiple
                size="7"
                name="temperament"
                value={input.temperament}
                onChange={handleChange}
                >
                    
                {allTemperaments.map((temperament) => (
                <option key={temperament} value={temperament}>
                {temperament}
                </option>
                ))}
                </select>
            </div>
            <div className={styles.div}>
            {error && <p>{error}</p>}
                <button type="submit" className={styles.button} disabled={!allInputsFilled() || error}>Submit</button>
            </div>
        </form>
    )

}

export default CreateDog