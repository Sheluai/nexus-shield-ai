// VPN Related Types
export interface VPNServer {
  id: string;
  country: string;
  city: string;
  flag: string;
  ping: number;
  isOnline: boolean;
  isFastest?: boolean;
  load?: number; // Server load percentage
  isPremium?: boolean;
}

export interface ConnectionStatus {
  isConnected: boolean;
  isConnecting: boolean;
  server?: VPNServer;
  connectionTime?: Date;
  downloadSpeed?: number;
  uploadSpeed?: number;
}

// Chat Related Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

export interface ServerRecommendation {
  server: VPNServer;
  reason: string;
  confidence: number;
}

// User & Subscription Types
export interface UserPlan {
  type: 'free' | 'premium';
  expiresAt?: Date;
  features: string[];
  limitations: {
    dailyDataLimit?: number; // in MB
    serverCount: number;
    adsEnabled: boolean;
    supportLevel: 'basic' | 'priority';
  };
}

export interface User {
  id: string;
  email?: string;
  plan: UserPlan;
  preferences: {
    autoConnect: boolean;
    preferredProtocol: 'ikev2' | 'openvpn' | 'wireguard';
    notifications: boolean;
  };
}

// App State Types
export type PageType = 'home' | 'servers' | 'chat' | 'premium';

export interface AppState {
  currentPage: PageType;
  connectionStatus: ConnectionStatus;
  user: User;
  servers: VPNServer[];
  chatMessages: ChatMessage[];
}