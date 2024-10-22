import { IoIosArrowDown } from 'react-icons/io';
import { IoSearchSharp } from 'react-icons/io5';

import video from '../../../assets/home.mp4';
import styles from './promo.module.scss';

const Promo = () => {
  const dataControls = ['Rent', 'Buy'];
  const dataFilters = ['Dates', 'Guests'];

  const ControlsBtn = ({ name }) => {
    return <button className={styles['controls-btn']}>{name}</button>;
  };

  const FiltersBtn = ({ name }) => {
    return (
      <button className={styles['filters-btn']}>
        <span>{name}</span>
        <IoIosArrowDown />
      </button>
    );
  };

  return (
    <section className={styles.promo}>
      <video className={styles.video} autoPlay muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className={styles.overlay}></div>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>We Open Doors</h1>
        <div className={styles.content}>
          <div className={styles.control}>
            {dataControls.map((name, i) => (
              <ControlsBtn name={name} key={i} />
            ))}
          </div>
          <div className={styles.filters}>
            <div className={styles.input}>
              <IoSearchSharp style={{ fontSize: '20px' }} />
              <input type="text" placeholder="City" />
            </div>
            {dataFilters.map((name, i) => (
              <FiltersBtn name={name} key={i} />
            ))}
            <button className={styles['search-btn']}>Search</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
