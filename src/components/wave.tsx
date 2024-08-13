"use client";

import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { z } from "zod";

type Neighbors = [boolean, boolean, boolean, boolean];

type Pixel = number;
type PixelGrid = Pixel[][];

export const wavePropsSchema = z.object({
  scale: z.coerce.number().int().positive().max(100).default(10),
  interval: z.coerce.number().int().positive().default(50),
  spread: z
    .tuple([
      z.coerce.number().min(0).max(1),
      z.coerce.number().min(0).max(1),
      z.coerce.number().min(0).max(1),
      z.coerce.number().min(0).max(1),
    ])
    .default([0.1, 0.4, 0.1, 0.9]),
});

export type WavePropsSchema = z.infer<typeof wavePropsSchema>;

export type WaveProps = WavePropsSchema & {
  containerRef: RefObject<HTMLDivElement>;
};

export const Wave = ({
  containerRef,
  spread: _spread,
  interval: _interval,
  scale: _scale,
}: WaveProps) => {
  const { scale, interval, spread } = useMemo(
    () =>
      wavePropsSchema.parse({
        spread: _spread,
        interval: _interval,
        scale: _scale,
      }),
    [_spread, _interval, _scale]
  );

  const [pixels, setPixels] = useState<PixelGrid>([]);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [xUnits, setXUnits] = useState<number>(0);
  const [yUnits, setYUnits] = useState<number>(0);

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
  }, [scale]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const initialize = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, width, height);
    const temp = new Array(yUnits).fill(0);
    temp.forEach((_, i) => (temp[i] = new Array(xUnits).fill(0)));
    if (xUnits > 0 && yUnits > 0) temp[0][0] = 1;
    setPixels(temp);
  }, [width, height, scale, xUnits, yUnits]);

  const draw = useCallback(
    (pixels: PixelGrid) => {
      const context = canvasRef.current?.getContext("2d");
      if (!context) return;
      context.clearRect(0, 0, width, height);
      pixels.forEach((row, i) => {
        row.forEach((_, j) => {
          if (pixels[i][j] <= 0) return;
          context.fillStyle = `rgba(255,255,255, ${1 - pixels[i][j] / 20})`;
          context.fillRect((j + 1) * scale, (i + 1) * scale, 1, 1);
        });
      });
    },
    [width, height, scale]
  );

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

  const generateFrame = useCallback(() => {
    if (!pixelsRef.current) return;
    const _pixels = [...pixelsRef.current.map((row) => [...row])];
    pixelsRef.current.forEach((row, i) => {
      row.forEach((_, j) => {
        if (pixelsRef.current[i][j] > 20) _pixels[i][j] = 0;
        else if (pixelsRef.current[i][j] == 0) return;
        else _pixels[i][j] += 1;

        const rand = Math.random();
        const [hasNorth, hasEast, hasSouth, hasWest] = getNeighbors(
          pixelsRef.current,
          i,
          j
        );

        if (!hasNorth && rand < spread[0] && i > 0) _pixels[i - 1][j] = 1;
        if (!hasEast && rand < spread[1] && j < row.length - 1)
          _pixels[i][j + 1] = 1;
        if (!hasSouth && rand < spread[2] && i < pixelsRef.current.length - 1)
          _pixels[i + 1][j] = 1;
        if (!hasWest && rand < spread[3] && j > 0) _pixels[i][j - 1] = 1;
      });
    });

    setPixels(_pixels);
  }, [getNeighbors, spread]);

  useEffect(() => {
    initialize();
    const id = setInterval(generateFrame, interval);
    return () => clearInterval(id);
  }, [interval, initialize, generateFrame]);

  useEffect(() => {
    draw(pixels);
  }, [draw, pixels]);

  return <canvas ref={canvasRef} />;
};
