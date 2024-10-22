import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { collection, query, where, getDocs } from 'firebase/firestore';

import { db } from '../../../firebase';
import PropertyItem from '../../property-item/PropertyItem';

const MyAd = () => {
  const [posts, setPosts] = useState([]);

  const currentUser = useSelector((state) => state.user.currentUser);

  const getFavoritesProperty = async () => {
    const q = query(collection(db, 'posts'), where('userId', '==', currentUser.id));

    const querySnapshot = await getDocs(q);
    const postsArray = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      postsArray.push(doc.data());
    });
    setPosts(postsArray);
    console.log(posts);
  };

  useEffect(() => {
    getFavoritesProperty();
  }, []);

  return (
    <section>
      <div>MyAd</div>
      <ul>
        {posts?.map((item) => {
          return <PropertyItem item={item} />;
        })}
      </ul>
    </section>
  );
};

export default MyAd;
