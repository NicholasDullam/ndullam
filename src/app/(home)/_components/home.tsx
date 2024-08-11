"use client";

import { useRef } from "react";
import { Wave } from "../../../components";
import { Footer } from "./footer";

export type HomeProps = {};

export const Home = ({}: HomeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="h-dvh overflow-hidden bg-black flex flex-col">
      <div className="grow" ref={containerRef}>
        <Wave containerRef={containerRef} />
      </div>
      <Footer />
    </div>
  );
};
