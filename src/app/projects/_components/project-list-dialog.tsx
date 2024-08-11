"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectListItem } from "./project-list-item";

const TRANSITION_DURATION = 300 as const;

export type ProjectListDialogProps = {};

export const ProjectListDialog = ({}: ProjectListDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setOpen(true);
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);

  const onResize = useCallback(() => {
    setHeight(window.innerHeight / 3);
  }, []);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const router = useRouter();

  const onClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => router.push("/"), TRANSITION_DURATION);
  }, [router]);

  return (
    <>
      <div
        onClick={onClose}
        className={clsx(
          `h-full w-full bg-black opacity-50 fixed z-20 top-0 left-0 transition-all duration-[${TRANSITION_DURATION}]`,
          {
            "pointer-events-none opacity-0": !open,
          }
        )}
      />
      <div
        className={clsx(
          "fixed z-50 overflow-hidden right-0 top-0 h-full w-[400px] max-w-full bg-black transform transition-all",
          {
            "translate-x-full": !open,
          }
        )}
      >
        <div
          ref={contentRef}
          className="snap-y scroll-smooth overflow-y-auto h-full w-full"
        >
          <ProjectListItem name="Project 1" description="test" height={height} active />
        </div>
      </div>
    </>
  );
};
