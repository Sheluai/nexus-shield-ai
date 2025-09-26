import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServerCardProps {
  country: string;
  city: string;
  flag: string;
  ping: number;
  isConnected?: boolean;
  isFastest?: boolean;
  onClick: () => void;
}

export function ServerCard({ 
  country, 
  city, 
  flag, 
  ping, 
  isConnected = false, 
  isFastest = false,
  onClick 
}: ServerCardProps) {
  const getPingColor = () => {
    if (ping < 50) return "text-vpn-neon-green";
    if (ping < 100) return "text-yellow-400";
    return "text-vpn-disconnected";
  };

  const getPingLabel = () => {
    if (ping < 50) return "Excellent";
    if (ping < 100) return "Good";
    return "Fair";
  };

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "card-vpn w-full p-4 h-auto justify-between hover:glow-primary transition-all duration-300",
        isConnected && "ring-2 ring-vpn-connected glow-success",
        isFastest && !isConnected && "ring-2 ring-vpn-electric-blue"
      )}
    >
      <div className="flex items-center space-x-4">
        <div className="text-2xl">{flag}</div>
        <div className="text-left">
          <div className="font-semibold">{country}</div>
          <div className="text-sm text-muted-foreground">{city}</div>
        </div>
      </div>

      <div className="flex flex-col items-end space-y-1">
        <div className={cn("font-mono font-bold", getPingColor())}>
          {ping}ms
        </div>
        <div className="text-xs text-muted-foreground">
          {getPingLabel()}
        </div>
        {isFastest && !isConnected && (
          <div className="text-xs text-vpn-electric-blue font-bold">
            FASTEST
          </div>
        )}
        {isConnected && (
          <div className="text-xs text-vpn-connected font-bold">
            CONNECTED
          </div>
        )}
      </div>
    </Button>
  );
}