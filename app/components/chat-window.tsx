import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MessageInput from "./message-input"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'

interface ChatWindowProps {
  selectedChatId: number | null
}

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const chats = [
  { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", avatar: "/placeholder.svg?height=40&width=40", unread: 2 },
  { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow!", avatar: "/placeholder.svg?height=40&width=40", unread: 0 },
  { id: 3, name: "Work Group", lastMessage: "Alice: Meeting at 3 PM", avatar: "/placeholder.svg?height=40&width=40", unread: 5, isGroup: true },
  { id: 4, name: "Alice Johnson", lastMessage: "Can you help me with this?", avatar: "/placeholder.svg?height=40&width=40", unread: 1 },
  { id: 5, name: "Bob Williams", lastMessage: "Thanks for your help!", avatar: "/placeholder.svg?height=40&width=40", unread: 0 },
]

const messages = [
  { id: 1, content: "Hey, how are you?", sender: "John Doe", timestamp: "10:30 AM", isSelf: false, chatId: 1 },
  { id: 2, content: "I'm good, thanks! How about you?", sender: "You", timestamp: "10:31 AM", isSelf: true, chatId: 1 },
  { id: 3, content: "I'm doing well too. Did you finish the project?", sender: "John Doe", timestamp: "10:32 AM", isSelf: false, chatId: 1 },
  { id: 4, content: "Yes, I just submitted it. Can you review it when you have a chance?", sender: "You", timestamp: "10:33 AM", isSelf: true, chatId: 1 },
  { id: 5, content: "Sure, I'll take a look at it this afternoon.", sender: "John Doe", timestamp: "10:34 AM", isSelf: false, chatId: 1 },
  { id: 6, content: "Hi team, don't forget about the meeting at 3 PM.", sender: "Alice", timestamp: "09:45 AM", isSelf: false, chatId: 3 },
  { id: 7, content: "Thanks for the reminder, Alice!", sender: "You", timestamp: "09:46 AM", isSelf: true, chatId: 3 },
  { id: 8, content: "See you tomorrow!", sender: "Jane Smith", timestamp: "18:20 PM", isSelf: false, chatId: 2 },
  { id: 9, content: "Can you help me with this?", sender: "Alice Johnson", timestamp: "14:15 PM", isSelf: false, chatId: 4 },
  { id: 10, content: "Thanks for your help!", sender: "Bob Williams", timestamp: "11:50 AM", isSelf: false, chatId: 5 },
]

function simulateSendMessage(chatId: number, content: string) {
  return {
    id: Date.now(), // Use timestamp as a unique ID
    content,
    sender: "You",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isSelf: true,
    chatId,
  };
}

export default function ChatWindow({ selectedChatId }: ChatWindowProps) {
  const [chatMessages, setChatMessages] = useState(messages);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const sendMessage = (content: string) => {
    if (selectedChatId) {
      const newMessage = simulateSendMessage(selectedChatId, content);
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  if (selectedChatId) {
    const filteredMessages = chatMessages.filter(message => message.chatId === selectedChatId);
    const selectedChat = chats.find(chat => chat.id === selectedChatId);

    return (
      <div className="flex-grow flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">{selectedChat?.name}</h2>
        </div>
        <ScrollArea className="flex-grow p-4 scroll-area" ref={scrollAreaRef}>
          {filteredMessages.map((message) => (
            <div key={message.id} className={cn("flex items-start mb-4", message.isSelf ? "justify-end" : "justify-start")}>
              {!message.isSelf && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={message.sender} />
                  <AvatarFallback>{message.sender.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div className={cn("inline-block rounded-lg px-4 py-2", message.isSelf ? "bg-blue-600" : "bg-gray-700")}>
                  <p>{message.content}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
        <MessageInput onSendMessage={sendMessage} />
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">All Conversations</h2>
      </div>
      <ScrollArea className="flex-grow p-4">
        {chats.map((chat) => (
          <div key={chat.id} className="flex items-center p-4 hover:bg-gray-800 cursor-pointer">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback>{chat.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{chat.name}</h3>
                <span className="text-sm text-gray-400">{messages.find(m => m.chatId === chat.id)?.timestamp}</span>
              </div>
              <p className={cn(
                "text-sm truncate",
                chat.unread > 0 ? "font-bold text-white" : "text-gray-400"
              )}>
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                {chat.unread}
              </span>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 flex items-center">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow mr-2 bg-gray-800 border-gray-700 text-white"
      />
      <Button type="submit" size="icon">
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}

