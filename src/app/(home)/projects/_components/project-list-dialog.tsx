"use client";

import { Button } from "@/components/ui";
import { ArrowDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ProjectListItem } from "./project-list-item";

export const TRANSITION_DURATION = 150 as const;

type Project = Omit<Parameters<typeof ProjectListItem>[0], "height">;

const PROJECTS = [
  {
    name: "Sustainably",
    path: "/projects/sustainably",
    description:
      "A wellness-driven startup with an aim to help those on their fitness journey.",
    src: "/assets/images/sustainably-1.png",
  },
  {
    name: "Java for ARM",
    path: "/projects/java-for-arm",
    description: "A from-scratch compiler for a subset of Java for ARM.",
    src: "/assets/images/java-arm-1.png",
  },
  {
    name: "Sociable",
    path: "/projects/sociable",
    description:
      "A platform for students to explore what's active on their campus.",
    src: "/assets/images/sociable-1.jpg",
  },
  {
    name: "Traffic Deep RL",
    path: "/projects/traffic-deep-rl",
    description: "A project aimed at optimizing traffic-light patterns.",
    src: "/assets/images/traffic-rl-1.png",
  },
  {
    name: "Traveling Merchant",
    path: "/projects/traveling-merchant",
    description: "A hub for any sales gone virtual.",
    src: "/assets/images/traveling-merchant-2.png",
  },
  {
    name: "ZooKeep",
    path: "/projects/zookeep",
    description:
      "An experimental project, seeking to test the integrations of information systems.",
    src: "/assets/images/zookeep-1.jpeg",
  },
  {
    name: "Loan Default Prediction",
    path: "/projects/loan-default-prediction",
    description: "An ML investigation on the defaulting of loans.",
    src: "/assets/images/loan-default-1.png",
  },
  {
    name: "Communicode",
    path: "/projects/communicode",
    description:
      "A startup with an aim of connecting developers with non-profits.",
    src: "/assets/images/communicode-1.jpeg",
  },
] as const satisfies Project[];

export type ProjectListDialogProps = {};

export const ProjectListDialog = ({}: ProjectListDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const onResize = useCallback(() => {
    setHeight(window.innerHeight / 3);
  }, []);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  const router = useRouter();

  const onClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => router.push("/"), TRANSITION_DURATION);
  }, [router]);

  const onScroll = useCallback(() => {
    if (!contentRef) return;
    const contentRect = contentRef.getBoundingClientRect();
    setHasMore(
      contentRef.scrollTop + contentRect.height < contentRef.scrollHeight,
    );
  }, [contentRef]);

  useEffect(() => {
    const _content = contentRef;
    if (!_content) return;
    onScroll();
    _content.addEventListener("scroll", onScroll);
    return () => _content.removeEventListener("scroll", onScroll);
  }, [contentRef, onScroll]);

  return (
    <>
      <div
        onClick={onClose}
        data-state={open ? "open" : "closed"}
        style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        className="h-full w-full bg-black fixed z-20 top-0 left-0 transition-all opacity-0 data-[state=closed]:pointer-events-none data-[state=open]:opacity-30"
      />
      <div
        data-state={open ? "open" : "closed"}
        style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        className="fixed z-50 overflow-hidden right-0 top-0 h-full w-[650px] max-w-full bg-black transform transition-all data-[state=closed]:translate-x-full"
      >
        <Button
          variant={"outline"}
          className="fixed top-2 left-2 p-1.5 h-auto z-[100]"
          onClick={onClose}
        >
          <X size={12} />
        </Button>
        <Button
          variant={"outline"}
          data-has-more={hasMore ? "true" : "false"}
          className="fixed bottom-0 right-2 p-1.5 h-auto z-[100] text-xs flex items-center gap-1 transition-all data-[has-more=true]:bottom-2 data-[has-more=false]:translate-y-full"
        >
          <ArrowDown size={12} />
          <span>More Below</span>
        </Button>
        <div
          ref={setContentRef}
          className="snap-y scroll-smooth overflow-y-auto h-full w-full"
        >
          {PROJECTS.map((project) => (
            <ProjectListItem key={project.path} {...project} height={height} />
          ))}
        </div>
      </div>
    </>
  );
};
