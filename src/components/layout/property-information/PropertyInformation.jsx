import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../../firebase';
import Modal from '../../modal/Modal';
import SinglePageSlider from '../../slider/single-page-slider/SinglePageSlider';

import styles from './styles.module.scss';

export const PropertyInformation = () => {
  const [openSlider, setOpenSlider] = useState(false);
  const [post, setPost] = useState({});

  const { postId } = useParams();

  const getPost = async () => {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      setPost(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <div className={styles['property-information']}>
      <button onClick={() => setOpenSlider(true)}>Open Slider</button>
      <div>{post.title}</div>
      {openSlider && (
        <Modal>
          <SinglePageSlider setOpenSlider={setOpenSlider} imgs={post?.img}></SinglePageSlider>
        </Modal>
      )}
    </div>
  );
};

export default PropertyInformation;
