import { useSelector, useDispatch } from 'react-redux';

import { logOut } from '../../../../redux/slices/userSlice';
import Button from '../../../ui/button/Button';

import ProfileMenu from '../../../profile-menu/ProfileMenu';

import styles from './styles.module.scss';

export const ProfileBar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // const updateProfile = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const userRef = doc(db, 'users', currentUser.id); // меняем имя юзера
  //     await updateDoc(userRef, {
  //       avatar: name,
  //     });

  //     onSnapshot(doc(db, 'users', currentUser.id), (user) => {
  //       dispatch(fetchUserById(user?.id)); // получаем актуальные данные юзера и обновляем их в redux
  //     });
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //   }
  // };

  // const updateProfile1 = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const imgUrl = await upload(avatar.file);
  //     const userRef = doc(db, 'users', currentUser.id); // меняем имя юзера
  //     await updateDoc(userRef, {
  //       avatar: imgUrl,
  //     });

  //     onSnapshot(doc(db, 'users', currentUser.id), (user) => {
  //       dispatch(fetchUserById(user?.id)); // получаем актуальные данные юзера и обновляем их в redux
  //     });
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //   }
  // };

  return (
    <section className={styles['profile-bar']}>
      <div className={styles['profile-bar__container']}>
        <div className={styles['profile-bar__information']}>
          <div className={styles['profile-bar__information-img']}>
            <img src={currentUser.avatar} alt="" />
          </div>
          <div className={styles['profile-bar__information-name']}>{currentUser.name}</div>
          <div className={styles['profile-bar__information-email']}>{currentUser.email}</div>
          <Button title="Logout" variant="primary" onClick={() => dispatch(logOut())} />
        </div>
      </div>
      <ProfileMenu />
    </section>
  );
};

export default ProfileBar;
