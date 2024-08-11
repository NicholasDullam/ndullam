"use client";

import { useRef } from "react";
import { Wave } from "../../components";

export type HomeProps = {};

export const Home = ({}: HomeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="h-dvh w-full bg-black" ref={containerRef}>
      <Wave containerRef={containerRef} />
    </div>
  );
};
