import { useState } from "react";
import { VPNShield } from "@/components/VPNShield";
import { SearchEngine } from "@/components/SearchEngine";
import { Button } from "@/components/ui/button";
import { AdMobBanner } from "@/components/ads/AdMobBanner";
import { useAdMobInterstitial } from "@/components/ads/AdMobInterstitial";
import { MapPin, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const { toast } = useToast();
  
  const { loadAd, showAd } = useAdMobInterstitial({
    onAdClosed: () => {
      // Ad closed, user can continue
      console.log('Interstitial ad closed');
    }
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

  const handleServerSearch = (query: string) => {
    // Navigate to servers page with search query
    onPageChange("servers");
    toast({
      title: "Searching servers",
      description: `Looking for servers matching "${query}"`,
    });
  };

  const handleContentSearch = (service: string) => {
    const serviceMessages = {
      netflix: "Connecting to Netflix-optimized servers...",
      gaming: "Finding low-latency gaming servers...",
      youtube: "Selecting servers for video streaming...",
      browse: "Choosing best servers for browsing...",
    };

    toast({
      title: "Optimizing for " + service,
      description: serviceMessages[service as keyof typeof serviceMessages] || "Optimizing connection...",
    });
    
    // Auto-connect logic could be implemented here
    if (!isConnected && !isConnecting) {
      handleToggleConnection();
    }
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-primary p-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">SecureVPN</h1>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-vpn-connected' : 'bg-vpn-disconnected'}`}></div>
            <span className="text-sm">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        {/* Search Engine */}
        <div className="mb-8">
          <SearchEngine 
            onServerSearch={handleServerSearch}
            onContentSearch={handleContentSearch}
          />
        </div>

        {/* Main Shield Section */}
        <div className="flex justify-center mb-8">
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

        {/* AdMob Banner for Free Users */}
        {!isConnected && (
          <div className="mt-6">
            <AdMobBanner size="banner" className="mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}