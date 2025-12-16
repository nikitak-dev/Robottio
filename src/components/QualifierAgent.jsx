import React, { useState, useRef, useEffect } from 'react';

const QualifierAgent = ({ isGlitching }) => {
  const initialPlaceholder = "Жду указаний...";
  const glitchPlaceholder = "Система неисправна";
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);
  const [isInputFocused, setIsInputFocused] = useState(false); // New state to track focus
  const textAreaRef = useRef(null);
  const intervalRef = useRef(null);

  const initialDescription = "Опишите задачу, и я подберу нужного специалиста для ее выполнения.";
  const glitchDescription = "СИСТЕМА::КРИТИЧЕСКАЯ ОШИБКА";
  const [description, setDescription] = useState(initialDescription);

  const initialButtonText = "Обработать";
  const glitchButtonText = "ВТОРЖЕНИЕ";
  const [buttonText, setButtonText] = useState(initialButtonText); // New state for button text

  const scrambleText = (text) => {
    const symbols = "%:!@#$^&*()_+-=[]{}|;<>?";
    return text.split('').map(char => {
      if (char === ' ') return char;
      return Math.random() > 0.85 ? symbols[Math.floor(Math.random() * symbols.length)] : char;
    }).join('');
  };

  useEffect(() => {
    if (isGlitching) {
      setDescription(glitchDescription);
      setButtonText(glitchButtonText); // Set glitch button text
    } else {
      setDescription(initialDescription);
      setButtonText(initialButtonText); // Revert to initial button text
    }

    if (isGlitching && !isInputFocused) {
      // Start scrambling only if glitching AND not focused
      intervalRef.current = setInterval(() => {
        setPlaceholder(scrambleText(glitchPlaceholder));
      }, 50);
    } else {
      // Clear interval and set placeholder based on glitch state when not focused
      clearInterval(intervalRef.current);
      if (!isInputFocused) {
        setPlaceholder(isGlitching ? scrambleText(glitchPlaceholder) : initialPlaceholder);
      } else {
        setPlaceholder(''); // Ensure empty placeholder if focused
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [isGlitching, isInputFocused]); // Re-run effect when focus state changes

  const handleFocus = () => {
    setIsInputFocused(true);
    setPlaceholder(''); // Always clear placeholder on focus
  };

  const handleBlur = () => {
    setIsInputFocused(false);
    if (textAreaRef.current && textAreaRef.current.value === '') {
      // On blur, if empty, set placeholder based on glitch state
      setPlaceholder(isGlitching ? scrambleText(glitchPlaceholder) : initialPlaceholder);
    }
  };

  return (
    <div className="qualifier-agent-container">
      <div className="description-container">
        <p className={!isGlitching ? 'visible' : 'hidden'}>
          {initialDescription}
        </p>
        <p className={`${isGlitching ? 'visible' : 'hidden'} glitch-text-effect`}>
          {glitchDescription}
        </p>
      </div>
      <div className="input-group-vertical">
        <textarea 
          placeholder={placeholder} 
          className="text-area-input" 
          onFocus={handleFocus} 
          onBlur={handleBlur}
          ref={textAreaRef}
        ></textarea>
        {isGlitching ? (
          <a href="https://t.me/nikitak_army_bot" target="_blank" rel="noopener noreferrer" className="control-btn">
            {buttonText}
          </a>
        ) : (
          <button className="control-btn">{buttonText}</button>
        )}
      </div>
    </div>
  );
};

export default QualifierAgent;
