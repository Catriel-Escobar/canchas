import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import { userStore } from '../../store/User.store';
import Spinner from '../../components/Spinner';
import { useEffect } from 'react';
export default function AuthLayout() {
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
