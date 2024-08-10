"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";

type Neighbors = [boolean, boolean, boolean, boolean];

type Pixel = number;
type PixelGrid = Pixel[][];

export type WaveProps = {
  scale: number;
  interval: number;
  spread: [number, number, number, number];
  containerRef: RefObject<HTMLDivElement>;
};

export const Wave = ({
  containerRef,
  scale = 10,
  interval = 50,
  spread = [0.1, 0.4, 0.1, 0.9],
}: WaveProps) => {
  const [pixels, setPixels] = useState<PixelGrid>([]);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const [xUnits, setXUnits] = useState(Math.ceil(window.innerWidth / scale));
  const [yUnits, setYUnits] = useState(Math.ceil(window.innerHeight / scale));

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<typeof pixels>(pixels);

  useEffect(() => {
    pixelsRef.current = pixels;
  }, [pixels]);

  const handleResize = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const box = containerRef.current.getBoundingClientRect();

    canvasRef.current.width = box.width;
    canvasRef.current.height = box.height;

    setWidth(box.width);
    setHeight(box.height);

    setXUnits(Math.ceil(box.width / scale));
    setYUnits(Math.ceil(box.height / scale));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const initialize = useCallback(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#FFFFFF";
    context.fillRect(scale, scale, 1, 1);
    const temp = new Array(yUnits).fill(0);
    temp.forEach((_, i) => (temp[i] = new Array(xUnits).fill(0)));
    temp[0][0] = 1;
    setPixels(temp);
  }, [width, height, scale, xUnits, yUnits]);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    context?.clearRect(0, 0, width, height);
    pixels?.forEach((row, i) => {
      row.forEach((_, j) => {
        if (pixels[i][j] <= 0 || !context) return;
        context.fillStyle = `rgba(255,255,255, ${1 - pixels[i][j] / 20})`;
        context.fillRect((j + 1) * scale, (i + 1) * scale, 1, 1);
      });
    });
  }, [width, height, scale, pixels]);

  const generateFrame = useCallback(() => {
    const _pixels = [...pixelsRef.current];
    pixelsRef.current.forEach((row, i) => {
      row.forEach((_, j) => {
        if (pixelsRef.current[i][j] > 20) pixelsRef.current[i][j] = 0;
        else if (pixelsRef.current[i][j] == 0) return;
        else pixelsRef.current[i][j] += 1;

        const neighbors = getNeighbors(pixelsRef.current, i, j);
        neighbors.forEach((isNeighbor, i) => {
          switch (i) {
            case 0:
              if (isNeighbor && Math.random() < spread[0] && i > 0)
                _pixels[i - 1][j] = 1;
              break;
            case 1:
              if (
                isNeighbor &&
                Math.random() < spread[1] &&
                j < pixels[i].length - 1
              )
                _pixels[i][j + 1] = 1;
              break;
            case 2:
              if (
                isNeighbor &&
                Math.random() < spread[2] &&
                i < pixels.length - 1
              )
                _pixels[i + 1][j] = 1;
              break;
            case 3:
              if (isNeighbor && Math.random() < spread[3] && j > 0)
                _pixels[i][j - 1] = 1;
              break;
          }
        });
      });
    });

    setPixels(_pixels);
  }, []);

  useEffect(() => {
    initialize();
    const id = setInterval(generateFrame, interval);
    return () => clearInterval(id);
  }, [draw, interval, initialize, generateFrame]);

  const getNeighbors = useCallback(
    (pixels: PixelGrid, i: number, j: number) => {
      const neighbors: Neighbors = [false, false, false, false];
      if (i > 0 && pixels[i - 1][j]) neighbors[0] = true; // north
      if (j < pixels[i].length - 1 && pixels[i][j + 1]) neighbors[1] = true; // east
      if (i < pixels.length - 1 && pixels[i + 1][j]) neighbors[2] = true; // south
      if (j > 0 && pixels[i][j - 1]) neighbors[3] = true; // west
      return neighbors;
    },
    []
  );

  useEffect(() => {
    draw();
  }, [draw]);

  return <canvas ref={canvasRef} />;
};
