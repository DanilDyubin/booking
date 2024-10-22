import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../firebase';

import Layout from '../../pages/Layout';
import HomePage from '../../pages/HomePage';
import SearchPage from '../../pages/SearchPage';
import SinglePage from '../../pages/SinglePage';
import ProfilePage from '../../pages/ProfilePage';
import Profile from '../layout/profile/Profile';
import Messages from '../layout/messages/Messages';
import MyAd from '../layout/my-ad/MyAd';
import Favorites from '../layout/favorites/Favorites';

import { fetchUserById } from '../../redux/slices/userSlice';

const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      //   errorElement: <PageNotFound />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/search',
          element: <SearchPage />,
        },
        {
          path: '/property/:postId',
          element: <SinglePage />,
        },
        {
          path: '/profile',
          element: currentUser ? <ProfilePage /> : <Navigate to="/" />,
          children: [
            {
              path: '/profile',
              element: <Profile />,
            },
            {
              path: '/profile/messages',
              element: <Messages />,
            },
            {
              path: '/profile/myAd',
              element: <MyAd />,
            },
            {
              path: '/profile/favorites',
              element: <Favorites />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
