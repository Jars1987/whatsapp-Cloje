import Head from 'next/head';
import styled from 'styled-components';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/sidebar';
import {
  doc,
  getDocs,
  getDoc,
  collection,
  orderBy,
  query,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  //Prep the messages
  const ref = query(
    collection(db, 'chats', context.query.id, 'messages'),
    orderBy('timestamp', 'asc')
  );
  const messagesRef = await getDocs(ref);

  const messages = messagesRef.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //Prep the chats
  const chatRes = await getDoc(doc(db, 'chats', context.query.id));
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
flex: 1;
overflow: scroll;
height: 100vh;

::-webkit-scrollbar {
  display: none;
}

-ms-overflow-style: none;
scrollbar-width:: none;

`;
