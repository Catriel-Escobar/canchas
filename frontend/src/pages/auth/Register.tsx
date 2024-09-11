import { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { userStore } from '../../store/User.store';
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { register } = userStore();
  const handleSubmit = async () => {
    if (!email || !password || !name) {
      return alert('Todos los campos son obligatorios');
    }
    const data = {
      email,
      password,
      name,
    };
    await register(data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <input
          type='text'
          placeholder='Name'
          className={styles.inputField}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
        <button className={styles.googleButton}>Login with Google</button>
        <p className={styles.textBasic}>
          already registered ?{' '}
          <span className={styles.link}>
            {
              <Link to={'/login'} className={styles.link}>
                Log in
              </Link>
            }
          </span>
        </p>
      </div>
    </div>
  );
}
