import { useEffect } from 'react';
import essecLogo from 'figma:asset/a3c9b100ee33246f3c51ae119991158ce76382e7.png';

interface EssecScreenProps {
  onComplete: () => void;
  isTransitioning: boolean;
}

export default function EssecScreen({ onComplete, isTransitioning }: EssecScreenProps) {
  useEffect(() => {
    // Auto-advance after 4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`screen-container essec-screen ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <div className="content-center">
        <div className="essec-content">
          <img src={essecLogo} alt="ESSEC Logo" className="essec-logo" />
          <h2 className="essec-title">Designed at ESSEC</h2>
          <p className="essec-location">Paris, France</p>
        </div>
      </div>
    </div>
  );
}
