import { useEffect } from "react"
import { useState } from "react"
import ScrollToBottom from 'react-scroll-to-bottom'

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
            setMessage('')
        }
    }

    useEffect(() => {
        socket.on('reveive_message', (data) => {
            setMessageList((prevList) => [...prevList, data])
            console.log(data);
        })
    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, index) => {
                        return (<div className="message " id={user === messageContent.author ? "you" : 'other'} key={index}>
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>)
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={message}
                    placeholder="your message..."
                    onChange={(event) => {
                        setMessage(event.target.value)
                    }}
                    onKeyDown={(event) => {
                        event.key === 'Enter' && send()
                    }} />
                <button onClick={send}>&#9658;</button>
            </div>
        </div>
    )
}