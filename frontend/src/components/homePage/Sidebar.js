import styles from './Sidebar.module.css'
import { Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FacultyService from '../../utils/FacultyService'
import { useEffect, useState } from 'react';
import Faculty from './Faculty';

function Sidebar() {

    const [faculties, setFaculties] = useState([]);

    const retrieve = async () => {
        const response = await FacultyService.getFaculties();
        setFaculties(response);
    };
    
    useEffect(() => {
        retrieve();
    }, []); 

    return (
        <div className={styles.sidebar}>
            {faculties.map((faculty) => {
                return (
                    <div>
                        <Faculty faculty={faculty}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Sidebar
