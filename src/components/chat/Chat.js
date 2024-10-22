import { useState, useEffect } from 'react';

import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const Chat = () => {
  const [text, setText] = useState('');
  const [chat, setChat] = useState('');

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', 'E6AiJg6OcQz4FyJJ6gs7'), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <div>messages</div>
      <ul>
        <li>Hi!</li>
      </ul>
    </div>
  );
};

export default Chat;
