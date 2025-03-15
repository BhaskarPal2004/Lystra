import React, { useEffect, useRef, useState } from 'react'
import ChatBox from '../components/ChatBox'
import { io } from 'socket.io-client'
import axios from 'axios'


const ChatPage = () => {
    const [messageList, setMessageList] = useState([])
    const [socket, setSocket] = useState(null)
    const [currentMessage, setCurrentMessage] = useState("");
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState()


    const accessToken = localStorage.getItem("accessToken")
    const receiverId = localStorage.getItem('receiverId')
    const senderId = localStorage.getItem('senderId')

    useEffect(() => {
        const newSocket = io("http://localhost:3000", {
            query: {
                userId: senderId,
            },
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };

    }, [])

    const getMessages = async (receiverId) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/chat/get/messages/${receiverId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if (res?.data.success) {
                setMessageList(res.data.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const subscribeToMessages = () => {
        socket?.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === receiverId;
            if (!isMessageSentFromSelectedUser) return;


            setMessageList([...messageList, newMessage])
        });
    }

    const unsubscribeFromMessages = () => {
        socket?.off("newMessage");
    }


    useEffect(() => {
        getMessages(receiverId)

        subscribeToMessages()

        return () => {
            unsubscribeFromMessages()
        };

    }, [receiverId, getMessages, subscribeToMessages, unsubscribeFromMessages])

    const handleSendMessage = async (e) => {
        try {
            e.preventDefault();
            if (!currentMessage.trim() && !imagePreview) return
            else {
                const newMessage = {
                    senderId: senderId,
                    receiverId: receiverId,
                    text: currentMessage,
                    image: image
                }

                const res = await axios.post(`http://localhost:3000/api/chat/send/message/${receiverId}`, newMessage, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": 'multipart/form-data'
                    }
                })

                if (res.data.success) {
                    setMessageList((prevMessage) => [...prevMessage, res?.data.data]);
                    console.log(res.data.message)
                }
                setCurrentMessage('')
                setImagePreview(null);
                setImage(null)
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file)
        if (!file.type.startsWith("image/")) {
            console.error("Please select an image file");
            return;
        }

        console.log(file)
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className='w-[80%] mx-auto py-3 bg-slate-400'>
            <h1 className='my-5 text-2xl text-center'>Chat page</h1>

            <ChatBox messageList={messageList} senderId={senderId} />

            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-50 h-50 object-cover rounded-lg"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute text-5xl -top-[25px] -right-1.5 cursor-pointer"
                            type="button"
                        >
                            x
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="w-full flex gap-2 my-5">
                <div className='flex gap-2 w-3/4'>
                    <input
                        type="text"
                        placeholder="Enter message"
                        value={currentMessage}
                        className="mx-auto py-2 px-3 w-[90%] rounded-xl outline-1 outline-black"
                        onChange={(e) => { setCurrentMessage(e.target.value) }}
                        onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <input
                        type='file'
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type='button'
                        className='hidden sm:flex btn btn-circle text-black font-bold text-2xl cursor-pointer'
                        onClick={() => fileInputRef.current?.click()}
                    >
                        IMG
                    </button>

                </div>
                <button type='submit' className="bg-green-600 hover:bg-green-500 w-fit px-3 py-2 rounded-xl text-center mx-auto">
                    Send
                </button>
            </form>
        </div>
    )
}

export default ChatPage