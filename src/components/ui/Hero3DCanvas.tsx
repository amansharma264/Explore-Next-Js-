'use client';

import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
}

export const Hero3DCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate 3D Fibonacci Sphere points
    const numPoints = 220;
    const points: Point3D[] = [];
    const radius = Math.min(width, height) * 0.35;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseX: x * radius,
        baseY: y * radius,
        baseZ: z * radius,
      });
    }

    let angleX = 0.002;
    let angleY = 0.003;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.00005;
      mouseY = (e.clientY - height / 2) * 0.00005;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const rotX = angleX + mouseY;
      const rotY = angleY + mouseX;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const projectedPoints: { x2d: number; y2d: number; z: number; scale: number }[] = [];
      const perspective = 600;
      const cx = width / 2;
      const cy = height / 2 - 20;

      // Rotate and Project 3D points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y1;
        p.z = z2;

        const scale = perspective / (perspective + z2 + 300);
        const x2d = cx + x1 * scale;
        const y2d = cy + y1 * scale;

        projectedPoints.push({ x2d, y2d, z: z2, scale });
      }

      // Draw 3D Connecting Lines
      const maxDistance = 90;
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[j];

          const dx = p1.x2d - p2.x2d;
          const dy = p1.y2d - p2.y2d;
          const dist2d = Math.sqrt(dx * dx + dy * dy);

          if (dist2d < maxDistance) {
            const alpha = (1 - dist2d / maxDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x2d, p1.y2d);
            ctx.lineTo(p2.x2d, p2.y2d);

            const gradient = ctx.createLinearGradient(p1.x2d, p1.y2d, p2.x2d, p2.y2d);
            gradient.addColorStop(0, `rgba(20, 184, 166, ${alpha})`);
            gradient.addColorStop(1, `rgba(168, 85, 247, ${alpha})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1 * Math.min(p1.scale, p2.scale);
            ctx.stroke();
          }
        }
      }

      // Draw 3D Nodes
      for (let i = 0; i < projectedPoints.length; i++) {
        const p = projectedPoints[i];
        const alpha = Math.max(0.1, (p.z + radius) / (radius * 2));
        const size = Math.max(1, 2.5 * p.scale);

        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? `rgba(45, 212, 191, ${alpha})` : `rgba(192, 132, 252, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = i % 3 === 0 ? '#14b8a6' : '#a855f7';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};
