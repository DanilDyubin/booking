import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import { db } from '../../../firebase';
import PropertyItem from '../../property-item/PropertyItem';
import Map from '../../map/Map';

import styles from './styles.module.scss';

export const PropertyList = () => {
  const [posts, setPosts] = useState([]);
  if (posts) {
  }

  useEffect(() => {
    const q = query(collection(db, 'posts'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        // postsArray.push({ postId: doc.id, ...doc.data() }); // тут мы вытаскиваем уникальный id поста, который в начале создания ему присваивает firebase, по которому мы потом будем к нему обращаться
        postsArray.push(doc.data());
      });
      setPosts(postsArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles['property-list']}>
      <div className={styles['property-list__left']}>
        <PropertyItem />
        <ul className={styles['property-list__list']}>
          {posts.map((item) => {
            return (
              <li key={item.id} className={styles['property-list__list--item']}>
                <PropertyItem post={item} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles['property-list__right']}>
        <Map />
      </div>
    </div>
  );
};

export default PropertyList;
