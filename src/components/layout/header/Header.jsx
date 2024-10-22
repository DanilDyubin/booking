import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';

import { ThemeContext } from '../../../context/ThemeContext';
import Logo from '../../ui/logo/Logo';
import ThemeComponent from '../../ui/themeComponent/ThemeComponent';
import UserMenu from '../../user-menu/UserMenu';
import Button from '../../ui/button/Button';
import Modal from '../../modal/Modal';
import Auth from '../auth/Auth';
import { auth } from '../../../firebase';
import { logOut } from '../../../redux/slices/userSlice';

import styles from './header.module.scss';

const Header = () => {
  const [open, setOpen] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  // const logOut = (auth: any) => {
  //   return signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //     });
  // };

  const { theme, onChangeTheme } = useContext(ThemeContext);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <button onClick={() => dispatch(logOut())}>Logout</button>
        <ThemeComponent theme={theme} onChangeTheme={onChangeTheme} />
        {currentUser ? (
          <UserMenu user={currentUser} />
        ) : (
          <Button title="Log in" variant="secondary" onClick={() => setOpen(true)} />
        )}
        {open && (
          <Modal>
            <Auth setOpen={setOpen} />
          </Modal>
        )}
      </div>
    </header>
  );
};

export default Header;
