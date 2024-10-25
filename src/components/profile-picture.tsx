"use client";

import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";

const STATIC_COLORS = ["black", "red", "green", "blue"] as const;
type Color = (typeof STATIC_COLORS)[number];

type Coordinates = { x: number; y: number };

type ProfilePictureProps = {
  onSave?: (data: string) => void;
};

export const ProfilePicture = ({ onSave: _onSave }: ProfilePictureProps) => {
  const [color, setColor] = useState<Color>(STATIC_COLORS[0]);
  const [dirty, setDirty] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const prevCoordinatesRef = useRef<Coordinates>({ x: 0, y: 0 });
  const coordinatesRef = useRef<Coordinates>({ x: 0, y: 0 });

  const drawingRef = useRef(false);

  const initialFill = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context || !canvasRef.current) return;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  useEffect(() => {
    if (canvasRef.current) initialFill();
  }, [initialFill]);

  const draw = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.beginPath();
    context.moveTo(prevCoordinatesRef.current.x, prevCoordinatesRef.current.y);
    context.lineTo(coordinatesRef.current.x, coordinatesRef.current.y);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
  }, [color]);

  const getCoordinates = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      if (!canvasRef.current) return;
      prevCoordinatesRef.current = { ...coordinatesRef.current };
      const rect = canvasRef.current?.getBoundingClientRect();
      coordinatesRef.current.x = event.clientX - rect.left;
      coordinatesRef.current.y = event.clientY - rect.top;
    },
    [],
  );

  const onMouseDown = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      const context = canvasRef.current?.getContext("2d");
      if (!context) return;
      getCoordinates(event);
      drawingRef.current = true;
      context.beginPath();
      context.fillStyle = color;
      context.fillRect(
        coordinatesRef.current.x,
        coordinatesRef.current.y,
        2,
        2,
      );
      context.closePath();
      setDirty(true);
    },
    [getCoordinates, color],
  );

  const onMouseMove = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (event) => {
      if (!drawingRef.current) return;
      getCoordinates(event);
      draw();
    },
    [draw, getCoordinates],
  );

  const onSave = useCallback(() => {
    if (!canvasRef.current) return;
    _onSave?.(canvasRef.current.toDataURL());
    setDirty(false);
  }, [_onSave]);

  return (
    <div className="flex items-center flex-col justify-center">
      <p className="mb-5"> Draw your avatar </p>
      <div className="flex gap-3 items-center justify-center mb-2">
        <div className="flex flex-col items-center justify-center gap-2">
          {STATIC_COLORS.map((color) => {
            return (
              <button
                key={color}
                onClick={() => setColor(color)}
                className="h-5 w-5 border-2 border-white rounded-full transition-all duration-300"
              />
            );
          })}
        </div>
        <canvas
          ref={canvasRef}
          onMouseUp={() => (drawingRef.current = false)}
          onMouseOut={() => (drawingRef.current = false)}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          height={140}
          width={140}
          className="rounded-full mr-8"
        />
      </div>
      <div className="flex gap-3 items-center justify-center">
        <button
          disabled={!dirty}
          onClick={initialFill}
          className="mb-5 bg-white text-black rounded-lg px-3 py-2"
        >
          Clear
        </button>
        <Button variant="outline" disabled={!dirty} onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
