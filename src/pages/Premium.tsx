import { PlanCard } from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Zap, Globe } from "lucide-react";

const plans = [
  {
    id: "monthly",
    title: "Monthly",
    price: "$9.99",
    period: "month",
    features: [
      "Unlimited bandwidth",
      "50+ server locations",
      "No ads",
      "24/7 support",
      "5 simultaneous connections"
    ]
  },
  {
    id: "quarterly",
    title: "3 Months",
    price: "$7.99",
    period: "month",
    discount: "20%",
    features: [
      "Unlimited bandwidth",
      "50+ server locations", 
      "No ads",
      "24/7 support",
      "5 simultaneous connections",
      "Priority support"
    ],
    isPopular: true
  },
  {
    id: "yearly",
    title: "Yearly",
    price: "$4.99",
    period: "month",
    discount: "50%",
    features: [
      "Unlimited bandwidth",
      "100+ server locations",
      "No ads",
      "24/7 priority support",
      "10 simultaneous connections",
      "Advanced security features",
      "Dedicated IP option"
    ]
  }
];

const freeFeatures = [
  "Limited to 500MB/day",
  "10 server locations",
  "Ad-supported",
  "Basic support",
  "1 connection"
];

const premiumBenefits = [
  { icon: Shield, title: "Enhanced Security", description: "Military-grade encryption" },
  { icon: Zap, title: "Lightning Fast", description: "Optimized for speed" },
  { icon: Globe, title: "Global Access", description: "100+ locations worldwide" },
  { icon: Crown, title: "Premium Support", description: "24/7 priority assistance" },
];

export function Premium() {
  const handlePlanSelect = (planId: string) => {
    console.log("Selected plan:", planId);
    // Here you would integrate with Stripe or payment provider
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-primary p-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Crown className="w-12 h-12 text-vpn-electric-blue mx-auto mb-4 glow-accent" />
          <h1 className="text-2xl font-bold mb-2">Unlock Premium</h1>
          <p className="text-muted-foreground">Experience the full power of SecureVPN</p>
        </div>

        {/* Current Plan Status */}
        <div className="card-vpn p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Current Plan: Free</h3>
              <p className="text-sm text-muted-foreground">Limited features</p>
            </div>
            <Badge variant="outline" className="border-vpn-disconnected text-vpn-disconnected">
              FREE
            </Badge>
          </div>
        </div>

        {/* Free vs Premium Comparison */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card-vpn p-4">
            <h4 className="font-semibold mb-3 text-center">Free Plan</h4>
            <ul className="space-y-2">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start">
                  <span className="text-vpn-disconnected mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-vpn p-4 ring-2 ring-vpn-electric-blue glow-accent">
            <h4 className="font-semibold mb-3 text-center text-vpn-electric-blue">Premium</h4>
            <ul className="space-y-2">
              {plans[1].features.slice(0, 5).map((feature, index) => (
                <li key={index} className="text-xs flex items-start">
                  <span className="text-vpn-neon-green mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Premium Benefits */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold text-center">Premium Benefits</h3>
          <div className="grid grid-cols-2 gap-4">
            {premiumBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="card-vpn p-4 text-center">
                  <Icon className="w-8 h-8 text-vpn-electric-blue mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">{benefit.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-bold text-center">Choose Your Plan</h3>
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              discount={plan.discount}
              features={plan.features}
              isPopular={plan.isPopular}
              onClick={() => handlePlanSelect(plan.id)}
            />
          ))}
        </div>

        {/* Restore Purchase */}
        <Button
          variant="ghost"
          className="w-full text-muted-foreground hover:text-foreground"
        >
          Restore Purchase
        </Button>
      </div>
    </div>
  );
}