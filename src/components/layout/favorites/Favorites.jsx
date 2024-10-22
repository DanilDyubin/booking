import { useState } from 'react';
import StarRating from '../../starRating/StarRating';
import './styles.scss';

const Favorites = () => {
  return (
    <section>
      <div>Favorites</div>
      <StarRating />
    </section>
  );
};

export default Favorites;
