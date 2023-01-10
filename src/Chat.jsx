import { useEffect } from "react"
import { useState } from "react"

export const Chat = ({ socket, user, room }) => {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const send = async () => {
        if (message !== '') {
            const messageData = {
                room: room,
                author: user,
                message: message,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            }
            await socket.emit('send_message', messageData)
            setMessageList((messageList) => [...messageList, messageData])
        }
    }

    useEffect(() => {
        socket.on('reveive_message', (data) => {
            setMessageList((prevList) => [...prevList, data])
            console.log(data);
        })
    }, [socket])

    return (
        <div className="chat">
            <div className="chat-header">
                <h1>Live Chat</h1>
            </div>
            <div className="chat-body">
                {messageList.map((messageContent, index) => {
                    return (<div className="message " key={index}>
                        <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p>{messageContent.time}</p>
                                <p>{messageContent.author}</p>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="your message..." onChange={(event) => {
                    setMessage(event.target.value)
                }} />
                <button onClick={send}>&#9658;</button>
            </div>
        </div>
    )
}