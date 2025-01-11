'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const chats = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    avatar: '/placeholder.svg?height=40&width=40',
    unread: 2,
  },
  {
    id: 2,
    name: 'Jane Smith',
    lastMessage: 'See you tomorrow!',
    avatar: '/placeholder.svg?height=40&width=40',
    unread: 0,
  },
  {
    id: 3,
    name: 'Work Group',
    lastMessage: 'Alice: Meeting at 3 PM',
    avatar: '/placeholder.svg?height=40&width=40',
    unread: 5,
    isGroup: true,
  },
  {
    id: 4,
    name: 'Alice Johnson',
    lastMessage: 'Can you help me with this?',
    avatar: '/placeholder.svg?height=40&width=40',
    unread: 1,
  },
  {
    id: 5,
    name: 'Bob Williams',
    lastMessage: 'Thanks for your help!',
    avatar: '/placeholder.svg?height=40&width=40',
    unread: 0,
  },
]

interface ChatListProps {
  onSelectChat: (chatId: number | null) => void
}

export default function ChatList({ onSelectChat }: ChatListProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div
      className={`border-r border-gray-700 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-20'}`}
    >
      <div className='p-4 border-b border-gray-700 flex items-center justify-between'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className='h-6 w-6' />
        </Button>
        {isSidebarOpen && (
          <Input
            placeholder='Search chats...'
            className='bg-gray-800 border-gray-700 text-white ml-2'
          />
        )}
      </div>
      <ScrollArea className='flex-grow'>
        {isSidebarOpen ? (
          chats.map(chat => (
            <div
              key={chat.id}
              className='flex items-center p-4 hover:bg-gray-800 cursor-pointer'
              onClick={() => onSelectChat(chat.id)}
            >
              <Avatar className='h-10 w-10 mr-4'>
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>
                  {chat.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='flex-grow'>
                <div className='flex justify-between items-center'>
                  <h3 className='font-semibold'>{chat.name}</h3>
                  {chat.unread > 0 && (
                    <span className='bg-blue-600 text-white text-xs rounded-full px-2 py-1'>
                      {chat.unread}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    'text-sm truncate',
                    chat.unread > 0 ? 'font-bold text-white' : 'text-gray-400',
                  )}
                >
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center space-y-4 py-4'>
            {chats.map(chat => (
              <div
                key={chat.id}
                className='relative'
                onClick={() => onSelectChat(chat.id)}
              >
                <Avatar className='h-12 w-12 cursor-pointer'>
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>
                    {chat.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {chat.unread > 0 && (
                  <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
