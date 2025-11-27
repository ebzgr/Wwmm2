import { useState } from 'react';

interface DataUsageScreenProps {
  onContinue: () => void;
  isTransitioning: boolean;
}

export default function DataUsageScreen({ onContinue, isTransitioning }: DataUsageScreenProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleContinue = () => {
    if (isChecked && !isTransitioning) {
      onContinue();
    }
  };

  return (
    <div className={`screen-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <div className="content-center statement-content">
        <h2 className="statement-title">Data Usage Statement</h2>
        
        <div className="statement-box">
          <p className="statement-text">
            We collect anonymous interaction data to understand how people recognize 
            manipulative marketing techniques. No personal information is stored.
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
            I have read and understood the data usage statement.
          </span>
        </label>

        <button
          onClick={handleContinue}
          disabled={!isChecked}
          className="continue-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
