import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  collection,
  query,
  where,
  setDoc,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';

import { db } from '../../firebase';

import styles from './styles.module.scss';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [name, setName] = useState('');
  const [user, setUser] = useState('');

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // получаем список чатов юзера в реальном времени
    const unsub = onSnapshot(doc(db, 'userchats', currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        // получаем данные конкретного юзера из нашего чата по его id
        const userDocRef = doc(db, 'users', item.recieverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return { ...item, user }; // item - вся информация чата, user - юзер
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unsub();
    };
  }, [currentUser.id]);

  const searchFunc = async (e) => {
    e.preventDefault();
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('name', '==', name));

      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, ' => ', doc.data());
      // });
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addChat = async () => {
    const chatRef = collection(db, 'chats');
    const userChatRef = collection(db, 'userchats');

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          recieverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          recieverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ChatItem = (props) => {
    const { chat } = props;

    return (
      <li className={styles['chat-list__item']}>
        <img src={chat?.user.avatar} alt="" style={{ width: '50px' }} />
        <div className={styles['chat-list__item-name']}>{chat?.user.name}</div>
        {/* <div className={styles['chat-list__item-message']}>{chat.time}</div> */}
      </li>
    );
  };

  return (
    <div className={styles['chat-list']} style={{ marginTop: '40px' }}>
      <div className={styles.container}>
        <div className={styles['chat-list__users']}>
          <ul className={styles['chat-list__chats']}>
            {chats.map((chat, i) => (
              <ChatItem chat={chat} key={i} />
            ))}
          </ul>
          <form onSubmit={searchFunc}>
            <input
              type="text"
              placeholder="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button>search</button>
          </form>
          <div>
            <div>{user.name}</div>
            <button onClick={addChat}>send message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
