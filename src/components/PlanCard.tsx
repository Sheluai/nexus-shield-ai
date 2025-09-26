import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  title: string;
  price: string;
  period: string;
  discount?: string;
  features: string[];
  isPopular?: boolean;
  onClick: () => void;
}

export function PlanCard({ 
  title, 
  price, 
  period, 
  discount, 
  features, 
  isPopular = false,
  onClick 
}: PlanCardProps) {
  return (
    <div className={cn(
      "card-vpn p-6 relative transition-all duration-300 hover:shadow-elevated",
      isPopular && "ring-2 ring-vpn-electric-blue glow-accent"
    )}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-accent border-0 text-white font-bold">
          MOST POPULAR
        </Badge>
      )}

      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold">{title}</h3>
        
        <div className="space-y-2">
          <div className="flex items-baseline justify-center space-x-1">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-muted-foreground">/{period}</span>
          </div>
          {discount && (
            <div className="text-vpn-neon-green text-sm font-semibold">
              Save {discount}
            </div>
          )}
        </div>

        <div className="space-y-3 py-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Check className="w-4 h-4 text-vpn-neon-green flex-shrink-0" />
              <span className="text-sm text-left">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={onClick}
          className={cn(
            "w-full font-bold transition-all duration-300",
            isPopular 
              ? "bg-gradient-accent hover:glow-accent" 
              : "bg-gradient-secondary hover:glow-primary"
          )}
        >
          Choose Plan
        </Button>
      </div>
    </div>
  );
}