import { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { userStore } from '../../store/User.store';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { login, googleAuth } = userStore();

  if (token && token.trim()) {
    googleAuth(token);
    navigate('/');
  }
  const handleSubmit = async () => {
    if (!email || !password) {
      return alert('Ambos campos son obligatorios');
    }
    const data = {
      email,
      password,
    };
    await login(data);
  };

  const handleGoogle = async () => {
    window.location.href =
      'http://localhost:8090/api/auth/oauth2/authorize/google';
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <input
          type='text'
          placeholder='Username'
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
        <button className={styles.googleButton} onClick={handleGoogle}>
          Login with Google
        </button>
        <p className={styles.textBasic}>
          Don't have an account?{' '}
          <span className={styles.link}>
            {
              <Link to={'/register'} className={styles.link}>
                Register
              </Link>
            }
          </span>
        </p>
      </div>
    </div>
  );
}
