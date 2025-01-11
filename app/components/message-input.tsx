import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'

export default function MessageInput() {
  return (
    <div className="p-4 border-t border-gray-700 flex items-center">
      <Input
        placeholder="Type a message..."
        className="flex-grow mr-2 bg-gray-800 border-gray-700 text-white"
      />
      <Button size="icon">
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  )
}

