import React, { useEffect, useRef } from "react";

export const PetalFall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Petal {
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      angularVelocity: number;
      size: number;
      color: string;
      startTime: number;
      duration: number;
      opacity: number;
    }

    const petals: Petal[] = [];
    const colors = ["#f8a8c8", "#f6b7d2", "#f9cddc", "#fce4ec", "#f3d6db"];

    // Tạo cánh hoa
    const createPetal = () => {
      const petalCount = 100; // Tăng số lượng
      const startTime = Date.now();

      for (let i = 0; i < petalCount; i++) {
        petals.push({
          x: Math.random() * canvas.width,
          y: -50,
          vx: (Math.random() - 0.5) * 2, // Rơi chậm, lênh đênh
          vy: Math.random() * 0.8 + 0.4, // Rơi từ từ
          angle: Math.random() * Math.PI * 2,
          angularVelocity: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 8 + 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          startTime: startTime + i * 80, // Stagger start time
          duration: 5000, // 5 giây rơi
          opacity: 1,
        });
      }
    };

    // Vẽ cánh hoa hình trái tim/tròn
    const drawPetal = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      color: string,
      opacity: number,
    ) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = color;

      // Vẽ cánh hoa hình trái tim
      ctx.beginPath();
      const w = size;
      const h = size * 1.2;

      // Top left curve
      ctx.bezierCurveTo(-w / 2, -h / 3, -w, -h / 2, -w / 2, 0);
      // Left point to bottom
      ctx.bezierCurveTo(-w / 4, h / 3, 0, h / 2, 0, h / 3);
      // Right side
      ctx.bezierCurveTo(0, h / 2, w / 4, h / 3, w / 2, 0);
      // Top right curve
      ctx.bezierCurveTo(w, -h / 2, w / 2, -h / 3, 0, -h / 4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      petals.forEach((petal, index) => {
        const elapsed = now - petal.startTime;

        if (elapsed < 0) return; // Chưa bắt đầu

        if (elapsed > petal.duration) {
          petals.splice(index, 1);
          return;
        }

        // Progress (0 to 1)
        const progress = elapsed / petal.duration;

        // Rơi tự nhiên (linear)
        petal.y += petal.vy;

        // Wave motion (lênh đênh ngang)
        petal.x += petal.vx * Math.sin(progress * Math.PI * 3);

        // Quay từ từ
        petal.angle += petal.angularVelocity;

        // Opacity (mờ dần cuối cùng)
        const opacity =
          progress < 0.85 ? 1 : Math.max(0, (1 - progress) / 0.15); // Mờ trong 15% cuối

        drawPetal(
          ctx,
          petal.x,
          petal.y,
          petal.size,
          petal.angle,
          petal.color,
          Math.min(1, opacity),
        );
      });

      if (petals.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    // Bắt đầu
    createPetal();
    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ top: 0, left: 0 }}
    />
  );
};
