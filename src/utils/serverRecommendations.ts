import { VPNServer, ServerRecommendation } from '@/types';

export function getServerRecommendations(
  servers: VPNServer[],
  query: string
): ServerRecommendation[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Service-specific recommendations
  const serviceRecommendations: Record<string, (servers: VPNServer[]) => ServerRecommendation[]> = {
    netflix: (servers) => getStreamingServers(servers, 'Netflix'),
    streaming: (servers) => getStreamingServers(servers, 'Streaming'),
    gaming: (servers) => getGamingServers(servers),
    torrenting: (servers) => getTorrentingServers(servers),
    'low ping': (servers) => getLowPingServers(servers),
    fastest: (servers) => getFastestServers(servers),
    usa: (servers) => getCountryServers(servers, 'United States'),
    uk: (servers) => getCountryServers(servers, 'United Kingdom'),
    japan: (servers) => getCountryServers(servers, 'Japan'),
  };

  // Check for service-specific queries
  for (const [service, getRecommendations] of Object.entries(serviceRecommendations)) {
    if (normalizedQuery.includes(service)) {
      return getRecommendations(servers);
    }
  }

  // Default to country/city search
  return getLocationBasedServers(servers, normalizedQuery);
}

function getStreamingServers(servers: VPNServer[], service: string): ServerRecommendation[] {
  const streamingCountries = ['United States', 'United Kingdom', 'Canada', 'Netherlands'];
  
  return servers
    .filter(server => 
      streamingCountries.includes(server.country) && 
      server.isOnline && 
      server.ping < 100
    )
    .sort((a, b) => a.ping - b.ping)
    .slice(0, 3)
    .map(server => ({
      server,
      reason: `Optimized for ${service} with low latency (${server.ping}ms)`,
      confidence: Math.max(0.8 - (server.ping / 1000), 0.5)
    }));
}

function getGamingServers(servers: VPNServer[]): ServerRecommendation[] {
  return servers
    .filter(server => server.isOnline && server.ping < 50)
    .sort((a, b) => a.ping - b.ping)
    .slice(0, 3)
    .map(server => ({
      server,
      reason: `Ultra-low latency for gaming (${server.ping}ms)`,
      confidence: Math.max(1 - (server.ping / 50), 0.7)
    }));
}

function getTorrentingServers(servers: VPNServer[]): ServerRecommendation[] {
  const torrentFriendlyCountries = ['Netherlands', 'Switzerland', 'Romania'];
  
  return servers
    .filter(server => 
      torrentFriendlyCountries.includes(server.country) && 
      server.isOnline &&
      (server.load || 0) < 70
    )
    .sort((a, b) => (a.load || 0) - (b.load || 0))
    .slice(0, 3)
    .map(server => ({
      server,
      reason: `P2P-friendly location with good performance`,
      confidence: 0.85
    }));
}

function getLowPingServers(servers: VPNServer[]): ServerRecommendation[] {
  return servers
    .filter(server => server.isOnline)
    .sort((a, b) => a.ping - b.ping)
    .slice(0, 5)
    .map(server => ({
      server,
      reason: `Low latency connection (${server.ping}ms)`,
      confidence: Math.max(1 - (server.ping / 200), 0.6)
    }));
}

function getFastestServers(servers: VPNServer[]): ServerRecommendation[] {
  return servers
    .filter(server => server.isOnline && (server.load || 0) < 50)
    .sort((a, b) => {
      const scoreA = a.ping + (a.load || 0) * 2;
      const scoreB = b.ping + (b.load || 0) * 2;
      return scoreA - scoreB;
    })
    .slice(0, 3)
    .map(server => ({
      server,
      reason: `Best overall performance (${server.ping}ms, ${server.load || 0}% load)`,
      confidence: 0.9
    }));
}

function getCountryServers(servers: VPNServer[], country: string): ServerRecommendation[] {
  return servers
    .filter(server => 
      server.country.toLowerCase().includes(country.toLowerCase()) && 
      server.isOnline
    )
    .sort((a, b) => a.ping - b.ping)
    .slice(0, 5)
    .map(server => ({
      server,
      reason: `${server.country} server with ${server.ping}ms latency`,
      confidence: 0.8
    }));
}

function getLocationBasedServers(servers: VPNServer[], query: string): ServerRecommendation[] {
  return servers
    .filter(server => 
      server.country.toLowerCase().includes(query) || 
      server.city.toLowerCase().includes(query)
    )
    .filter(server => server.isOnline)
    .sort((a, b) => a.ping - b.ping)
    .slice(0, 3)
    .map(server => ({
      server,
      reason: `Located in ${server.city}, ${server.country}`,
      confidence: 0.75
    }));
}