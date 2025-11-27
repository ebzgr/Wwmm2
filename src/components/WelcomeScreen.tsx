import { useState, useEffect } from 'react';

interface WelcomeScreenProps {
  onContinue: () => void;
  isTransitioning: boolean;
}

const slider1Words = ['mislead', 'persuade', 'teach', 'warn', 'trick', 'aware', 'lure', 'inspire', 'tempt', 'invite', 'push', 'manipulate'];
const slider2Words = ['notice', 'realize', 'learn', 'change', 'understand', 'discover', 'grow', 'evolve', 'adapt', 'transform', 'develop', 'progress'];

export default function WelcomeScreen({ onContinue, isTransitioning }: WelcomeScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  
  const [slider1Index, setSlider1Index] = useState(0);
  const [slider2Index, setSlider2Index] = useState(0);
  
  const [slider1Text, setSlider1Text] = useState('');
  const [slider2Text, setSlider2Text] = useState('');
  
  const [slider1IsDeleting, setSlider1IsDeleting] = useState(false);
  const [slider2IsDeleting, setSlider2IsDeleting] = useState(false);

  useEffect(() => {
    // Simulate loading from 0 to 100
    const duration = 5000; // 5 seconds (slower)
    const steps = 100;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Show continue prompt after loading completes
          setTimeout(() => setShowContinue(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Typewriter effect for slider 1
  useEffect(() => {
    const currentWord = slider1Words[slider1Index];
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseTime = 1200;

    let timeout: NodeJS.Timeout;

    if (!slider1IsDeleting && slider1Text.length < currentWord.length) {
      // Typing
      timeout = setTimeout(() => {
        setSlider1Text(currentWord.substring(0, slider1Text.length + 1));
      }, typingSpeed);
    } else if (!slider1IsDeleting && slider1Text.length === currentWord.length) {
      // Pause before deleting
      timeout = setTimeout(() => {
        setSlider1IsDeleting(true);
      }, pauseTime);
    } else if (slider1IsDeleting && slider1Text.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setSlider1Text(slider1Text.substring(0, slider1Text.length - 1));
      }, deletingSpeed);
    } else if (slider1IsDeleting && slider1Text.length === 0) {
      // Move to next word
      setSlider1IsDeleting(false);
      setSlider1Index((prev) => (prev + 1) % slider1Words.length);
    }

    return () => clearTimeout(timeout);
  }, [slider1Text, slider1IsDeleting, slider1Index]);

  // Typewriter effect for slider 2 (different timing)
  useEffect(() => {
    const currentWord = slider2Words[slider2Index];
    const typingSpeed = 140;
    const deletingSpeed = 70;
    const pauseTime = 2000;

    let timeout: NodeJS.Timeout;

    if (!slider2IsDeleting && slider2Text.length < currentWord.length) {
      // Typing
      timeout = setTimeout(() => {
        setSlider2Text(currentWord.substring(0, slider2Text.length + 1));
      }, typingSpeed);
    } else if (!slider2IsDeleting && slider2Text.length === currentWord.length) {
      // Pause before deleting
      timeout = setTimeout(() => {
        setSlider2IsDeleting(true);
      }, pauseTime);
    } else if (slider2IsDeleting && slider2Text.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setSlider2Text(slider2Text.substring(0, slider2Text.length - 1));
      }, deletingSpeed);
    } else if (slider2IsDeleting && slider2Text.length === 0) {
      // Move to next word
      setSlider2IsDeleting(false);
      setSlider2Index((prev) => (prev + 1) % slider2Words.length);
    }

    return () => clearTimeout(timeout);
  }, [slider2Text, slider2IsDeleting, slider2Index]);

  const handleInteraction = () => {
    if (showContinue && !isTransitioning) {
      onContinue();
    }
  };

  return (
    <div 
      className={`screen-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}
      onClick={handleInteraction}
      onKeyDown={(e) => {
        if (e.key) handleInteraction();
      }}
      tabIndex={0}
      role="button"
      aria-label="Continue to next screen"
    >
      <div className="content-center">
        <h1 className="welcome-title-three-lines">
          Welcome to the<br />
          <span className="highlight">Wonderful World</span> of<br />
          <span className="highlight">Manipulative Marketing</span>
        </h1>

        <div className="slider-container">
          <p className="slider-text slider-text-desktop">
            Here we{' '}
            <span className="typewriter-word">
              {slider1Text}
            </span>
            {' '}you, and you{' '}
            <span className="typewriter-word">
              {slider2Text}
            </span>
          </p>
          
          {/* Mobile version - two lines */}
          <div className="slider-text-mobile">
            <p className="slider-text">
              Here we{' '}
              <span className="typewriter-word">
                {slider1Text}
              </span>,
            </p>
            <p className="slider-text">
              and you{' '}
              <span className="typewriter-word">
                {slider2Text}
              </span>
            </p>
          </div>
        </div>

        {!showContinue && (
          <div className="loading-container">
            <div className="loading-bar-wrapper">
              <div 
                className="loading-bar"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}

        {showContinue && (
          <p className="continue-prompt blink">Press anything to continue</p>
        )}
      </div>
    </div>
  );
}