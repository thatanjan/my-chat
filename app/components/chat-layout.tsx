'use client'

import { useState } from 'react'
import ChatList from './chat-list'
import ChatWindow from './chat-window'

export default function ChatLayout() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null)

  return (
    <>
      <ChatList onSelectChat={setSelectedChatId} />
      <ChatWindow selectedChatId={selectedChatId} />
    </>
  )
}
