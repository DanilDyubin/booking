import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { doc, updateDoc, onSnapshot } from 'firebase/firestore';

import { fetchUserById } from '../../../../redux/slices/userSlice';
import upload from '../../../../lib/upload';
import { auth, db } from '../../../../firebase';

import styles from './styles.module.scss';

const ProfileChange = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState({ file: null, url: '' });

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleAvatar = (e) => {
    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const userRef = doc(db, 'users', currentUser.id);

      let updateData = {}; // создаем объект для обновления, чтобы проверять есть ли name и avatar

      if (name) {
        updateData.name = name;
      }

      if (avatar.file) {
        const imgUrl = await upload(avatar.file);
        updateData.avatar = imgUrl;
      }

      if (Object.keys(updateData).length > 0) {
        await updateDoc(userRef, updateData); // меняем данные юзера в fireBase

        onSnapshot(doc(db, 'users', currentUser.id), (user) => {
          dispatch(fetchUserById(user?.id)); // получаем актуальные данные юзера и обновляем их в redux
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className={styles['profile-change']}>
      <h2 className={styles['profile-hange__title']}>Change profile</h2>
      <div className={styles['profile-change__img']}>
        <img src={currentUser.avatar} alt="" />
      </div>
      <form onSubmit={updateProfile}>
        <label htmlFor="file">upload image</label>
        <input
          className={styles['profile-change__input--img']}
          type="file"
          id="file"
          onChange={handleAvatar}
        />
        <button type="submit">change avatar</button>
      </form>
      <form onSubmit={updateProfile}>
        <input
          type="text"
          // defaultValue={currentUser.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">change name</button>
      </form>
    </div>
  );
};

export default ProfileChange;
