import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home(){

    return(
        <div>
            <div className={styles.welcomeMessage}>
                Welcome to askIBU!
            </div>
        </div>
    );
}

export default Home;
