import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import MatrixBackground from './components/MatrixBackground';
import QualifierAgent from './components/QualifierAgent';
import AnimatedLogo from './components/AnimatedLogo';

function App() {
  const [isGlitching, setIsGlitching] = useState(false);
  const logoRef = useRef(null);
  const layoutRef = useRef(null);
  const agentContainerRef = useRef(null);

  useEffect(() => {
    const logoElement = logoRef.current;
    const layoutElement = layoutRef.current;
    const agentContainerElement = agentContainerRef.current;
    if (!logoElement || !layoutElement || !agentContainerElement) return;

    let timeoutId;

    const startGlitchSequence = () => {
      const jerkCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 jerks
      const totalGlitchDuration = jerkCount * 1000; // Каждый рывок длится 1 секунду

      // 1. Включаем "красный режим" для ВСЕХ на весь период
      setIsGlitching(true);
      agentContainerElement.classList.add('glitching-text');
      layoutElement.classList.add('border-glitching');
      logoElement.classList.add('glitching');
      
      // 3. В самом конце выключаем "красный режим" и все анимации
      setTimeout(() => {
        setIsGlitching(false);
        agentContainerElement.classList.remove('glitching-text');
        logoElement.classList.remove('glitching');
        layoutElement.classList.remove('border-glitching');
      }, totalGlitchDuration);

      // 4. Планируем следующий цикл
      const randomDelay = Math.floor(Math.random() * (20000 - 15000 + 1)) + 15000;
      timeoutId = setTimeout(startGlitchSequence, randomDelay);
    };

    const initialRandomDelay = Math.floor(Math.random() * (20000 - 15000 + 1)) + 15000;
    timeoutId = setTimeout(startGlitchSequence, initialRandomDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="app-container">
      <MatrixBackground isGlitching={isGlitching} />
      <div className="main-layout" ref={layoutRef}>
        <div className="agent-container" ref={agentContainerRef}>
          <header>
            <div className="logo-container">
              <AnimatedLogo className="logo" ref={logoRef} />
            </div>
            <h1>Robottio</h1>
          </header>
          <QualifierAgent isGlitching={isGlitching} />
        </div>
      </div>
    </div>
  );
}

export default App;

