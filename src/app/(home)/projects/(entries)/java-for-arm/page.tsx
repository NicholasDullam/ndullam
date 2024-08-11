"use client";

import { DashboardLink, LoadingIcon, Tag } from "@/components";
import Image from "next/image";
import Link from "next/link";
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

type PageProps = {};

export default function Page({}: PageProps) {
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
    <div>
      <div className="w-full h-[200px] relative">
        <Image
          fill
          alt="sustainably"
          src={"/assets/images/java-arm-1.png"}
          className="object-cover"
        />
      </div>
      <div className="p-8 pt-0 prose prose-invert prose-sm">
        <div className="my-5 flex items-center gap-4">
          <h1 className="mb-0"> Java for ARM </h1>
          <Link
            href="https://github.com/NicholasDullam/arm_java"
            target="_blank"
            className="ml-auto no-underline"
          >
            <DashboardLink name="GitHub" />
          </Link>
        </div>
        <div className="flex overflow-x-scroll">
          <Tag>C</Tag>
          <Tag>Lex</Tag>
          <Tag>Yacc</Tag>
        </div>
        <blockquote>
          A from-scratch compiler built to support a subset of Java for ARM.
        </blockquote>
        <h4> Description </h4>
        <p>
          As a project from CS 352, I was tasked to create a from-scratch
          compiler levying variants of top-down and bottom-up parsing for syntax
          recognition and error handling, construction of an abstract syntax
          tree with compile-time typechecking, and lastly, code generation for
          ARM assembly.
        </p>
        <h4> Subset </h4>
        <p>
          As noted prior, my compiler only supports a specified subset of modern
          Java. The extended BNF grammar rules can be found at the link below.
        </p>
        <Link
          href={"/assets/documents/java-subset.txt"}
          target="_blank"
          className="flex no-underline"
        >
          <DashboardLink name="Grammar" />
        </Link>
        <h4> Creating a Compiler </h4>
        <p>
          While the general approach to building a compiler follows the steps of
          syntax, typechecking, codegen, and optimization, I took a few
          different with each step. Syntax-checking came in the form of first,
          top-down parsing with just Lex, followed by an implementation of
          bottom-up parsing with the use of Lex and Yacc. This approach was
          taken to get an underlying understanding of parsing before using a
          tool like Yacc. Next, with typechecking, I incorporated grammar
          semantics with my previously defined grammar, building an abstract
          syntax tree (AST) that supporting scope and symbol table entries.
          Finally, for the timebeing, came code generation, where I took a
          two-step approach of using 3AC instructions in the first pass of the
          AST, finally parsing to ARM assembly with the allocation of stack
          offsets and registers. Currently, I'm focusing on scalability of code
          generation with changes in instruction sets, alongside register and
          stack optimizations.
        </p>
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
        <h4> Key Takeaways </h4>
        <p>
          This easily became one of my proudest projects I've worked on. Rather
          than taking an abstracted view of processes behind modern languages,
          the project used low-level approaches to solve to the problems at hand
          -- further reenforcing my interest in gathering a deeper understanding
          of existing problems and their solutions.
        </p>
      </div>
    </div>
  );
}
