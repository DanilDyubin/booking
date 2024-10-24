import { FC, FormEvent, ChangeEvent, useState } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Button from '../../../ui/button/Button';
import { IRegister } from '../../../../shared/interfaces/form.interface';
import { auth, db } from '../../../../firebase';
import upload from '../../../../lib/upload';
import img from '../../../../assets/images/no-avatar.jpg';
import defaultImg from '../../../../assets/images/no-image.png';

import styles from './register.module.scss';

interface IRegisterProps {
  setIsLogin: (state: boolean) => void;
}

const Register: FC<IRegisterProps> = ({ setIsLogin }) => {
  const [formData, setFormData] = useState<IRegister>({ name: '', email: '', password: '' });
  const [avatar, setAvatar] = useState<any>({ file: null, url: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatar = (e: any) => {
    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]), // временный url, который мы используем для предварительного просмотра изображения
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // регистрация юзера
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const imgUrl = await upload(avatar.file);

      // создание документа с данными юзера в firestore
      await setDoc(doc(db, 'users', res.user.uid), {
        name: formData.name,
        email: formData.email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
        favorites: [],
      });
      // создание документа с чатами юзера
      await setDoc(doc(db, 'userchats', res.user.uid), {
        chats: [],
      });
      setFormData({ name: '', email: '', password: '' });
      setIsLogin(true);
    } catch (error: any) {
      // console.log(error);
      // console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.avatar}>
          <div className={styles.img}>
            <img src={avatar.url || img} alt="" />
          </div>
          <label htmlFor="file" className={styles['label-avatar']}>
            Upload image
          </label>
          <input
            type="file"
            id="file"
            className={styles['input-avatar']}
            required
            onChange={handleAvatar}
          />
        </div>
        <div className={styles['input-field']}>
          <input
            type="text"
            // placeholder="Name"
            name="name"
            className={styles.input}
            required
            value={formData.name}
            onChange={handleChange}
          />
          <label className={styles.label}>Name</label>
        </div>
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
          title={loading ? 'Loading' : 'Register'}
          variant="primary"
          className="modal"
          disabled={loading}
        />
        {error && <span>{error}</span>}
      </form>
      <div className={styles.link}>
        Already have an account? <span onClick={() => setIsLogin(true)}>Login!</span>
      </div>
    </div>
  );
};

export default Register;
