import { useEffect, useState } from 'react';

interface MarketingStudioScreenProps {
  onComplete: () => void;
  isTransitioning: boolean;
}

export default function MarketingStudioScreen({ onComplete, isTransitioning }: MarketingStudioScreenProps) {
  const [animationPhase, setAnimationPhase] = useState<'monitor' | 'sunRising' | 'bright' | 'text'>('monitor');

  useEffect(() => {
    // Animation timeline
    const monitorTimer = setTimeout(() => {
      setAnimationPhase('sunRising');
    }, 1000);

    const sunRisingTimer = setTimeout(() => {
      setAnimationPhase('bright');
    }, 2500);

    const brightTimer = setTimeout(() => {
      setAnimationPhase('text');
    }, 3500);

    // Auto-advance after complete animation (slower transition)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 10000);

    return () => {
      clearTimeout(monitorTimer);
      clearTimeout(sunRisingTimer);
      clearTimeout(brightTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`screen-container studio-logo-screen ${animationPhase} ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <div className="content-center">
        {/* Monitor with Sun */}
        <div className={`monitor-container ${animationPhase === 'sunRising' || animationPhase === 'bright' || animationPhase === 'text' ? 'sun-rising' : ''}`}>
          {/* Monitor Frame */}
          <svg className="monitor-frame" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="380" height="220" rx="8" fill="none" stroke="#333" strokeWidth="4"/>
            <rect x="20" y="20" width="360" height="200" fill="#1a1a2e"/>
            {/* Monitor Stand */}
            <rect x="170" y="230" width="60" height="20" fill="#333"/>
            <rect x="130" y="250" width="140" height="8" rx="2" fill="#333"/>
          </svg>

          {/* Sun */}
          <div className={`sun-element ${animationPhase}`}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* Sun rays */}
              <g className="sun-rays">
                <line x1="50" y1="10" x2="50" y2="0" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
                <line x1="73.5" y1="16.5" x2="80.5" y2="9.5" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
                <line x1="90" y1="50" x2="100" y2="50" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
                <line x1="83.5" y1="83.5" x2="90.5" y2="90.5" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
                <line x1="50" y1="90" x2="50" y2="100" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
                <line x1="16.5" y1="83.5" x2="9.5" y2="90.5" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
                <line x1="10" y1="50" x2="0" y2="50" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
                <line x1="16.5" y1="16.5" x2="9.5" y2="9.5" stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
              </g>
              {/* Sun circle */}
              <circle cx="50" cy="50" r="25" fill="url(#sunGradient)"/>
              <defs>
                <radialGradient id="sunGradient">
                  <stop offset="0%" stopColor="#FFD700"/>
                  <stop offset="100%" stopColor="#FFA500"/>
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Bright overlay */}
          <div className={`bright-overlay ${animationPhase === 'bright' || animationPhase === 'text' ? 'active' : ''}`}></div>
        </div>

        {/* Studio Text */}
        {animationPhase === 'text' && (
          <div className="studio-logo-text">
            <div>A Marketing for Betterment</div>
            <div>Studio Experience</div>
          </div>
        )}
      </div>
    </div>
  );
}