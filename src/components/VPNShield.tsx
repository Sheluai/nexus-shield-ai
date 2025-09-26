import { Shield, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VPNShieldProps {
  isConnected: boolean;
  isConnecting: boolean;
  onToggleConnection: () => void;
}

export function VPNShield({ isConnected, isConnecting, onToggleConnection }: VPNShieldProps) {
  const getShieldState = () => {
    if (isConnecting) return "connecting";
    if (isConnected) return "connected";
    return "disconnected";
  };

  const getShieldColor = () => {
    if (isConnecting) return "text-vpn-connecting";
    if (isConnected) return "text-vpn-connected";
    return "text-vpn-disconnected";
  };

  const getButtonText = () => {
    if (isConnecting) return "CONNECTING...";
    if (isConnected) return "DISCONNECT";
    return "CONNECT";
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Shield Icon */}
      <div className={cn("vpn-shield", getShieldState())}>
        <Shield 
          className={cn("w-32 h-32 transition-colors duration-500", getShieldColor())} 
          strokeWidth={1.5}
        />
      </div>

      {/* Connection Status */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          {isConnecting ? "Connecting..." : isConnected ? "Protected" : "Not Protected"}
        </h2>
        <p className="text-muted-foreground">
          {isConnected ? "Your connection is secure" : "Tap to connect to VPN"}
        </p>
      </div>

      {/* Connect Button */}
      <Button
        onClick={onToggleConnection}
        disabled={isConnecting}
        className={cn(
          "w-40 h-40 rounded-full text-lg font-bold transition-all duration-300",
          isConnected 
            ? "bg-vpn-connected hover:bg-vpn-connected/90 glow-success" 
            : "bg-vpn-disconnected hover:bg-vpn-disconnected/90 glow-primary",
          isConnecting && "animate-pulse"
        )}
      >
        <div className="flex flex-col items-center space-y-2">
          <Power className="w-8 h-8" />
          <span>{getButtonText()}</span>
        </div>
      </Button>
    </div>
  );
}