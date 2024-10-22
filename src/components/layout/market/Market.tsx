import Slider from '../../slider/Slider';

import styles from './market.module.scss';

const Market = ({ data }: any) => {
  return (
    <section className={styles.market}>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title}>
          {data.title}
          <span>{data.icon}</span>
        </h2>
        <p className={styles.text}>{data.text}</p>
        <Slider data={data.items} />
      </div>
    </section>
  );
};

export default Market;
