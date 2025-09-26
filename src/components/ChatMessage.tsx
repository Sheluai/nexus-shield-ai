import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={cn(
      "chat-message flex w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] px-4 py-3 rounded-2xl",
        isUser 
          ? "bg-vpn-electric-blue text-white rounded-br-md" 
          : "card-vpn rounded-bl-md"
      )}>
        <p className="text-sm">{message}</p>
        <p className="text-xs opacity-70 mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

interface TypingIndicatorProps {
  isVisible: boolean;
}

export function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <div className="chat-message flex justify-start">
      <div className="card-vpn px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dots"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dots" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dots" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}