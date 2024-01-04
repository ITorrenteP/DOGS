import Nav from '../nav/Nav'
import styles from './Landing.module.css'

function Landing() {
    return (
        <div className={styles.landingContainer}>
             <Nav />
            <h1 className={styles.title}>Welcome to the Dogs App</h1>
            {/* <h1>Created by Isabella Torrente</h1> */}
        </div>
    )

}

export default Landing