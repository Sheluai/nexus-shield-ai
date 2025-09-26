# SecureVPN - Modern VPN Mobile App

A modern, sleek VPN mobile app built with React, TypeScript, and Tailwind CSS. Inspired by popular VPN apps like TurboVPN and Proxiyum.

## 🚀 Features

### Core Functionality
- **Home Screen**: Connection status, animated shield, server info
- **Server List**: Search servers, ping indicators, fastest server recommendations
- **AI Agent**: Smart server recommendations and chat interface
- **Premium Plans**: Subscription management with payment integration ready

### Monetization Ready
- **AdMob Integration**: Banner, interstitial, and reward ads
- **Premium Subscriptions**: Stripe and Razorpay integration prepared
- **Free-to-Premium**: Reward ads for temporary premium access

### Modern UI/UX
- **Dark Gradient Design**: Professional VPN app aesthetic
- **Smooth Animations**: Pulsing shields, glow effects, page transitions
- **Responsive**: Mobile-first design with clean component structure
- **Design System**: Semantic tokens, consistent theming

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Components**: Radix UI (shadcn/ui)
- **Routing**: React Router DOM
- **State Management**: React hooks
- **Icons**: Lucide React

## 📱 App Structure

```
src/
├── components/
│   ├── ads/                 # AdMob integration components
│   │   ├── AdMobBanner.tsx
│   │   ├── AdMobInterstitial.tsx
│   │   └── AdMobReward.tsx
│   ├── ui/                  # Reusable UI components (shadcn)
│   ├── VPNShield.tsx        # Main connection button
│   ├── ServerCard.tsx       # Server list items
│   ├── ChatMessage.tsx      # AI chat bubbles
│   ├── PlanCard.tsx         # Premium subscription cards
│   ├── SearchEngine.tsx     # Server search with suggestions
│   └── BottomNavigation.tsx # Tab navigation
├── pages/
│   ├── Home.tsx            # Main VPN screen
│   ├── Servers.tsx         # Server selection
│   ├── Chat.tsx            # AI agent interface
│   └── Premium.tsx         # Subscription plans
├── hooks/
│   └── usePaymentIntegration.ts # Payment system hook
├── utils/
│   └── serverRecommendations.ts # AI recommendation logic
├── types/
│   └── index.ts            # TypeScript definitions
└── assets/
    └── vpn-hero.jpg        # Hero background image
```

## 🎨 Design System

### Colors
- **Primary**: Electric blue (#0EA5E9)
- **Secondary**: Neon green (#10B981)
- **Status Colors**: Connected (green), Disconnected (red), Connecting (yellow)
- **Gradients**: Dark blue to purple backgrounds

### Components
- **Cards**: Glassmorphism with subtle borders
- **Buttons**: Gradient backgrounds with hover effects
- **Animations**: Smooth transitions, pulsing effects, glow states

## 💰 Monetization Features

### AdMob Integration
```typescript
// Banner ads on free plan
<AdMobBanner size="banner" />

// Interstitial ads between actions
const { showAd } = useAdMobInterstitial();

// Reward ads for premium features
const { showRewardAd } = useAdMobReward({
  onUserEarnedReward: (reward) => {
    // Grant 24h premium access
  }
});
```

### Payment Integration
- **Ready for Stripe**: Product IDs and webhook endpoints prepared
- **Ready for Razorpay**: Plan IDs and payment flow implemented
- **Subscription Management**: Plan comparison, restore purchases
- **Free Trial**: Reward ads unlock temporary premium

## 🔧 Setup & Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📦 Production Deployment

### Enable AdMob
1. Replace test ad unit IDs in `/src/components/ads/`
2. Initialize AdMob SDK in your mobile app wrapper
3. Configure ad placement and frequency

### Enable Payments
1. **For Stripe**:
   ```typescript
   // Set your Stripe publishable key
   const paymentConfig = {
     provider: 'stripe',
     publicKey: 'pk_live_...',
     isEnabled: true
   };
   ```

2. **For Razorpay**:
   ```typescript
   // Set your Razorpay key ID
   const paymentConfig = {
     provider: 'razorpay',
     publicKey: 'rzp_live_...',
     isEnabled: true
   };
   ```

### Mobile App Integration
- Package as PWA or integrate with React Native/Capacitor
- Configure deep linking for VPN client integration
- Set up push notifications for connection status

## 🔐 VPN Integration (Future)

The app is structured to integrate with:
- **WireGuard**: Modern VPN protocol
- **OpenVPN**: Traditional VPN support
- **IKEv2**: Native mobile VPN
- **Outline Client**: Deep link integration ready

## 📄 License

This project is ready for commercial use. Configure your payment providers and ad networks to start monetizing.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open pull request

---

**Ready to deploy:** All components are production-ready with placeholder integrations for ads and payments. Simply configure your API keys and deploy!
