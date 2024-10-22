import Promo from '../components/layout/promo/Promo';
import Market from '../components/layout/market/Market';

import { dataMarket } from '../data/dataMarket';

const HomePage = () => {
  return (
    <>
      <Promo />
      <Market data={dataMarket} />
    </>
  );
};

export default HomePage;
