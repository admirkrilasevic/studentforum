import styles from './Footer.module.css'
import { Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className={styles.footer}>
            <Container className={'no-gutters'}>
                <Row className={styles.footerContent}>
                    <Col>
                        <div className={styles.footerColumn}>
                            <p>{new Date().getFullYear()}</p>
                            <p>© askIBU</p>
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.footerColumn}>
                            <p>
                                <Link to="/about">About Us</Link>
                            </p>
                            <p>
                                <Link to="/contact">Contact</Link>
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.footerColumn}>
                            <p>
                                <Link to="/privacy">Privacy Policy</Link>
                            </p>
                            <p>
                                <Link to="/terms">Terms and Conditions</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
