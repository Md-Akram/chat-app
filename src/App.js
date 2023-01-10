import { useState } from 'react'
import { Chat } from './Chat'
import './App.css';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

function App() {
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const join = () => {
    if (user !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }

  return (

    <div className="App">
      {!showChat ? (
        <div className='joinChatContainer' >
          <h3>Join a Chat</h3>
          <input type='text' placeholder='Enter Your Name' onChange={(event) => {
            setUser(event.target.value)
          }} />
          <input type='text' placeholder='Enter Room Id' onChange={(event) => {
            setRoom(event.target.value)
          }} />
          <button onClick={join}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} user={user} room={room} />
      )}

    </div>
  );
}

export default App;
