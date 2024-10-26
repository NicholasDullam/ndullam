"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Particle = {
  posX: number;
  posY: number;
  radius: number;
  velocityX: number;
  velocityY: number;
  elasticity: number;
  mass: number;
  nextX: number;
  nextY: number;
};

export type SimulatorProps = {
  gravity: number;
  collision: boolean;
  maxParticles: number;
  rate: number;
};

export const Simulator = ({
  gravity = 10,
  collision = true,
  maxParticles = 200,
  rate = 20,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [prevRender, setPrevRender] = useState<number>(Date.now());
  const [computeTime, setComputeTime] = useState<number>(0);
  const [collisions, setCollisions] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const particlesRef = useRef(particles);
  const prevRenderRef = useRef(prevRender);

  useEffect(() => {
    particlesRef.current = particles;
  }, [particles]);

  useEffect(() => {
    prevRenderRef.current = prevRender;
  }, [prevRender]);

  const generateParticles = useCallback(() => {
    const render: Particle[] = [];
    for (let i = 0; i < rate; i++) {
      if (render.length + particlesRef.current.length < maxParticles) {
        render.push({
          radius: 3,
          posX: window.innerWidth - 80,
          posY: 560,
          velocityX: Math.random() * (Math.round(Math.random()) ? 1 : -1) * 0.5,
          velocityY: Math.random() * 1,
          elasticity: 1,
          mass: 1000,
          nextX: 0,
          nextY: 0,
        });
      }
    }
    return render;
  }, [rate, maxParticles]);

  const renderParticles = useCallback((particles: Particle[]) => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    particles.forEach((particle) => {
      context.fillStyle = "#FFFFFF";
      context.beginPath();
      context.arc(
        particle.posX,
        particle.posY,
        particle.radius,
        0,
        Math.PI * 2,
        true,
      );
      context.closePath();
      context.fill();
    });
  }, []);

  const updateParticles = useCallback(
    (particles: Particle[], time: number) => {
      return particles.map((particle) => ({
        ...particle,
        velocityY: particle.velocityY + gravity,
        nextX: particle.posX + particle.velocityX * (time / 1000),
        nextY: particle.posY + particle.velocityY * (time / 1000),
      }));
    },
    [gravity],
  );

  const wallCollisions = useCallback((particles: Particle[]) => {
    return particles
      .map((_particle) => {
        if (!canvasRef.current) return;
        const particle = { ..._particle };
        if (particle.nextX + particle.radius > canvasRef.current.width) {
          particle.velocityX = -particle.velocityX * particle.elasticity;
          particle.nextX = canvasRef.current.width - particle.radius;
        } else if (particle.nextX - particle.radius < 0) {
          particle.velocityX = -particle.velocityX * particle.elasticity;
          particle.nextX = particle.radius;
        } else if (
          particle.nextY + particle.radius >
          canvasRef.current.height
        ) {
          particle.velocityY = -particle.velocityY * particle.elasticity;
          particle.nextY = canvasRef.current.height - particle.radius;
        }
        return particle;
      })
      .filter((item) => !!item);
  }, []);

  const areCollided = useCallback((particle: Particle, collider: Particle) => {
    const distance = Math.sqrt(
      Math.pow(particle.nextX - collider.nextX, 2) +
        Math.pow(particle.nextY - collider.nextY, 2),
    );
    return distance <= particle.radius + collider.radius;
  }, []);

  const calcCollision = useCallback(
    (particle: Particle, collider: Particle, time: number) => {
      const dx = particle.nextX - collider.nextX;
      const dy = particle.nextY - collider.nextY;

      const collisionAngle = Math.atan2(dy, dx);

      const speed1 = Math.sqrt(
        Math.pow(particle.velocityX, 2) + Math.pow(particle.velocityY, 2),
      );
      const speed2 = Math.sqrt(
        Math.pow(collider.velocityX, 2) + Math.pow(collider.velocityY, 2),
      );

      const direction1 = Math.atan2(particle.velocityY, particle.velocityX);
      const direction2 = Math.atan2(collider.velocityY, collider.velocityX);

      const velocityX_1 = speed1 * Math.cos(direction1 - collisionAngle);
      const velocityY_1 = speed1 * Math.sin(direction1 - collisionAngle);
      const velocityX_2 = speed2 * Math.cos(direction2 - collisionAngle);
      const velocityY_2 = speed2 * Math.sin(direction2 - collisionAngle);

      const final_velocityX_1 =
        ((particle.mass - collider.mass) * velocityX_1 +
          (collider.mass + collider.mass) * velocityX_2) /
        (particle.mass + collider.mass);
      const final_velocityX_2 =
        ((particle.mass + particle.mass) * velocityX_1 +
          (collider.mass - particle.mass) * velocityX_2) /
        (particle.mass + collider.mass);

      const final_velocityY_1 = velocityY_1;
      const final_velocityY_2 = velocityY_2;

      particle.velocityX =
        Math.cos(collisionAngle) * final_velocityX_1 +
        Math.cos(collisionAngle + Math.PI / 2) * final_velocityY_1;
      particle.velocityY =
        Math.sin(collisionAngle) * final_velocityX_1 +
        Math.sin(collisionAngle + Math.PI / 2) * final_velocityY_1;
      collider.velocityX =
        Math.cos(collisionAngle) * final_velocityX_2 +
        Math.cos(collisionAngle + Math.PI / 2) * final_velocityY_2;
      collider.velocityY =
        Math.sin(collisionAngle) * final_velocityX_2 +
        Math.sin(collisionAngle + Math.PI / 2) * final_velocityY_2;

      particle.nextX = particle.nextX += particle.velocityX * (time / 1000);
      particle.nextY = particle.nextY += particle.velocityY * (time / 1000);
      collider.nextX = collider.nextX += collider.velocityX * (time / 1000);
      collider.nextY = collider.nextY += collider.velocityY * (time / 1000);

      return [particle, collider];
    },
    [],
  );

  const unitCollisions = useCallback(
    (particles: Particle[], time: number) => {
      let col = 0;
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const collider = particles[j];
          if (areCollided(particle, collider)) {
            col += 1;
            const result = calcCollision(particle, collider, time);
            particles[i] = result[0];
            particles[j] = result[1];
          }
        }
      }
      setCollisions((c) => c + col);
      return particles;
    },
    [areCollided, calcCollision],
  );

  const draw = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context || !canvasRef.current) return;
    const time = Date.now();
    setComputeTime(time - prevRenderRef.current);
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    let render = [...particlesRef.current, ...generateParticles()];
    render = updateParticles(render, time - prevRenderRef.current);
    render = wallCollisions(render);
    if (collision)
      render = unitCollisions(render, time - prevRenderRef.current);
    renderParticles(render);
    setParticles(render);
    setPrevRender(time);
  }, [
    unitCollisions,
    wallCollisions,
    generateParticles,
    updateParticles,
    collision,
    renderParticles,
  ]);

  useEffect(() => {
    const interval = setInterval(draw, 1);
    return () => clearInterval(interval);
  }, [draw]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        color: "white",
        fontFamily: "Menlo",
      }}
    >
      <p
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          color: "white",
          fontSize: "13px",
        }}
      >
        fps: {Math.round(1000 / computeTime)}
      </p>
      <p
        style={{
          position: "absolute",
          top: "30px",
          right: "30px",
          color: "white",
          fontSize: "13px",
        }}
      >
        {" "}
        collisions: {collisions}{" "}
      </p>
      <canvas
        ref={canvasRef}
        height={
          containerRef.current
            ? containerRef.current.getBoundingClientRect().height
            : 0
        }
        width={
          containerRef.current
            ? containerRef.current.getBoundingClientRect().width
            : 0
        }
      />
    </div>
  );
};
