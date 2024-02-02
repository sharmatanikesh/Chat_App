import './App.css'
import io from 'socket.io-client'
import {useEffect, useState} from 'react'

const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  const joinRoom = () => {
      if (room !== '') {
          socket.emit('join_room', room);
      }
  };

  const sendMessage = () => {
      socket.emit('send_message', { message, room });
      setMessage(''); // Clear the input after sending a message
  };

  useEffect(() => {
      socket.on('receive_message', (data) => {
          console.log('MESSAGE RECEIVED', data.message);
          setMessageReceived(data.message);
          setMessageHistory((prevHistory) => [...prevHistory, { content: data.message, sender: data.sender }]);
      });
  }, [socket]);

  return (
      <>
          <div className="App">
              <div>
                  <ul>
                      {messageHistory.map((msg, index) => (
                          <li key={index}>
                               {msg.content}
                          </li>
                      ))}
                  </ul>
              </div>
              <div>
                  <input
                      placeholder="Room Number..."
                      onChange={(event) => {
                          setRoom(event.target.value);
                      }}
                  />
                  <button onClick={joinRoom}>Join Room</button>
              </div>
              <div>
                  <input
                      placeholder="Message..."
                      onChange={(event) => {
                          setMessage(event.target.value);
                      }}
                      value={message}
                  />
                  <button onClick={sendMessage}>Send Message</button>
              </div>
          </div>
      </>
  );
}

export default App;