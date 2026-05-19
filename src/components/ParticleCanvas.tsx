import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let count = Math.min(window.innerWidth, window.innerHeight) / 20;
    let last = Date.now();
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      count = Math.min(window.innerWidth, window.innerHeight) / 20;
    };

    const create = (life = 0) => {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: Math.random() * 20 - 10,
        dy: Math.random() * 20 - 10,
        life,
      });
    };

    const update = (p: Particle, delta: number) => {
      p.life += delta;
      p.x += p.dx * delta;
      p.y += p.dy * delta;
      p.dx += delta * (Math.random() * 2 - 1);
      p.dy += delta * (Math.random() * 2 - 1);

      ctx.globalAlpha =
        p.life < 1 ? p.life : Math.max(0.5, 2 - Math.min(p.life, 2));
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#fe8bbb";
      ctx.fill();
      ctx.closePath();

      for (let i = 0; i < particles.length; i++) {
        const other = particles[i];
        if (other === p) continue;
        const dist = Math.sqrt(
          (other.x - p.x) ** 2 + (other.y - p.y) ** 2
        );
        if (dist < 120) {
          ctx.globalAlpha = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = "#fe8bbb";
          ctx.stroke();
          ctx.closePath();
        }
      }
    };

    const frame = () => {
      const delta = (Date.now() - last) / 1000;
      last = Date.now();
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (
          p.y < 0 ||
          p.x < 0 ||
          p.y > canvas.height ||
          p.x > canvas.width
        ) {
          particles.splice(i, 1);
          i--;
          continue;
        }
        update(p, delta);
      }

      if (particles.length < count && particles.length !== 0) {
        for (let i = 0; i < count - particles.length; i++) create();
      }
      if (particles.length === 0) {
        for (let i = 0; i < count; i++) create(2);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
