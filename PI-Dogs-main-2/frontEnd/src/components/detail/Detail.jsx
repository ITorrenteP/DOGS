import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { dogsById, deleteDog } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Detail.module.css"

const Detail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    // const dog = useSelector(state => state.dogInfo)


    // useEffect(() => {
    //   dispatch(dogsById(id))
    //     },[dispatch, id])

    const [dog, setDog] = useState(null); // local state for dog data

  useEffect(() => {
    const fetchDog = async () => {
      const response = await dispatch(dogsById(id));
      console.log(response);
      setDog(response.payload); // update local state when data arrives
    };

    fetchDog();
  }, [dispatch, id]);

  if (!dog) {
    return <div>Loading...</div>; // display loading indicator while data is being fetched
  }

  const onDelete = async () => {
    dispatch(deleteDog(dog.id))
    alert("Dog deleted")
    navigate(-1)
  }
    
        
    const onClose = () => {
        navigate(-1)
      };    

    return <div>

        {
          isNaN(dog.id) ? (
            <div>
                <button onClick={onDelete} className={styles.button}>Delete Dog</button>
              </div>
          ) : null  
          }
          {
          
           dog ? (
            <div className={styles.container}>

                    {
                    <button onClick={onClose} className={styles.button}>X</button>
                    }
                    {/* <h4 className={styles.subtitle}>Id: {dog.id}</h4> */}
                    <h2 className={styles.title}>Name: {dog.name}</h2>
                    <h4 className={styles.subtitle}>Height: {dog.height} </h4>
                    <h4 className={styles.subtitle}>Weight: {dog.weight} </h4>
                    <h4 className={styles.subtitle}>Temperaments: {dog.temperament} </h4>
                    <h4 className={styles.subtitle}>Lifespan: {dog.life_span} </h4>
                    <img className={styles.image} src={dog.image} alt={dog.name}/>
            </div> 
           ) : ''
        }
    </div> 
}

export default Detail