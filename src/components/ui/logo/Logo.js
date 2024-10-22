import { Link } from 'react-router-dom';
import { BsFillBuildingsFill } from 'react-icons/bs';
import styles from './logo.module.scss';

const Logo = () => {
  return (
    <Link to="/">
      <div className={styles.logo}>
        <BsFillBuildingsFill className={styles.icon} />
        <div className={styles.title}>
          <span>Dubai</span>
          <span>rental</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
