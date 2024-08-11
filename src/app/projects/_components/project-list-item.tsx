"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { hasTouch } from "../../../util/has-touch";

export type ProjectListItemProps = {
  name: string;
  height: number;
  active?: boolean;
  description?: string;
  src?: string;
  mobileHover?: boolean;
};

export const ProjectListItem = ({
  name,
  height,
  active,
  description,
  src,
  mobileHover,
}: ProjectListItemProps) => {
  const [contentHeight, setContentHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const touch = useMemo(() => hasTouch() && !mobileHover, [mobileHover]);

  const onMouseEnter = useCallback(() => {
    if (!contentRef.current || touch) return;
    const rect = contentRef.current.getBoundingClientRect();
    setContentHeight(rect.height);
  }, []);

  return (
    <div
      onMouseEnter={onMouseEnter}
      data-touch={touch}
      className="snap-center relative cursor-pointer border-b border-black group"
    >
      <div className="bg-black group-hover:data-[touch=false]:opacity-50 opacity-80 h-full w-full absolute transition-all" />
      {!!src && (
        <Image src={src} alt={name} className="object-cover w-full h-full" />
      )}
      <div
        ref={containerRef}
        className="absolute bottom-3 left-3 z-50 text-white overflow-hidden"
      >
        <p className="flex relative text-sm">
          <span>{name}</span>
          <FiArrowUpRight />
          <span className="border-b border0white h-[1px] absolute bottom-0 left-0 transition-all w-0 group-hover:data-[touch=false]:w-full" />
        </p>
        <div>
          <p
            ref={contentRef}
            style={{ height: contentHeight, maxHeight: height }}
            className={clsx({ "pt-3": !!description?.length })}
          ></p>
        </div>
      </div>
      {!!active && (
        <div className="absolute bottom-3 right-3 z-50 flex items-center gap-3 text-white transition-all">
          <p>Active</p>
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <div className="absolute top-0 left-0 h-3 w-3 rounded-full bg-green-400 animate-ping" />
          </div>
        </div>
      )}
    </div>
  );
};
