import { useState, useRef, useEffect } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import styles from './styles.module.scss';

const Sort = ({ data, dispatch, sortItem }) => {
  const [open, setOpen] = useState(false);
  //   const [sort, setSort] = useState({ title: 'Apartment', id: '1' });

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSort = (obj) => {
    dispatch(obj);
    setOpen(false);
  };

  const refModal = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      if (!e.composedPath().includes(refModal.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', clickOutside);
    return () => {
      document.body.removeEventListener('click', clickOutside);
    };
  }, []);

  const Modal = ({ data }) => {
    return (
      <div className={styles.modal}>
        <ul className={styles['modal__list']}>
          {data.map((item) => {
            return (
              <li
                key={item.id}
                className={
                  sortItem.id === item.id
                    ? styles['modal__list-item'] + ` ` + styles.active
                    : styles['modal__list-item']
                }
                onClick={() => handleSort(item)}>
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.sort} ref={refModal}>
      <button
        type="button"
        className={
          sortItem?.id !== 0
            ? styles['sort__btn'] + ` ` + styles['btn__active']
            : styles['sort__btn']
        }
        onClick={handleOpen}>
        <div className={styles['sort__title']}>{sortItem?.title || ''}</div>
        <RiArrowDownSLine style={{ fontSize: '22px' }} />
      </button>
      {open && <Modal data={data} />}
    </div>
  );
};

export default Sort;
