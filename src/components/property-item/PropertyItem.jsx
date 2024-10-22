import { GrLocation } from 'react-icons/gr';
import { PiBathtub } from 'react-icons/pi';
import { LiaBedSolid } from 'react-icons/lia';
import { IoMdMail } from 'react-icons/io';
import { FaRegHeart } from 'react-icons/fa';
import img from '../../assets/images/no-avatar.jpg';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const str = 'Elite Downtown Residence, Downtown Dubai, Dubai';

const PropertyItem = ({ item }) => {
  if (!item) {
    return null;
  }
  console.log(item.id); // eM0T0lA63VKMap17z3yx

  return (
    <Link to={`/property/${item.id}`}>
      <div className={styles['property-item']}>
        <article className={styles['property-item__card']}>
          <div className={styles['property-item__wrapper']}>
            <div className={styles['property-item__img']}>
              <img src={item.img[0] || img} alt="property-img" />
            </div>
            <div className={styles['property-item__content']}>
              <div className={styles['property-item__content-top']}>
                <div className={styles['property-item__type']}>{item.type}</div>
                <div className={styles['property-item__price']}>{item.price} AED/night</div>
                <div className={styles['property-item__name']}>{item.title}</div>
              </div>
              <div className={styles['property-item__content-bottom']}>
                <div className={styles['property-item__location']}>
                  <GrLocation />
                  <p className={styles['property-item__location-text']}>
                    {item.address.length > 42 ? str.slice(0, 42) + '...' : item.address}
                  </p>
                </div>
                <div className={styles['property-item__details']}>
                  <p className={styles['property-item__details-item']}>
                    <PiBathtub className={styles['property-item__details-icon']} />
                    {item.bedrooms} bedroom
                  </p>
                  <p className={styles['property-item__details-item']}>
                    <LiaBedSolid className={styles['property-item__details-icon']} />
                    {item.bathrooms} bathroom
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['property-item__footer']}>
            <div className={styles['property-item__owner']}>
              <div className={styles['property-item__owner-img']}>
                <img src={item.user.avatar || img} alt="owner-avatar" />
              </div>
              <p className={styles['property-item__owner-name']}>
                {item.user.name} posted {item.createdAt}
              </p>
            </div>

            <div className={styles['property-item__btns']}>
              <button className={styles['property-item__btn']}>
                <IoMdMail className={styles['property-item__btn-icon']} />
                Send a message
              </button>
              <button className={styles['property-item__btn']}>
                <FaRegHeart className={styles['property-item__btn-icon']} />
              </button>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
};

export default PropertyItem;
