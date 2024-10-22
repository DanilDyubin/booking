import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Register from './register/Register';
import Login from './login/Login';
import img from '../../../assets/images/rent.svg';

import styles from './auth.module.scss';

interface IModalProps {
  setOpen: (state: boolean) => void;
}

const Auth = ({ setOpen }: IModalProps) => {
  const [isLogin, setIsLogin] = useState(false);

  // const toggleForm = () => {
  //     setIsLogin(!isLogin);
  //   };

  return (
    <div className={styles.auth}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome to Dubai rental</h2>
        <IoClose style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => setOpen(false)} />
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <img className={styles.img} src={img} alt="house" />
          <h3 className={styles.text}>View saved properties</h3>
          <h3 className={styles.text}>Keep search history across devices</h3>
          <h3 className={styles.text}>See which properties you have contacted</h3>
        </div>
        <div className={styles.right}>
          {isLogin ? (
            <Login setIsLogin={setIsLogin} setOpen={setOpen} />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
