import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../firebase';

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (userId, { rejectWithValue }) => {
    try {
      // после того как юзер залогинился, получаем данные юзера из коллекции users по userId
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userInfo = docSnap.data();
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        return userInfo;
      } else {
        // Если документ не существует, отклоняем с ошибкой
        return rejectWithValue('No such document');
      }
    } catch (error) {
      // Если возникает ошибка, отклоняем с ошибкой
      return rejectWithValue(error.message);
    }
  },
);

export const logOut = createAsyncThunk('user/logOut', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    localStorage.removeItem('currentUser');
    return null; // т/к createAsyncThunk всегда должен возвращать значение (в случае успеха или ошибки), возвращение null чтобы не нарушать логику
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload.user;
      //   state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
        state.currentUser = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = 'success';
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.status = 'error';
        state.currentUser = null;
      });
    builder
      .addCase(logOut.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.currentUser = null;
        state.status = 'success';
      })
      .addCase(logOut.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
