import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './styles.module.scss';

const StarRating = () => {
  const [selected, setSelected] = useState(2);
  // const starsArray = [...Array(5)]; // альтернатива методу ниже
  const starsArray = Array.from({ length: 5 }); // создаем массив из 5 undefined значений
  console.log(starsArray);

  const handleRating = (i) => {
    setSelected(i + 1);
  };

  return (
    <div className={styles['star-rating']}>
      {starsArray.map((item, i) => {
        return (
          <FaStar
            key={i}
            className={selected > i ? styles.star + ' ' + styles.selected : styles.star}
            onClick={() => handleRating(i)}
          />
        );
      })}
      <div>{selected}</div>
    </div>
  );
};

export default StarRating;
