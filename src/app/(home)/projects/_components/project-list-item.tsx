"use client";

import { hasTouch } from "@/lib/has-touch";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export type ProjectListItemProps = {
  name: string;
  height: number;
  path: string;
  active?: boolean;
  description?: string;
  src?: string;
  mobileHover?: boolean;
};

export const ProjectListItem = ({
  name,
  path,
  height,
  active,
  description,
  src,
  mobileHover,
}: ProjectListItemProps) => {
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [hovered, setHovered] = useState<boolean>(false);
  const [touch, setTouch] = useState<boolean>(false);

  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => setTouch(hasTouch() && !mobileHover), [mobileHover]);

  const onMouseEnter = useCallback(() => {
    if (!contentRef.current || touch) return;
    const rect = contentRef.current.getBoundingClientRect();
    setContentHeight(rect.height);
    setHovered(true);
  }, [touch]);

  return (
    <Link href={path}>
      <div
        onClick={() => router.push(path)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setHovered(false)}
        data-touch={touch}
        className="snap-center relative cursor-pointer border-b border-black group text-sm sm:text-xs"
        style={{ height }}
      >
        <div className="bg-black z-10 group-hover:group-data-[touch=false]:opacity-50 opacity-80 h-full w-full absolute transition-all" />
        {!!src && (
          <Image
            src={src}
            alt={name}
            className="object-cover w-full h-full"
            fill
          />
        )}
        <div
          ref={containerRef}
          className="absolute bottom-3 left-3 z-50 text-white overflow-hidden"
        >
          <p
            className={clsx("flex relative transition-all", {
              "group-hover:group-data-[touch=false]:mb-2 pb-[2px]": hovered,
            })}
          >
            <span>{name}</span>
            <FiArrowUpRight />
            <span className="border-b border-white h-[1px] absolute bottom-0 left-0 transition-all w-0 group-hover:group-data-[touch=false]:w-full" />
          </p>
          <div
            className="transition-all max-w-[200px]"
            style={{ height: hovered ? contentHeight : 0 }}
          >
            <p ref={contentRef}>{description}</p>
          </div>
        </div>
        {!!active && (
          <div className="absolute bottom-3 right-3 z-50 flex items-center gap-3 text-white transition-all">
            <p>Active</p>
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <div className="absolute top-0 left-0 h-2 w-2 rounded-full bg-green-400 animate-ping" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
