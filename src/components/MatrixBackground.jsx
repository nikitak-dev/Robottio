import React, { useRef, useEffect } from 'react';

const MatrixBackground = ({ isGlitching }) => {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);
  const isGlitchingRef = useRef(isGlitching); // Ref для хранения актуального состояния глитча
  const lastMatrixDrawTime = useRef(0);
  const matrixDrawInterval = 33; // ~30 FPS

  // Этот эффект ОБНОВЛЯЕТ ref, но НЕ перезапускает анимацию
  useEffect(() => {
    isGlitchingRef.current = isGlitching;
  }, [isGlitching]);

  // Этот эффект запускается ТОЛЬКО ОДИН РАЗ и управляет всей анимацией
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fontSize = 16;
    
    const normalCharacters = '01';
    const glitchCharacters = '%№*?#$@!';
    const normalColor = '#39FF14';
    const glitchColor = '#FF003C';

    const initializeDrops = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(window.innerWidth / fontSize);
      dropsRef.current = [];
      for (let x = 0; x < columns; x++) {
        dropsRef.current[x] = Math.floor(Math.random() * -canvas.height / fontSize);
      }
    };

    initializeDrops();
    window.addEventListener('resize', initializeDrops);

    let animationFrameId;

    const drawMatrix = (timestamp) => {
      if (timestamp - lastMatrixDrawTime.current > matrixDrawInterval) {
        // Читаем актуальное состояние глитча из ref
        const characters = isGlitchingRef.current ? glitchCharacters : normalCharacters;
        const color = isGlitchingRef.current ? glitchColor : normalColor;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px 'Orbitron', monospace`;

        for (let i = 0; i < dropsRef.current.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(text, i * fontSize, dropsRef.current[i] * fontSize);
          if (dropsRef.current[i] * fontSize > canvas.height && Math.random() > 0.975) {
            dropsRef.current[i] = 0;
          }
          dropsRef.current[i]++;
        }
        lastMatrixDrawTime.current = timestamp;
      }
      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix(0);

    return () => {
      window.removeEventListener('resize', initializeDrops);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // <-- Пустой массив зависимостей ГАРАНТИРУЕТ, что этот код запустится только один раз

  return <canvas id="matrix-bg" ref={canvasRef}></canvas>;
};

export default MatrixBackground;
