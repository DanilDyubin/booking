import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: { title: 'City', id: 0 },
  address: '',
  price: '',
  propertyType: { title: 'Property type', id: 0 },
  bedrooms: { title: 'Bedrooms', id: 0 },
  bathrooms: { title: 'Bathrooms', id: 0 },
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    setBedrooms: (state, action) => {
      state.bedrooms = action.payload;
    },
    setBathrooms: (state, action) => {
      state.bathrooms = action.payload;
    },
  },
});

export const { setCity, setAddress, setPrice, setPropertyType, setBedrooms, setBathrooms } =
  sortSlice.actions;
export default sortSlice.reducer;
