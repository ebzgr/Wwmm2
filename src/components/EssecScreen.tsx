import { useEffect } from 'react';

// For public assets in Vite, they're served at {base}filename
// BASE_URL is '/' in dev and '/Wwmm2/' in production (always ends with /)
const essecLogo = `${import.meta.env.BASE_URL}essec-logo.png`;

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
          <img 
            src={essecLogo} 
            alt="ESSEC Logo" 
            className="essec-logo"
            onError={(e) => {
              console.error('Failed to load ESSEC logo:', essecLogo, 'BASE_URL:', import.meta.env.BASE_URL);
              // Fallback: try without base URL
              (e.target as HTMLImageElement).src = '/essec-logo.png';
            }}
          />
          <h2 className="essec-title">Designed at ESSEC</h2>
          <p className="essec-location">Paris, France</p>
        </div>
      </div>
    </div>
  );
}
