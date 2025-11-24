"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  colorIndex: number;
}

const COLORS = [
  "#F637B3", // fuscia
  "#EB54F6", // pink
  "#B25AF6", // purple
  "#667AFF", // violet
  "#2EA6FF", // blue
  "#00D2FF", // light-blue
  "#31DDED", // teal
  "#60E6D5", // mint
  "#89EC9B", // green
];

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const colorIndexRef = useRef(0);
  const colorTransitionRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Slowly transition between colors
      colorTransitionRef.current++;
      if (colorTransitionRef.current > 30) { // Change color every 30 particles
        colorTransitionRef.current = 0;
        colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length;
      }
      
      // Create fewer, larger particles for smoke effect
      const maxLife = Math.random() * 80 + 60; // Longer life
      particlesRef.current.push({
        x: e.clientX + (Math.random() - 0.5) * 5,
        y: e.clientY + (Math.random() - 0.5) * 5,
        size: Math.random() * 40 + 30, // Larger particles
        speedX: (Math.random() - 0.5) * 0.5, // Slower drift
        speedY: (Math.random() - 0.5) * 0.5 - 0.3, // Slight upward drift for smoke
        life: maxLife,
        maxLife: maxLife,
        colorIndex: colorIndexRef.current,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life--;
        particle.size *= 0.995; // Grow slightly for smoke expansion

        // Calculate opacity based on life
        const opacity = particle.life / particle.maxLife;

        if (particle.life <= 0) {
          return false; // Remove particle
        }

        // Get color for this particle
        const color = COLORS[particle.colorIndex];
        
        // Create gradient for smoky effect with softer edges
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );

        // Softer, more diffuse smoke effect
        const alpha = opacity * 0.3; // Lower opacity for smoke
        gradient.addColorStop(0, `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.4, `${color}${Math.floor(alpha * 0.5 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${color}00`);

        // Draw particle
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });}

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
