import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatItemProps {
  id: number
  name: string
  lastMessage: string
  avatar: string
  unread: number
  isGroup?: boolean
  isSelected?: boolean
  onClick?: () => void
}

export default function ChatItem({ id, name, lastMessage, avatar, unread, isGroup, isSelected, onClick }: ChatItemProps) {
  return (
    <div 
      className={cn(
        "flex items-center p-4 hover:bg-gray-800 cursor-pointer",
        isSelected && "bg-gray-800"
      )}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10 mr-4">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          {unread > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
              {unread}
            </span>
          )}
        </div>
        <p className={cn(
          "text-sm text-gray-400 truncate",
          unread > 0 && "font-bold text-white"
        )}>
          {isGroup && lastMessage.includes(":") ? (
            <>
              <span className="font-medium">{lastMessage.split(":")[0]}:</span>
              {lastMessage.split(":")[1]}
            </>
          ) : (
            lastMessage
          )}
        </p>
      </div>
    </div>
  )
}

