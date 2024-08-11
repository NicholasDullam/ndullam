"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type TagListProps = {
  children: ReactNode;
};

export const TagList = ({ children }: TagListProps) => {
  const [scrollable, setScrollable] = useState<boolean>(false);
  const [scrollDistance, setScrollDistance] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    if (!containerRef.current) return;
    setScrollDistance(containerRef.current.scrollLeft);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const contentRect = containerRef.current.getBoundingClientRect();
    setScrollable(contentRect.width < containerRef.current.scrollWidth);
  }, []);

  const hasScrolled = useMemo(() => scrollDistance > 0, [scrollDistance]);
  const scrolledToEnd = useMemo(() => {
    if (!containerRef.current) return false;
    const contentRect = containerRef.current.getBoundingClientRect();
    return (
      scrollDistance + contentRect.width >= containerRef.current.scrollWidth
    );
  }, [scrollDistance]);

  return (
    <div
      data-scrollable={scrollable}
      data-scrolled={hasScrolled}
      data-scrolled-to-end={scrolledToEnd}
      className="group relative"
    >
      <div className="absolute top-0 left-0 w-5 h-full bg-gradient-to-r from-black to-transparent opacity-0 pointer-events-none group-data-[scrolled=true]:opacity-100" />
      <div className="absolute top-0 right-0 w-5 h-full bg-gradient-to-l from-black to-transparent opacity-0 pointer-events-none group-data-[scrollable=true]:opacity-100 group-data-[scrollable=true]:group-data-[scrolled-to-end=true]:opacity-0 transition-all" />
      <div
        className="w-full overflow-x-auto flex items-center gap-2"
        ref={containerRef}
        onScroll={onScroll}
      >
        {children}
      </div>
    </div>
  );
};
