import { useEffect } from 'react';

interface QuoteScreenProps {
  onComplete: () => void;
  isTransitioning: boolean;
}

export default function QuoteScreen({ onComplete, isTransitioning }: QuoteScreenProps) {
  useEffect(() => {
    // Auto-advance after 8 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`screen-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}
    >
      <div className="content-center">
        <div className="quote-container">
          <div className="quote-mark quote-mark-open">"</div>
          <p className="quote-text">
            We live as prisoners who mistake shadows for truth. Only when we loosen the chains of illusion can we turn toward the light
            and see reality as it has always been - waiting, patient, and real.
          </p>
          <div className="quote-mark quote-mark-close">"</div>
          <p className="quote-attribution">
            A poetic adaptation of Plato's Allegory of the Cave.
          </p>
        </div>
      </div>
    </div>
  );
}