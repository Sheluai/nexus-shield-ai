import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Tv, Gamepad2, Youtube, Globe } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  query: z.string().trim().max(100, { message: "Search query too long" })
});

interface SearchEngineProps {
  onServerSearch: (query: string) => void;
  onContentSearch: (service: string) => void;
}

const quickSearchItems = [
  { label: "Netflix", icon: Tv, color: "text-red-500", service: "netflix" },
  { label: "Gaming", icon: Gamepad2, color: "text-green-500", service: "gaming" },
  { label: "YouTube", icon: Youtube, color: "text-red-600", service: "youtube" },
  { label: "Browse", icon: Globe, color: "text-vpn-electric-blue", service: "browse" },
];

export function SearchEngine({ onServerSearch, onContentSearch }: SearchEngineProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = searchSchema.parse({ query: searchQuery });
      setError("");
      
      if (validatedData.query) {
        onServerSearch(validatedData.query);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0]?.message || "Invalid search query");
      }
    }
  };

  const handleQuickSearch = (service: string) => {
    onContentSearch(service);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search servers by country or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card/80 border-border backdrop-blur-sm hover:glow-primary transition-all duration-300"
          maxLength={100}
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-vpn-electric-blue hover:bg-vpn-electric-blue/90 hover:glow-accent transition-all duration-300"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>

      {error && (
        <p className="text-vpn-disconnected text-sm">{error}</p>
      )}

      {/* Quick Access Buttons */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground text-center">Quick Access</p>
        <div className="grid grid-cols-2 gap-3">
          {quickSearchItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.service}
                onClick={() => handleQuickSearch(item.service)}
                variant="outline"
                className="card-vpn border-border/50 hover:glow-primary transition-all duration-300 p-3 h-auto"
              >
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Search Suggestions */}
      <div className="card-vpn p-3">
        <p className="text-xs text-muted-foreground mb-2">Popular searches:</p>
        <div className="flex flex-wrap gap-2">
          {["USA", "UK", "Japan", "Germany", "Fastest"].map((suggestion) => (
            <Button
              key={suggestion}
              onClick={() => {
                setSearchQuery(suggestion);
                onServerSearch(suggestion);
              }}
              variant="ghost"
              size="sm"
              className="text-xs px-2 py-1 h-auto hover:bg-accent/20 hover:text-vpn-electric-blue transition-all duration-300"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}