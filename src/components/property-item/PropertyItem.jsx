import { useSelector } from 'react-redux';

import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';

import { GrLocation } from 'react-icons/gr';
import { PiBathtub } from 'react-icons/pi';
import { LiaBedSolid } from 'react-icons/lia';
import { IoMdMail } from 'react-icons/io';
import { FaRegHeart } from 'react-icons/fa';

import img from '../../assets/images/no-avatar.jpg';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const str = 'Elite Downtown Residence, Downtown Dubai, Dubai';

const PropertyItem = ({ post }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!post) {
    return null;
  }

  const handleLike = async (postId) => {
    const postRef = doc(db, 'posts', postId);

    try {
      await updateDoc(postRef, {
        likesId: arrayUnion(currentUser.id),
      });
    } catch (error) {}
  };

  return (
    <div className={styles['property-item']}>
      <article className={styles['property-item__card']}>
        <div className={styles['property-item__wrapper']}>
          <Link to={`/property/${post.id}`}>
            <div className={styles['property-item__img']}>
              <img src={post.img[0] || img} alt="property-img" />
              <div className={styles['property-item__hovered']}>see more details</div>
            </div>
          </Link>
          <div className={styles['property-item__content']}>
            <div className={styles['property-item__content-top']}>
              <div className={styles['property-item__type']}>{post.type}</div>
              <div className={styles['property-item__price']}>{post.price} AED/night</div>
              <div className={styles['property-item__name']}>{post.title}</div>
            </div>
            <div className={styles['property-item__content-bottom']}>
              <div className={styles['property-item__location']}>
                <GrLocation />
                <p className={styles['property-item__location-text']}>
                  {post.address.length > 42 ? str.slice(0, 42) + '...' : post.address}
                </p>
              </div>
              <div className={styles['property-item__details']}>
                <p className={styles['property-item__details-item']}>
                  <PiBathtub className={styles['property-item__details-icon']} />
                  {post.bedrooms} bedroom
                </p>
                <p className={styles['property-item__details-item']}>
                  <LiaBedSolid className={styles['property-item__details-icon']} />
                  {post.bathrooms} bathroom
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['property-item__footer']}>
          <div className={styles['property-item__owner']}>
            <div className={styles['property-item__owner-img']}>
              <img src={post.user.avatar || img} alt="owner-avatar" />
            </div>
            <p className={styles['property-item__owner-name']}>
              {post.user.name} posted {post.createdAt}
            </p>
          </div>

          <div className={styles['property-item__btns']}>
            <button className={styles['property-item__btn']}>
              <IoMdMail className={styles['property-item__btn-icon']} />
              Send a message
            </button>
            <button className={styles['property-item__btn']} onClick={() => handleLike(post.id)}>
              <FaRegHeart className={styles['property-item__btn-icon']} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PropertyItem;
