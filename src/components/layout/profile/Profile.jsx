import CreatePost from '../../create-post/CreatePost';
import ProfileChange from '../profile/profile-change/ProfileChange';
import { dataCreatePost } from '../../../data/dataCreatePost';

import styles from './profile.module.scss';

const Profile = () => {
  return (
    <section className={styles.profile}>
      <ProfileChange />
      <CreatePost data={dataCreatePost} />
    </section>
  );
};

export default Profile;
