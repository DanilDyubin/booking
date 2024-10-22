import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';

import SinglePageSlider from '../components/slider/single-page-slider/SinglePageSlider';
import PropertyInformation from '../components/layout/property-information/PropertyInformation';
import { db } from '../firebase';

const SinglePage = () => {
  return (
    <section>
      <div className="container">
        <div>SinglePage</div>
        <PropertyInformation />
      </div>
    </section>
  );
};

export default SinglePage;
