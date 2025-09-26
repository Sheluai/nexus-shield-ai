import { useEffect, useState } from 'react';

interface AdMobBannerProps {
  adUnitId?: string;
  size?: 'banner' | 'large-banner' | 'medium-rectangle';
  className?: string;
}

export function AdMobBanner({ 
  adUnitId = 'ca-app-pub-3940256099942544/6300978111', // Test ID
  size = 'banner',
  className = ''
}: AdMobBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // AdMob initialization would go here
    // For now, simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sizeClasses = {
    'banner': 'h-[50px] w-[320px]',
    'large-banner': 'h-[100px] w-[320px]',
    'medium-rectangle': 'h-[250px] w-[300px]'
  };

  return (
    <div className={`mx-auto ${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full bg-muted/20 border border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
        {isLoaded ? (
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">AdMob Banner</div>
            <div className="text-xs text-muted-foreground">{size}</div>
          </div>
        ) : (
          <div className="animate-pulse">
            <div className="text-xs text-muted-foreground">Loading ad...</div>
          </div>
        )}
      </div>
    </div>
  );
}