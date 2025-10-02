import React, { useState } from "react";
import './ChatBotOverlay.scss'
import AnswerQuery from "../../api/answerQuery";

interface Message {
    text: string;
    sender: 'user' | 'bot';
    id: string;
}

const ChatBotOverlay: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [messages, setMessages] = useState<Message[]>([])

    async function handleSendMessage() {
        const newMessage: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' }
        const autoMessage: Message = { id: (Date.now() + 1).toString(), text: 'thinking...', sender: 'bot'}
        setMessages([...messages, newMessage, autoMessage])
        
        const query = {query: inputValue}
        setInputValue('')

        const res = await AnswerQuery(query)
        
        const aiMessage: Message = { id: (Date.now() + 1).toString(), text: res.data.payload, sender: 'bot' }
        setMessages([...messages, newMessage, aiMessage])
    }

    return(
        <div>
            <button className='bot-toggle' onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close Chat' : 'Open Chat'}
            </button>

            {isOpen ? (
                <div className='bot-overlay'>
                    <div className='chat-messages'>
                        {messages.map((message) => (
                            <div key={message.id} className={`message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className='input-area'>
                        <input 
                        type='text'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder='type your message...'
                        />
                        <button onClick={handleSendMessage}> Send </button>
                    </div>
                </div>
            ): null}
        </div>
    )
}

export default ChatBotOverlay;