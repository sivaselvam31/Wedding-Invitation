import React, { useEffect, useRef } from 'react';

export default function PetalDrift() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Max 15 petals for peak mobile performance
    const petalCount = 15;
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 4 + 2, // size
        d: Math.random() * petalCount, // density/speed helper
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * Math.PI,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.5 + 0.3,
        // Alternate colors for richness (lavender primary, lavender secondary, gold accent)
        color: Math.random() > 0.3 
          ? (Math.random() > 0.5 ? 'rgba(123, 75, 122, ' : 'rgba(181, 139, 175, ') 
          : 'rgba(216, 178, 110, '
      });
    }

    const drawPetal = (petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      
      // Draw organic curved petal path
      ctx.beginPath();
      ctx.fillStyle = `${petal.color}${petal.opacity})`;
      
      // Draw simple leaf/petal shape using two quadratic curves
      ctx.moveTo(0, -petal.r * 2);
      ctx.quadraticCurveTo(petal.r, -petal.r, 0, petal.r * 2);
      ctx.quadraticCurveTo(-petal.r, -petal.r, 0, -petal.r * 2);
      
      ctx.fill();
      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petalCount; i++) {
        const p = petals[i];
        
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y / 30) * 0.2; // Add subtle sway
        p.rotation += p.rotationSpeed;

        // Draw the petal
        drawPetal(p);

        // Reset if it goes off screen bottom or sides
        if (p.y > height || p.x > width + 10 || p.x < -10) {
          p.x = Math.random() * width;
          p.y = -20;
          p.speedY = Math.random() * 1 + 0.5;
          p.speedX = Math.random() * 0.8 - 0.4;
          p.opacity = Math.random() * 0.5 + 0.3;
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
