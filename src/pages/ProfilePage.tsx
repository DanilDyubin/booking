import { Outlet } from 'react-router-dom';
import ProfileBar from '../components/layout/profile/profile-bar/ProfileBar';
import ChatList from '../components/chat-list/ChatList';
import Chat from '../components/chat/Chat';

export const ProfilePage = () => {
  return (
    <>
      <div
        className="container profile-page__container"
        style={{ display: 'flex', gap: '30px', paddingTop: '20px' }}>
        <ProfileBar />
        <Outlet />
      </div>
    </>
  );
};

export default ProfilePage;
