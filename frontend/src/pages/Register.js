import { useState } from 'react'
import AuthService from '../utils/AuthService'
import styles from './Forms.module.css'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [facultyId, setFacultyId] = useState('')
    const [message, setMessage] = useState('')

    const handleRegister = async () => {
        const response = await AuthService.register(name, email, password, facultyId, departmentId)
        setMessage(response)
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formTitle}>Register</div>
            <div className={styles.formSection}>
                <p>Name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.formInput} />
            </div>
            <div className={styles.formSection}>
                <p>Email</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.formInput} />
            </div>
            <div className={styles.formSection}>
                <p>Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.formInput} />
            </div>
            <div className={styles.formSection}>
                <p>Department</p>
                <input type="text" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} className={styles.formInput} />
            </div>
            <div className={styles.formSection}>
                <p>Faculty</p>
                <input type="text" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} className={styles.formInput} />
            </div>
            <button className={styles.formSubmitButton} onClick={() => handleRegister()}>Register</button>
            {
                message &&
                <div className={styles.registerMessage}>
                    {message}
                </div>
            }
        </div>
    )
}

export default Register
