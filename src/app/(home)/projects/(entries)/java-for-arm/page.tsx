import { DashboardLink, Tag } from "@/components";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TagList } from "../_components/tag-list";
import { Compiler } from "./_components/compiler";

export const metadata: Metadata = {
  title: "Nicholas Dullam - Java for ARM",
  description: "A from-scratch compiler for a subset of Java for ARM",
};

type PageProps = {};

export default function Page({}: PageProps) {
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
        <TagList>
          <Tag>C</Tag>
          <Tag>C++</Tag>
          <Tag>Lex</Tag>
          <Tag>Yacc</Tag>
        </TagList>
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
        <Compiler />
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
