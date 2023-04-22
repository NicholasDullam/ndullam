import React from 'react'
import Communicode1 from '../images/communicode1.jpeg'
import { Social, Tag } from '../components'
import subset from '../images/java_subset.txt'
import javaarm1 from '../images/javaarm1.png'

const JavaARM = (props) => {
    return (
        <div>
            <img src={javaarm1} className="w-full h-[200px] object-cover"/>
            <div className="p-8 pt-3">
                <div className="my-5" style={{ display: 'flex', alignItems: 'center', overflowX: 'scroll'}}>
                    <h1 className="text-4xl font-bold mb-0"> Java for ARM </h1>
                    <div style={{ color: 'white', marginLeft: 'auto' }}>
                        <Social name="Request" link="mailto:npdullam@gmail.com"/>
                    </div>
                </div>                      
                <div className="flex mb-5 overflow-x-scroll">
                    <Tag>C</Tag>
                    <Tag>Lex</Tag>
                    <Tag>Yacc</Tag>
                </div>
                <h6 className="mt-5"> A from-scratch compiler built to support a subset of Java for ARM. </h6>
                <h3 className="text-xl font-bold mt-5 mb-2"> Description </h3>
                <p> As a project from CS 352, I was tasked to create a from-scratch compiler levying variants of top-down and bottom-up parsing for syntax recognition and error handling, construction of an abstract syntax tree with compile-time typechecking, and lastly, code generation for ARM assembly. </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Subset </h3>
                As noted prior, my compiler only supports a specified subset of modern Java. The extended BNF grammar rules can be found at the link below.
                <div style={{ color: 'white', marginTop: '20px', display: 'flex' }}>
                    <Social name="Link" link={subset}/>
                </div>
                <h3 className="text-xl font-bold mt-5 mb-2"> Creating a Compiler </h3>
                <p> While the general approach to building a compiler follows the steps of syntax, typechecking, codegen, and optimization, I took a few different with each step. Syntax-checking came in the form of first, top-down parsing with just Lex, followed by an implementation of bottom-up parsing with the use of Lex and Yacc. This approach was taken to get an underlying understanding of parsing before using a tool like Yacc. Next, with typechecking, I incorporated grammar semantics with my previously defined grammar, building an abstract syntax tree (AST) that supporting scope and symbol table entries. Finally, for the timebeing, came code generation, where I took a two-step approach of using 3AC instructions in the first pass of the AST, finally parsing to ARM assembly with the allocation of stack offsets and registers. Currently, I'm focusing on scalability of code generation with changes in instruction sets, alongside register and stack optimizations.  </p>
                <h3 className="text-xl font-bold mt-5 mb-2"> Key Takeaways </h3>
                <p> This easily became one of my proudest projects I've worked on. Rather than taking an abstracted view of processes behind modern languages, the project used low-level approaches to solve to the problems at hand -- further reenforcing my interest in gathering a deeper understanding of existing problems and their solutions. </p>
            </div>
        </div>
    )
}

export default JavaARM