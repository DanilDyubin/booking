import { ReactNode } from 'react';
import Portal from '../portal/Portal';

import styles from './modal.module.scss';

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <Portal>
      <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>
  );
};

export default Modal;
