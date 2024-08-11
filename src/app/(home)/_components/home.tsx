"use client";

import { useRef } from "react";
import { Wave } from "../../../components";
import { Footer } from "./footer";
import { WaveDropdown } from "./wave-dropdown";

export type HomeProps = {};

export const Home = ({}: HomeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="h-dvh overflow-hidden bg-black flex flex-col">
      <div className="fixed top-2 right-2">
        <WaveDropdown />
      </div>
      <div className="grow" ref={containerRef}>
        <Wave containerRef={containerRef} />
      </div>
      <Footer />
    </div>
  );
};
