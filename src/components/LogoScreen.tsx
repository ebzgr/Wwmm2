import { useEffect, useState } from 'react';

interface LogoScreenProps {
  onComplete: () => void;
  isTransitioning: boolean;
}

export default function LogoScreen({ onComplete, isTransitioning }: LogoScreenProps) {
  const [showFirstLine, setShowFirstLine] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    // Show first line after 1 second
    const firstLineTimer = setTimeout(() => {
      setShowFirstLine(true);
    }, 1000);

    // Show second line after 2.5 seconds
    const secondLineTimer = setTimeout(() => {
      setShowSecondLine(true);
    }, 2500);

    // Auto-advance after 6 seconds (slower transition)
    const timer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(firstLineTimer);
      clearTimeout(secondLineTimer);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className={`screen-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <div className="content-center">
        <div className="logo-container">
          <div className="logo-circle">
            <div className="logo-wrapper">
              {/* Top row - WW */}
              <div className="logo-row">
                <span className="logo-letter logo-letter-w1">W</span>
                <span className="logo-letter logo-letter-w2">W</span>
              </div>
              
              {/* Mirror line */}
              <div className="mirror-line"></div>
              
              {/* Bottom row - MM (actually rotated WW) */}
              <div className="logo-row logo-reflected">
                <span className="logo-letter logo-letter-m1">W</span>
                <span className="logo-letter logo-letter-m2">W</span>
              </div>
            </div>
          </div>
        </div>
        <div className="logo-subtitle-wrapper">
          <p className={`logo-subtitle-large logo-subtitle-line ${showFirstLine ? 'fade-in-line' : ''}`}>
            Leave the shadows,
          </p>
          <p className={`logo-subtitle-large logo-subtitle-line ${showSecondLine ? 'fade-in-line' : ''}`}>
            Walk toward the lights
          </p>
        </div>
      </div>
    </div>
  );
}