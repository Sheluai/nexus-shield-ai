import { useState } from "react";
import { ServerCard } from "@/components/ServerCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Zap } from "lucide-react";

const servers = [
  { id: 1, country: "United States", city: "New York", flag: "🇺🇸", ping: 28 },
  { id: 2, country: "United Kingdom", city: "London", flag: "🇬🇧", ping: 45 },
  { id: 3, country: "Germany", city: "Frankfurt", flag: "🇩🇪", ping: 32 },
  { id: 4, country: "Japan", city: "Tokyo", flag: "🇯🇵", ping: 156 },
  { id: 5, country: "Australia", city: "Sydney", flag: "🇦🇺", ping: 203 },
  { id: 6, country: "Canada", city: "Toronto", flag: "🇨🇦", ping: 38 },
  { id: 7, country: "Netherlands", city: "Amsterdam", flag: "🇳🇱", ping: 41 },
  { id: 8, country: "Singapore", city: "Singapore", flag: "🇸🇬", ping: 178 },
  { id: 9, country: "France", city: "Paris", flag: "🇫🇷", ping: 52 },
  { id: 10, country: "Sweden", city: "Stockholm", flag: "🇸🇪", ping: 49 },
];

export function Servers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [connectedServer, setConnectedServer] = useState(1);

  const filteredServers = servers.filter(server =>
    server.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fastestServer = servers.reduce((fastest, current) =>
    current.ping < fastest.ping ? current : fastest
  );

  const handleSelectBestServer = () => {
    setConnectedServer(fastestServer.id);
  };

  const handleServerSelect = (serverId: number) => {
    setConnectedServer(serverId);
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-primary p-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Choose Server</h1>
          <p className="text-muted-foreground">Select your preferred server location</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search countries or cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Best Server Button */}
        <Button
          onClick={handleSelectBestServer}
          className="w-full mb-6 bg-gradient-success hover:glow-success transition-all duration-300"
        >
          <Zap className="w-4 h-4 mr-2" />
          Best Server ({fastestServer.ping}ms)
        </Button>

        {/* Server List */}
        <div className="space-y-3">
          {filteredServers.map((server) => (
            <ServerCard
              key={server.id}
              country={server.country}
              city={server.city}
              flag={server.flag}
              ping={server.ping}
              isConnected={connectedServer === server.id}
              isFastest={server.id === fastestServer.id}
              onClick={() => handleServerSelect(server.id)}
            />
          ))}
        </div>

        {filteredServers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No servers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}