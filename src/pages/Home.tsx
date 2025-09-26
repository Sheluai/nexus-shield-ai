import { useState } from "react";
import { VPNShield } from "@/components/VPNShield";
import { Button } from "@/components/ui/button";
import { MapPin, Zap } from "lucide-react";

interface HomeProps {
  onPageChange: (page: string) => void;
}

export function Home({ onPageChange }: HomeProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentServer] = useState({
    country: "United States",
    city: "New York",
    flag: "🇺🇸",
    ping: 28
  });

  const handleToggleConnection = async () => {
    if (isConnected) {
      setIsConnected(false);
      return;
    }

    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-primary p-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">SecureVPN</h1>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-vpn-connected' : 'bg-vpn-disconnected'}`}></div>
            <span className="text-sm">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        {/* Main Shield Section */}
        <div className="flex justify-center mb-12">
          <VPNShield 
            isConnected={isConnected}
            isConnecting={isConnecting}
            onToggleConnection={handleToggleConnection}
          />
        </div>

        {/* Current Server Info */}
        <div className="card-vpn p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{currentServer.flag}</div>
              <div>
                <div className="font-semibold">{currentServer.country}</div>
                <div className="text-sm text-muted-foreground">{currentServer.city}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-vpn-neon-green">
                <Zap className="w-4 h-4" />
                <span className="font-mono font-bold">{currentServer.ping}ms</span>
              </div>
              <div className="text-xs text-muted-foreground">Excellent</div>
            </div>
          </div>
        </div>

        {/* Change Server Button */}
        <Button
          onClick={() => onPageChange("servers")}
          variant="outline"
          className="w-full h-12 border-border hover:bg-accent/10 hover:glow-primary transition-all duration-300"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Change Server
        </Button>

        {/* Statistics (when connected) */}
        {isConnected && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="card-vpn p-3 text-center">
              <div className="text-sm text-muted-foreground">Download</div>
              <div className="text-lg font-bold text-vpn-neon-green">45.2 MB/s</div>
            </div>
            <div className="card-vpn p-3 text-center">
              <div className="text-sm text-muted-foreground">Upload</div>
              <div className="text-lg font-bold text-vpn-neon-green">12.8 MB/s</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}