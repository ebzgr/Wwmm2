import { useState } from 'react';

interface EmotionalNudgingScreenProps {
  onContinue: () => void;
  isTransitioning: boolean;
}

export default function EmotionalNudgingScreen({ onContinue, isTransitioning }: EmotionalNudgingScreenProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleContinue = () => {
    if (isChecked && !isTransitioning) {
      onContinue();
    }
  };

  return (
    <div className={`screen-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <div className="content-center statement-content">
        <h2 className="statement-title">Emotional Nudging Statement</h2>
        
        <div className="statement-box">
          <p className="statement-text">
            This experience uses mild emotional cues and narrative elements to show 
            how digital environments influence decisions.
          </p>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="custom-checkbox"
          />
          <span className="checkbox-text">
            I understand this experience uses emotional nudging for awareness.
          </span>
        </label>

        <button
          onClick={handleContinue}
          disabled={!isChecked}
          className="continue-button"
        >
          Begin the Experience →
        </button>
      </div>
    </div>
  );
}
