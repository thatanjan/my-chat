import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface MessageProps {
  content: string
  sender: string
  timestamp: string
  isSelf: boolean
}

export default function Message({ content, sender, timestamp, isSelf }: MessageProps) {
  return (
    <div className={cn("flex mb-4", isSelf ? "justify-end" : "justify-start")}>
      {!isSelf && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={sender} />
          <AvatarFallback>{sender.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-[70%]", isSelf ? "text-right" : "text-left")}>
        <div
          className={cn(
            "inline-block rounded-lg px-4 py-2",
            isSelf ? "bg-blue-600" : "bg-gray-700"
          )}
        >
          <p>{content}</p>
        </div>
        <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
      </div>
    </div>
  )
}

