interface UnderConstructionScreenProps {
  onRestart: () => void;
  isTransitioning: boolean;
}

export default function UnderConstructionScreen({ onRestart, isTransitioning }: UnderConstructionScreenProps) {
  return (
    <div 
      className={`screen-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}
    >
      <div className="content-center">
        <div className="construction-container">
          <div className="construction-icon">🚧</div>
          <p className="construction-text">
            Good things take time.<br />
            Great things take patience.
          </p>
          <p className="construction-subtitle">
            We are working on the second version of<br />
            <span className="construction-highlight">Wonderful World of Manipulative Marketing</span>
          </p>
          <p className="construction-version-text">
            In the meanwhile, you can check version 1 here:
          </p>
          <a 
            href="https://ebzgr.github.io/wwmm/index.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="construction-link"
          >
            Visit WWMM Version 1
          </a>
        </div>
        <p className="continue-prompt blink" style={{ marginTop: '3rem' }} onClick={onRestart}>
          Click here to restart
        </p>
      </div>
    </div>
  );
}