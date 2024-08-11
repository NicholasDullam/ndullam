"use client";

import { LoadingIcon } from "@/components";
import { highlight, languages } from "prismjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsPlay } from "react-icons/bs";
import Editor from "react-simple-code-editor";

import "prismjs/components/prism-armasm";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-java";
import "prismjs/themes/prism-twilight.css";

const SAMPLE_CODE = `class Testing {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}` as const;

export type CompilerProps = {};

export const Compiler = ({}: CompilerProps) => {
  const [code, setCode] = useState<string>(SAMPLE_CODE);
  const [output, setOutput] = useState<string>();
  const [responseTime, setResponseTime] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const dimensions = contentRef.current.getBoundingClientRect();
    setHeight(dimensions.height);
  }, [output]);

  const onTriggerRun = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();

      setOutput(data.response);
      setResponseTime(`${data.time}ms`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="relative">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) => highlight(code, languages.java, "java")}
        padding={12}
        tabSize={4}
        className="p-0 border border-zinc-800 rounded-md mt-5 bg-black hover:outline-none shadow-none text-xs"
      />
      <div
        style={{ height: height + 18 }}
        className="relative z[-1] bg-black w-full border border-zinc-800 rounded-b-md p-2 pt-2 -mt-1 outline-none transition-all overflow-hidden"
      >
        <div ref={contentRef}>
          <div className="flex items-center">
            <span className="text-xs opacity-50">Output</span>
            <div className="ml-auto">
              {loading ? <LoadingIcon size={3} /> : responseTime}
            </div>
          </div>
          <div
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: highlight(
                output?.trimEnd() ?? "",
                languages.armasm,
                "armasm"
              ),
            }}
          ></div>
        </div>
      </div>
      <button
        onClick={onTriggerRun}
        className="absolute top-2 right-3 flex items-center gap-1 text-xs"
      >
        <BsPlay /> Run
      </button>
    </div>
  );
};
