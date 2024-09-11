import { useEffect } from 'react';
import { userStore } from '../../store/User.store';
import { Outlet } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import styles from './Home.module.css';
export default function HomeLayout() {
  const { isLoading, messageError, clearError, messageSuccess, clearSuccess } =
    userStore();

  useEffect(
    () => {
      if (messageError) {
        alert(messageError);
        clearError();
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messageError]
  );

  useEffect(
    () => {
      if (messageSuccess) {
        alert(messageSuccess);
        clearSuccess();
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messageSuccess]
  );
  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      <Outlet />
    </div>
  );
}
