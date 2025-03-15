import ScrollToBottom from "react-scroll-to-bottom"

const ChatBox = ({ messageList, senderId }) => {
    function formatMessageTime(date) {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }
    return (
        <ScrollToBottom className="border border-black rounded-xl py-3 overflow-y-auto h-[600px]">
            {
                messageList.map((message, index) => {
                    return (
                        <div key={index} className={`w-full flex flex-col px-3 gap-1 ${message.senderId === senderId ? 'items-end' : 'items-start'} text-sm my-8 `}>
                            <span className="">{formatMessageTime(message.createdAt)}</span>
                            <div className={`flex items-start ${message.senderId === senderId ? 'flex-row-reverse' : ''} gap-2 w-full`}>
                                <div className="w-fit rounded-full bg-blue-500 px-2 py-1">DP</div>
                                <div className={`px-2 py-1 rounded-sm ${message.senderId === senderId ? 'text-end bg-green-800' : 'text-start bg-slate-800'} text-white max-w-[400px] break-words`}>
                                    {message.image && (
                                        <img
                                            src={message.image}
                                            alt="Attachment"
                                            className="rounded-md mb-2 w-[400px]"
                                        />
                                    )}
                                    {message.text && <p className="text-xl">{message.text}</p>}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </ScrollToBottom>
    )
}

export default ChatBox