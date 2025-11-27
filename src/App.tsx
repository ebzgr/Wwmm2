import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuoteScreen from './components/QuoteScreen';
import LogoScreen from './components/LogoScreen';
import MarketingStudioScreen from './components/MarketingStudioScreen';
import DataUsageScreen from './components/DataUsageScreen';
import EmotionalNudgingScreen from './components/EmotionalNudgingScreen';
import UnderConstructionScreen from './components/UnderConstructionScreen';
import './styles/globals.css';

export type Screen = 'welcome' | 'quote' | 'logo' | 'studio' | 'data' | 'emotional' | 'complete';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [previousScreen, setPreviousScreen] = useState<Screen | null>(null);

  const fadeTransition = (targetScreen: Screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(targetScreen);
    
    // Clear previous screen after fade completes
    setTimeout(() => {
      setPreviousScreen(null);
    }, 800);
  };

  const restartFlow = () => {
    fadeTransition('welcome');
  };

  const renderScreen = (screen: Screen, isFadingOut: boolean = false) => {
    const className = `screen-container ${isFadingOut ? 'fade-out' : 'fade-in'}`;
    
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen key="welcome" onContinue={() => fadeTransition('quote')} isTransitioning={isFadingOut} />;
      case 'quote':
        return <QuoteScreen key="quote" onComplete={() => fadeTransition('logo')} isTransitioning={isFadingOut} />;
      case 'logo':
        return <LogoScreen key="logo" onComplete={() => fadeTransition('studio')} isTransitioning={isFadingOut} />;
      case 'studio':
        return <MarketingStudioScreen key="studio" onComplete={() => fadeTransition('data')} isTransitioning={isFadingOut} />;
      case 'data':
        return <DataUsageScreen key="data" onContinue={() => fadeTransition('emotional')} isTransitioning={isFadingOut} />;
      case 'emotional':
        return <EmotionalNudgingScreen key="emotional" onContinue={() => fadeTransition('complete')} isTransitioning={isFadingOut} />;
      case 'complete':
        return <UnderConstructionScreen key="complete" onRestart={restartFlow} isTransitioning={isFadingOut} />;
    }
  };

  return (
    <div className="app-container">
      {/* Previous screen fading out */}
      {previousScreen && renderScreen(previousScreen, true)}
      
      {/* Current screen fading in */}
      {renderScreen(currentScreen, false)}
    </div>
  );
}