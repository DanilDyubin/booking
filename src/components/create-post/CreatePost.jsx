import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // импорт плагина из библиотеки dayjs

import { db } from '../../firebase';
import upload, { uploadMultiple } from '../../lib/upload';
import {
  setCity,
  setAddress,
  setPrice,
  setPropertyType,
  setBedrooms,
  setBathrooms,
} from '../../redux/slices/sortSlice';
import Sort from '../sort/Sort';
import Input from '../ui/input/Input';

import styles from './styles.module.scss';

const obj = {
  id: '',
  title: '',
  city: '',
  price: '',
  img: '',
  address: '',
  bedroom: '',
  bathroom: '',
  latitude: '',
  longitude: '',
  type: '',
  createdAt: '',
  user: {},
  userId: '',
};

dayjs.extend(customParseFormat); // расширяем ф-ю dayjs при помощи встроенного плагина

export const CreatePost = ({ data }) => {
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    title: '',
    latitude: '',
    longitude: '',
  });
  const [image, setImage] = useState({ file: null, url: '' });
  const [images, setImages] = useState({ files: null, url: '' });

  const user = useSelector((state) => state.user.currentUser);
  const { city, propertyType, bedrooms, bathrooms } = useSelector((state) => state.sort);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImages = (e) => {
    setImages({
      files: Array.from(e.target.files), // преобразуем объект files в массив
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleImage = (e) => {
    setImage({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const imgUrl = await upload(image.file);
    const imgsUrl = await uploadMultiple(images.files);
    console.log(imgsUrl);
    // dispatch(setAddress(formData.address));

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        id: new Date().getTime(), // в данном случае ненужная часть, т/к дальше мы присваиваем id, которой нам предоставит firebase после добавления поста
        title: formData.title,
        city: city.title,
        price: formData.price,
        img: imgsUrl,
        address: formData.address,
        bedrooms: bedrooms.title,
        bathrooms: bathrooms.title,
        latitude: formData.latitude,
        longitude: formData.longitude,
        type: propertyType.title,
        createdAt: dayjs().format('DD/MM/YYYY HH:mm'),
        user: user,
        userId: user.id,
        likesId: [],
      });
      await updateDoc(doc(db, 'posts', docRef.id), {
        // docRef.id - id, которое посту присваивает firebase, добавляем его к нам в док, чтобы проще было искать и работать с постом
        id: docRef.id,
      });
    } catch (error) {
      console.log(error);
    }
    setImage({ file: null, url: '' });
    setFormData({ address: '', price: '', title: '', latitude: '', longitude: '' });
    dispatch(setCity({ title: 'City', id: 0 }));
    dispatch(setPropertyType({ title: 'Property type', id: 0 }));
    dispatch(setBedrooms({ title: 'Bedrooms', id: 0 }));
    dispatch(setBathrooms({ title: 'Bathrooms', id: 0 }));
  };

  return (
    <div className={styles['create-post']}>
      <h2 className={styles['create-post__title']}>{data.title}</h2>
      <form className={styles['create-post__form']} onSubmit={handleSubmit}>
        <Sort data={data.city} sortItem={city} dispatch={(value) => dispatch(setCity(value))} />
        <Sort
          data={data.propertyType}
          sortItem={propertyType}
          dispatch={(value) => dispatch(setPropertyType(value))}
        />
        {/* <input type="file" onChange={handleImage} /> */}
        <div>multiple</div>
        <input type="file" multiple onChange={handleImages} />
        <Sort
          data={data.bathrooms}
          sortItem={bathrooms}
          dispatch={(value) => dispatch(setBathrooms(value))}
        />
        <Sort
          data={data.bedrooms}
          sortItem={bedrooms}
          dispatch={(value) => dispatch(setBedrooms(value))}
        />
        <Input
          type={'text'}
          name={'title'}
          value={formData.title}
          onChange={handleChange}
          label="Title"
        />
        <Input
          type="text"
          name={'price'}
          value={formData.price}
          onChange={handleChange}
          label="Price in AED"
        />
        <Input
          type={'text'}
          name={'address'}
          value={formData.address}
          onChange={handleChange}
          label="Address"
        />
        <Input
          type={'text'}
          name={'latitude'}
          value={formData.latitude}
          onChange={handleChange}
          label="Latitude"
        />
        <Input
          type={'text'}
          name={'longitude'}
          value={formData.longitude}
          onChange={handleChange}
          label="Longitude"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
