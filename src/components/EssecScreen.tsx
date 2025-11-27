import { useEffect } from 'react';

// Public assets in Vite with base path: must use BASE_URL
// BASE_URL is '/' in dev, '/Wwmm2/' in production (always ends with /)
const getLogoPath = () => {
  const base = import.meta.env.BASE_URL;
  // Ensure no double slashes
  const path = base.endsWith('/') ? `${base}essec-logo.png` : `${base}/essec-logo.png`;
  console.log('ESSEC Logo Path:', path, 'BASE_URL:', base);
  return path;
};
const essecLogo = getLogoPath();

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
