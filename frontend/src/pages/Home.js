import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from '../components/homePage/Sidebar'
import styles from './Home.module.css'

function Home() {
    return (
        <Container className={styles.homeContainer}>
            <Row>
                <Col xs={3}>
                    <Sidebar />
                </Col>
                <Col>
                    <div className={styles.welcomeMessage}>
                        Welcome to askIBU! <br></br>
                        Choose a deparment from the side menu to view courses and discussions.
                    </div>
                </Col>                
            </Row>
        </Container>
    )
}

export default Home
