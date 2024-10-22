import { MdOutlineTravelExplore } from 'react-icons/md';
import img1 from '../assets/images/slider/dubai.jpg';
import img2 from '../assets/images/slider/abu_dhabi.jpg';
import img3 from '../assets/images/slider/sharjah.jpg';
import img4 from '../assets/images/slider/ras_al_khaimah.jpg';
import img5 from '../assets/images/slider/ajman.jpg';

export const dataMarket = {
  title: 'Explore the UAE market',
  icon: <MdOutlineTravelExplore />,
  text: 'Dive deep into the UAE’s real estate market with prices, transaction histories and community insights to help you make an educated decision.',
  items: [
    {
      image: img1,
      name: 'Dubai',
    },
    {
      image: img2,
      name: 'Abu Dhabi',
    },
    {
      image: img3,
      name: 'Sharjah',
    },
    {
      image: img4,
      name: 'Ras Al Khaimah',
    },
    {
      image: img5,
      name: 'Ajman',
    },
  ],
};
