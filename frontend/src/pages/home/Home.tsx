import { userStore } from '../../store/User.store';
import styles from './Home.module.css';

export default function Home() {
  const { user, logout } = userStore();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src='./1707691761584.jpg'
          alt={'prueba'}
          className={styles.image}
        />
        <div className={styles.details}>
          <h2 className={styles.name}>{user?.name}</h2>
          <p className={styles.email}>{user?.email}</p>
          <button className={styles.logoutButton} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
