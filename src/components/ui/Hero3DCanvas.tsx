'use client';

import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const Hero3DCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Pause canvas rendering when off-screen to prevent CPU lag
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Generate lightweight 3D Fibonacci Sphere (65 points for optimal 60 FPS)
    const numPoints = 65;
    const points: Point3D[] = [];
    const radius = Math.min(width, height) * 0.35;
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      points.push({
        x: Math.cos(theta) * radiusAtY * radius,
        y: y * radius,
        z: Math.sin(theta) * radiusAtY * radius,
      });
    }

    let angleX = 0.0015;
    let angleY = 0.002;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.00003;
      targetMouseY = (e.clientY - height / 2) * 0.00003;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        const rotX = angleX + currentMouseY;
        const rotY = angleY + currentMouseX;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);

        const projectedPoints: { x2d: number; y2d: number; z: number; scale: number }[] = [];
        const perspective = 550;
        const cx = width / 2;
        const cy = height / 2 - 10;

        // Rotate and project 3D points
        for (let i = 0; i < points.length; i++) {
          const p = points[i];

          let x1 = p.x * cosY - p.z * sinY;
          let z1 = p.z * cosY + p.x * sinY;

          let y1 = p.y * cosX - z1 * sinX;
          let z2 = z1 * cosX + p.y * sinX;

          p.x = x1;
          p.y = y1;
          p.z = z2;

          const scale = perspective / (perspective + z2 + 300);
          projectedPoints.push({
            x2d: cx + x1 * scale,
            y2d: cy + y1 * scale,
            z: z2,
            scale,
          });
        }

        // Draw Connecting 3D Lines (Optimized single-color stroke)
        const maxDistance = 110;
        ctx.lineWidth = 0.8;
        for (let i = 0; i < projectedPoints.length; i++) {
          for (let j = i + 1; j < projectedPoints.length; j++) {
            const p1 = projectedPoints[i];
            const p2 = projectedPoints[j];

            const dx = p1.x2d - p2.x2d;
            const dy = p1.y2d - p2.y2d;
            const dist2d = Math.sqrt(dx * dx + dy * dy);

            if (dist2d < maxDistance) {
              const alpha = (1 - dist2d / maxDistance) * 0.2;
              ctx.beginPath();
              ctx.moveTo(p1.x2d, p1.y2d);
              ctx.lineTo(p2.x2d, p2.y2d);
              ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
              ctx.stroke();
            }
          }
        }

        // Draw 3D Nodes (Fast filled arcs without shadowBlur overhead)
        for (let i = 0; i < projectedPoints.length; i++) {
          const p = projectedPoints[i];
          const alpha = Math.max(0.15, (p.z + radius) / (radius * 2));
          const size = Math.max(1.2, 2.2 * p.scale);

          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, size, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? `rgba(45, 212, 191, ${alpha})` : `rgba(192, 132, 252, ${alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-60"
    />
  );
};
