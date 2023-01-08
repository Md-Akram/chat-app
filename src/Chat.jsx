import { useState } from "react"

export const Chat = ({ socket, user, room }) => {
    const [message, setMessage] = useState('')

    const send = async () => {
        if (message !== '') {
            const messageData = {
                room: room,
                author: user,
                message: message,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            }
            await socket.emit('send_message', messageData)
        }
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <h1>Live Chat</h1>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input type="text" placeholder="your message..." onChange={(event) => {
                    setMessage(event.target.value)
                }} />
                <button onClick={send}>&#9658;</button>
            </div>
        </div>
    )
}