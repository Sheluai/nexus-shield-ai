import { Home, Server, MessageCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "servers", icon: Server, label: "Servers" },
  { id: "chat", icon: MessageCircle, label: "AI Agent" },
  { id: "premium", icon: Crown, label: "Premium" },
];

export function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 card-vpn border-t border-border/50 rounded-t-3xl p-4 bg-card/95 backdrop-blur-lg">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onPageChange(item.id)}
              className={cn(
                "flex flex-col items-center space-y-1 p-2 h-auto transition-all duration-300",
                isActive && "text-vpn-electric-blue"
              )}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isActive && "glow-accent scale-110"
                )} 
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}