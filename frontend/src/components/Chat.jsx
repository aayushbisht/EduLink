import React, { useState, useEffect } from 'react';
const Chat = ({ userType, loggedInUserId, userId, socket }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // const handleSendMessage = () => {
  //   if (!isSending && message.trim() !== '') {
  //     setIsSending(true);
  //     socket.emit('chatMessage', {
  //       userType,
  //       loggedInUserId,
  //       userId,
  //       message,
  //     });
  //     setMessage('');
  //     setIsSending(false);
  //   }
  // };
const handleSendMessage = () => {
    if (!isSending && message.trim() !== '') {
      setIsSending(true);
  
      try {
        socket.emit('chatMessage', {
          userType,
          loggedInUserId,
          userId,
          message,
        });
  
        setMessage('');
      } catch (error) {
        console.error('Error sending chat message:', error);
      } finally {
        setIsSending(false);
      }
    }
  };
  useEffect(() => {
    if (socket) {
      socket.emit('setUser', loggedInUserId);

      socket.on('chatMessage', (data) => {
        setChatHistory((prevHistory) => [...prevHistory, data]);
      });

      socket.on('initialChatHistory', (initialHistory) => {
        setChatHistory(initialHistory);
      });

      return () => {
        socket.off('chatMessage');
        socket.off('initialChatHistory');
      };
    }
  }, [socket, loggedInUserId]);

  const filteredChatHistory = chatHistory.filter(
    (message) =>
      (message.loggedInUserId === loggedInUserId && message.userId === userId) ||
      (message.loggedInUserId === userId && message.userId === loggedInUserId)
  );

  const chatContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    overflowY: 'auto',
  };

  const messageStyle = {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '10px',
  };

  const senderMessageStyle = {
    ...messageStyle,
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  };

  const recipientMessageStyle = {
    ...messageStyle,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  };

  return (
    <div>
  <button type="button" class="btn btn-primary rounded-2" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
</svg> Chat Now</button>
  
    <div class="collapse m-2" id="collapseExample"  style={{ flexDirection: 'column', height: '100%' }}>
      <div style={chatContainerStyle} className="chat-history">
        {filteredChatHistory.map((message, index) => (
          <div
            key={index}
            style={message.loggedInUserId === loggedInUserId ? senderMessageStyle : recipientMessageStyle}
          >
            <span>{message.message}</span>
          </div>
        ))}
      </div>
      <div className="input-container" style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button onClick={handleSendMessage} disabled={isSending} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#00bfa5', color: 'white', border: 'none' }}>
          Send
        </button>
      </div>
    </div>
    </div>
  );
};

export default Chat;
