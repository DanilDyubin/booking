import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { ThemeValue } from '../../../context/ThemeContext';

import styles from './themeComponent.module.scss';

const ThemeComponent = ({ theme, onChangeTheme }: ThemeValue) => {
  return (
    <div className={styles.theme} onClick={onChangeTheme}>
      {theme === 'light' ? (
        <IoMdSunny className={styles.icon} />
      ) : (
        <IoMdMoon className={styles.icon} />
      )}
    </div>
  );
};

export default ThemeComponent;
