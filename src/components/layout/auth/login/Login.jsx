import { FC, FormEvent, ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { fetchUserById } from '../../../../redux/slices/userSlice';
import Button from '../../../ui/button/Button';
import { ILogin } from '../../../../shared/interfaces/form.interface';
import { auth, db } from '../../../../firebase';

import styles from './login.module.scss';

// interface IRegisterProps {
//   setIsLogin: (state: boolean) => void;
//   setOpen: (state: boolean) => void;
// }

const Login = ({ setIsLogin, setOpen }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // логин
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = auth.currentUser;
      dispatch(fetchUserById(user?.uid));

      setFormData({ email: '', password: '' });
      setOpen(false);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles['input-field']}>
          <input
            type="email"
            // placeholder="Email"
            name="email"
            className={styles.input}
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label className={styles.label}>Email</label>
        </div>
        <div className={styles['input-field']}>
          <input
            type="password"
            // placeholder="Password"
            name="password"
            className={styles.input}
            required
            value={formData.password}
            onChange={handleChange}
          />
          <label className={styles.label}>Password</label>
        </div>
        <Button
          title={loading ? 'Loading' : 'Login'}
          variant="primary"
          className="modal"
          disabled={loading}
        />
      </form>
      <div className={styles.link}>
        Don't have an account? <span onClick={() => setIsLogin(false)}>Sign up!</span>
      </div>
    </div>
  );
};

export default Login;
