"use client";

import React, { useEffect, useRef, useState } from "react";

// --- Utility Classes ---
class Oscillator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  value: number;

  constructor(options: any) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
    this.value = 0;
  }

  update() {
    this.phase += this.frequency;
    this.value = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.value;
  }
}

class Node {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

class Line {
  spring: number;
  friction: number;
  nodes: Node[];

  constructor(
    options: { spring: number },
    settings: any,
    pos: { x: number; y: number },
  ) {
    this.spring = options.spring + 0.1 * Math.random() - 0.05;
    this.friction = settings.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let i = 0; i < settings.size; i++) {
      const node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update(pos: { x: number; y: number }, settings: any) {
    let e = this.spring;
    const t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;

    for (let i = 0, a = this.nodes.length; i < a; i++) {
      const node = this.nodes[i];
      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * e;
        node.vy += (prev.y - node.y) * e;
        node.vx += prev.vx * settings.dampening;
        node.vy += prev.vy * settings.dampening;
      }
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      e *= settings.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let n = this.nodes[0].x;
    let i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    let a = 1;
    for (a = 1; a < this.nodes.length - 2; a++) {
      const e = this.nodes[a];
      const t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    const e = this.nodes[a];
    const t = this.nodes[a + 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

// --- Main Component ---
export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fungsi untuk cek apakah device mobile
    const checkDevice = () => {
      const mobileQuery = window.matchMedia("(max-width: 1024px)").matches;
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(mobileQuery || hasTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    // Observer untuk mengaktifkan kursor hanya di section hero/about
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const isVisible = entries.some((entry) => entry.isIntersecting);
      setActive(isVisible);
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });

    const targets = ["hero", "about"]
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);

    targets.forEach((target) => observer.observe(target!));

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  useEffect(() => {
    // Hentikan semua logika jika mobile atau sedang tidak aktif (luar section)
    if (!active || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const settings = {
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };
    const pos = { x: 0, y: 0 };
    let lines: Line[] = [];
    let running = true;
    let animationFrameId: number;

    const hueOscillator = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      if (lines.length === 0) {
        for (let i = 0; i < settings.trails; i++) {
          lines.push(
            new Line(
              { spring: 0.45 + (i / settings.trails) * 0.025 },
              settings,
              pos,
            ),
          );
        }
      }
    };

    const render = () => {
      if (!running || !active || isMobile) return;

      // Cek apakah kursor sedang hover di elemen dengan data-hide-cursor="true"
      const elementAtPos = document.elementFromPoint(pos.x, pos.y);
      const shouldHide = elementAtPos?.closest("[data-hide-cursor]");

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!shouldHide) {
        ctx.globalCompositeOperation = "screen";
        ctx.strokeStyle = `hsla(${Math.round(hueOscillator.update())}, 90%, 60%, 0.35)`;
        ctx.lineWidth = 1.5;

        for (let i = 0; i < settings.trails; i++) {
          const line = lines[i];
          if (line) {
            line.update(pos, settings);
            line.draw(ctx);
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", onMouseMove);

    resizeCanvas();
    render();

    return () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [active, isMobile]);

  // Jika mobile, jangan render canvas untuk menghemat performa
  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
