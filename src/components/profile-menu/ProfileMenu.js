import { NavLink } from 'react-router-dom';
import { dataProfileMenu } from '../../data/dataProfileMenu';

import styles from './styles.module.scss';

const ProfileMenu = () => {
  const ProfileMenuItem = (props) => {
    const { data } = props;
    return (
      <li className={styles['profile-menu__item']}>
        <NavLink
          to={`/profile/${data.link}`}
          end={data.link === ''}
          className={({ isActive }) =>
            isActive
              ? styles['profile-menu__item--link--active']
              : styles['profile-menu__item--link']
          }>
          <span className={styles['profile-menu__item--icon']}>{data.icon}</span>
          <div className={styles['profile-menu__item--title']}>{data.title}</div>
        </NavLink>
      </li>
    );
  };
  return (
    <div className={styles['profile-menu']}>
      <ul className={styles['profile-menu__list']}>
        {dataProfileMenu.map((item) => {
          return <ProfileMenuItem data={item} key={item.title} />;
        })}
      </ul>
    </div>
  );
};

export default ProfileMenu;
