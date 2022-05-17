import { useState } from 'react'
import AuthService from '../utils/AuthService'
import styles from './Forms.module.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleLogin = async () => {
        const response = await AuthService.login(email, email, password)
		if (response.data.message) {
  	    	setMessage(response.data.message)
		}
		window.location.replace('/home')
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formTitle}>Login</div>
            <div className={styles.formSection}>
                <p>Email</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.formInput} />
            </div>
            <div className={styles.formSection}>
                <p>Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.formInput} />
            </div>
            <button className={styles.formSubmitButton} onClick={() => handleLogin()}>Login</button>
            {
                message &&
                <div className={styles.registerMessage}>
                    {message}
                </div>
            }
        </div>
    )
}

export default Login
