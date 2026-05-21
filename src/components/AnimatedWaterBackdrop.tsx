import React, { useEffect, useRef } from "react";

export const AnimatedWaterBackdrop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Track state of waves
    let tick = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Wave parameters
    const waves = [
      {
        y: height * 0.5,
        length: 0.005,
        amplitude: 25,
        speed: 0.015,
        color: "rgba(74, 222, 128, 0.04)" // Brand Green ultra subtle
      },
      {
        y: height * 0.6,
        length: 0.008,
        amplitude: 15,
        speed: -0.012,
        color: "rgba(14, 165, 233, 0.03)" // Blue secondary
      },
      {
        y: height * 0.45,
        length: 0.003,
        amplitude: 35,
        speed: 0.008,
        color: "rgba(74, 222, 128, 0.02)"
      }
    ];

    // Optional light columns (caustics effect)
    const columns = Array.from({ length: 4 }, (_, i) => ({
      x: width * (0.2 + i * 0.25),
      width: width * 0.15,
      opacity: 0.03 + Math.random() * 0.03,
      pulseSpeed: 0.005 + Math.random() * 0.005,
      angle: -0.2 + Math.random() * 0.1
    }));

    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw smooth vertical light caustics
      columns.forEach((col, idx) => {
        const pulse = Math.sin(tick * col.pulseSpeed) * 0.015 + 0.035;
        const grad = ctx.createLinearGradient(
          col.x, 
          0, 
          col.x + Math.tan(col.angle) * height, 
          height
        );
        grad.addColorStop(0, `rgba(74, 222, 128, ${pulse})`);
        grad.addColorStop(0.5, `rgba(14, 165, 233, ${pulse * 0.5})`);
        grad.addColorStop(1, "rgba(21, 27, 39, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        const startX = col.x - col.width / 2;
        const endX = col.x + col.width / 2;
        ctx.moveTo(startX, 0);
        ctx.lineTo(endX, 0);
        ctx.lineTo(endX + Math.tan(col.angle) * height, height);
        ctx.lineTo(startX + Math.tan(col.angle) * height, height);
        ctx.closePath();
        ctx.fill();
      });

      // 2. Draw flowing water wave lines
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += 5) {
          const y = wave.y + Math.sin(x * wave.length + tick * wave.speed) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // 3. Optional ambient rising air bubbles
      // Very tiny, translucent particles rising slowly
      ctx.fillStyle = "rgba(74, 222, 128, 0.08)";
      for (let i = 0; i < 12; i++) {
        const xSpeed = Math.sin(tick * 0.01 + i) * 0.2;
        const x = (width * 0.1 + (i * width * 0.08) + Math.sin(tick * 0.005 + i) * 35) % width;
        const y = (height - (tick * (1.2 + i * 0.1)) % height);
        const radius = 1 + (i % 3);
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
};
