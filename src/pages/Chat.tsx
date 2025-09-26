import { useState, useEffect, useRef } from "react";
import { ChatMessage, TypingIndicator } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Zap, Tv, Wifi } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const quickReplies = [
  { text: "Fastest Server", icon: Zap },
  { text: "Netflix Streaming", icon: Tv },
  { text: "Low Ping Gaming", icon: Wifi },
];

const aiResponses = {
  "fastest server": "I recommend USA - New York (28ms) for the fastest connection speed.",
  "netflix streaming": "For Netflix streaming, try USA - California or UK - London. Both work great with Netflix!",
  "low ping gaming": "For gaming, USA - New York (28ms) or Germany - Frankfurt (32ms) offer the best ping times.",
  "netflix": "For Netflix streaming, try USA - California or UK - London. Both work great with Netflix!",
  "gaming": "For gaming, USA - New York (28ms) or Germany - Frankfurt (32ms) offer the best ping times.",
  "speed": "I recommend USA - New York (28ms) for the fastest connection speed.",
  "default": "I can help you choose the best server for your needs. Try asking about Netflix, gaming, or the fastest server!"
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your VPN assistant. I can help you choose the perfect server for your needs. What would you like to use the VPN for?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(aiResponses)) {
      if (key !== "default" && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return aiResponses.default;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-primary flex flex-col pb-24">
      <div className="max-w-md mx-auto w-full flex flex-col h-screen">
        {/* Header */}
        <div className="text-center p-6 border-b border-border/20">
          <h1 className="text-2xl font-bold mb-2">VPN Assistant</h1>
          <p className="text-muted-foreground">Ask me about the best servers for your needs</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          <TypingIndicator isVisible={isTyping} />
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Buttons */}
        <div className="p-4 border-t border-border/20">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickReplies.map((reply) => {
              const Icon = reply.icon;
              return (
                <Button
                  key={reply.text}
                  onClick={() => handleQuickReply(reply.text)}
                  variant="outline"
                  size="sm"
                  className="border-border hover:glow-primary transition-all duration-300"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {reply.text}
                </Button>
              );
            })}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about servers, Netflix, gaming..."
              className="bg-card border-border"
              disabled={isTyping}
            />
            <Button 
              type="submit" 
              disabled={isTyping || !inputValue.trim()}
              className="bg-vpn-electric-blue hover:bg-vpn-electric-blue/90 hover:glow-accent transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}