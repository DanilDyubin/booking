import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const UserMenu = ({ user }: any) => {
  return (
    <Link to="/profile">
      <div className={styles['user-menu']}>
        <div className={styles['user-img']}>
          <img src={user.avatar} alt="avatar" />
        </div>
        <p className={styles['user-name']}>{user.name}</p>
      </div>
    </Link>
  );
};

export default UserMenu;
