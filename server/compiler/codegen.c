#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "typecheck.h"
#include "codegen.h"
#include "node.h"

/*
    All general codegen functions
*/ 

struct InstructionEntry * instructionHead = NULL;
struct InstructionEntry * globalInstructionHead = NULL;
int tempCount = 0;
int literalCount = 0;
int ifCount = 0;
int loopCount = 0;
int offset = 0;
struct ScopeEntry * prevScope = NULL;

// Generate the 3AC for the program, alongside post-processing and write to file
void genProgram(struct ASTNode * program, char * fileName) {
    struct ASTNode * class = program -> children[0];

    // Handle codegen traversal of AST
    genMain(class);

    // Post-process the instruction tree
    genTraversal(NULL, instructionHead);

    // Push all instructions to .s file 
    genToFile(instructionHead -> instructions, instructionHead -> num_instructions, fileName);
}

// Generate the 3AC for the main class
void genMain(struct ASTNode * mainClass) {
    struct ASTNode * staticVarDeclList = mainClass -> children[0];
    struct ASTNode * staticMethodDeclList = mainClass -> children[1];
    struct ASTNode * statementList = mainClass -> children[2];

    // Create final coalesce instruction entry
    createInstructionScope(mainClass, head);
    
    // Handle static variable instructions and .text section
    createInstructionScope(staticVarDeclList, head);
    createInstructionScope(staticVarDeclList, head);
    globalInstructionHead = instructionHead;
    addToInstructionEntry(".section .data\n");
    addToInstructionEntry("printIntLn: .asciz \"%d\\n\"\n");
    addToInstructionEntry("printStringLn: .asciz \"%s\\n\"\n");
    addToInstructionEntry("printInt: .asciz \"%d\"\n");
    addToInstructionEntry("printString: .asciz \"%s\"\n");
    exitInstructionScope();
    genStaticVarDeclList(staticVarDeclList); 
    createInstructionScope(staticVarDeclList, head);
    addToInstructionEntry("\n");     
    addToInstructionEntry(".section .text\n");     
    addToInstructionEntry(".global main\n");     
    addToInstructionEntry(".balign 4\n\n");                            
    exitInstructionScope();
    exitInstructionScope();
    
    // Handle static method instructions
    genStaticMethodDeclList(staticMethodDeclList);                 

    // Handle main method instructions
    createInstructionScope(statementList, head);
    genMethodInit(statementList, "main");
    genStatementList(statementList);                                   
    genMethodEnd(statementList, "main");
    exitInstructionScope();
}

// Generate 3AC for full static variable declaration list
void genStaticVarDeclList(struct ASTNode * staticVarDeclList) {
    if (staticVarDeclList -> node_type != NODETYPE_NULLABLE) {
        genStaticVarDeclList(staticVarDeclList -> children[0]);
        struct ASTNode * varDecl = staticVarDeclList -> children[1] -> children[0];
        genStaticVarDecl(varDecl, varDecl, varDecl -> children[1]);
    }
}

// Generaate 3AC for full static method list
void genStaticMethodDeclList(struct ASTNode * staticMethodDeclList) {
    if (staticMethodDeclList -> node_type != NODETYPE_NULLABLE) {
        genStaticMethodDeclList(staticMethodDeclList -> children[0]);
        struct ASTNode * staticMethodDecl = staticMethodDeclList -> children[1];
        genStaticMethodDecl(staticMethodDecl);
    }
}

// Generate 3AC for full statement list
void genStatementList(struct ASTNode * statementList) {
    if (statementList -> node_type != NODETYPE_NULLABLE) {
        genStatementList(statementList -> children[0]);
        struct ASTNode * statement = statementList -> children[1];
        genStatement(statement);
    }
}

// Generate 3AC for statement trees
void genStatement(struct ASTNode * statement) {
    enum NodeType statementType = statement -> node_type;
    if (statementType == NODETYPE_STATEMENTLIST) {
        digScope(prevScope);
        genStatementList(statement -> children[0]);
        prevScope = head;
        exitScope();
    } else if (statementType == NODETYPE_REASSIGN) {
        struct ASTNode * leftValue = statement -> children[0];
        struct ASTNode * exp = statement -> children[1];

        createInstructionScope(statement, head);

        int numIndices = 0;
        if (leftValue -> node_type == NODETYPE_LEFTVALUEINDEX) {
            struct ASTNode * index = leftValue -> children[0];
            numIndices++;

            while (index -> node_type == NODETYPE_INDEXLIST) {
                index = index -> children[0];
                numIndices++;
            }
        }

        if (numIndices == 0) {
            // Incorporate the nested expression instructions into the current instruction scope
            genExp(exp);
            
            // Create the instruction for the variable declaration
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "str $t%d, %s\n", instructionHead -> children[0] -> temp_id, leftValue -> data.value.string_value);
            addToInstructionEntry(instruction);
        } else if (numIndices == 1) {
            struct ASTNode * index = leftValue -> children[0];
            struct ASTNode * indexExp = index -> children[0];

            genExp(exp);

            genExp(indexExp);

            // Create the instruction for the variable declaration
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "str $t%d, %s\n", instructionHead -> children[0] -> temp_id, leftValue -> data.value.string_value);
            addToInstructionEntry(instruction);
        } else if (numIndices == 2) {
            // to be handled
        }

        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> id = leftValue -> data.value.string_value;

        exitInstructionScope();
    } if (statementType == NODETYPE_VARDECL) { // if the assignemtn operation does not return an offset (as in, an offset to a temp variable), just store what is found in r0 rather than loading into r0
        genVarDecl(statement -> children[0], statement -> children[0], statement -> children[0] -> children[1]);
    } else if (statementType == NODETYPE_PRINT) {
        struct ASTNode * exp = statement -> children[0];
        createInstructionScope(statement, head);

        // Incorporate the nested expression instructions into the current instruction scope
        genExp(exp);

        // Change the global reference depending on the type of expression
        if (exp -> data.type == DATATYPE_INT) {
            addToInstructionEntry("ldr r0, =printInt\n");
        } else if (exp -> data.type == DATATYPE_STR) {
            addToInstructionEntry("ldr r0, =printString\n");
        }

        // Create an instruction to load the expr into the second register
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "ldr r1, $t%d\n", instructionHead -> children[0] -> temp_id);
        addToInstructionEntry(instruction);        
        
        // Create the branching instruction for the statement
        addToInstructionEntry("bl printf\n");

        instructionHead -> response_type = RESPONSETYPE_TEMP;

        exitInstructionScope();
    } else if (statementType == NODETYPE_PRINTLN) {
        struct ASTNode * exp = statement -> children[0];
        createInstructionScope(statement, head);
        
        // Incorporate the nested expression instructions into the current instruction scope
        genExp(exp);

        // Change the global reference depending on the type of expression
        if (exp -> data.type == DATATYPE_INT) {
            addToInstructionEntry("ldr r0, =printIntLn\n");
        } else if (exp -> data.type == DATATYPE_STR) {
            addToInstructionEntry("ldr r0, =printStringLn\n");
        }

        // Create an instruction to load the expr into the second register
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "ldr r1, $t%d\n", instructionHead -> children[0] -> temp_id);
        addToInstructionEntry(instruction);

        // Create the branching instruction for the statement
        addToInstructionEntry("bl printf\n");

        instructionHead -> response_type = RESPONSETYPE_TEMP;

        exitInstructionScope();
    } else if (statementType == NODETYPE_METHODCALL) {
        genMethodCall(statement -> children[0]);
    } else if (statementType == NODETYPE_RETURN) {
        createInstructionScope(statement, head);

        // Incorporate the nested expression instructions into the current instruction scope
        genExp(statement -> children[0]);
        
        struct ScopeEntry * methodScope = nearestMethodScope();

        // Create an instruction for loading the exp into the first register
        struct InstructionEntry * arg = instructionHead -> children[0];
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "ldr r0, $t%d\n", arg -> temp_id);
        addToInstructionEntry(instruction);

        sprintf(instruction, "b END%s\n", methodScope -> id);
        addToInstructionEntry(instruction);

        instructionHead -> response_type = RESPONSETYPE_TEMP;

        exitInstructionScope();
    } else if (statementType == NODETYPE_IFELSE) {
        int tempCount = ifCount;
        ifCount++;

        createInstructionScope(statement, head); // broader statement scope

        createInstructionScope(statement, head); // if config scope
        
        // Evaluate the expression before the if statement
        genExp(statement -> children[0]);
        struct InstructionEntry * expScope = instructionHead -> children[0];

        // Handle the expression comparisons
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "cmp $t%d, #0\n", expScope -> temp_id);
        addToInstructionEntry(instruction);
        
        // Branch if the statement is false
        sprintf(instruction, "beq IFFALSE_%d\n", tempCount);
        addToInstructionEntry(instruction);

        instructionHead -> response_type = RESPONSETYPE_TEMP;
        
        exitInstructionScope(); // exit if config scope
        
        // Dig to the relevant scope
        digScope(prevScope);
        
        // Evaluate the statement
        genStatement(statement -> children[1]);
        
        // Set the previous scope
        prevScope = head;

        // Leave scope
        exitScope();

        createInstructionScope(statement, head); // if ending config scope
        
        // Branch past the else statement at the end of the if
        sprintf(instruction, "b ENDIF_%d\n", tempCount);
        addToInstructionEntry(instruction);
        
        exitInstructionScope(); // exit if ending config scope

        createInstructionScope(statement, head); // else config scope
        
        // Create the false branch
        sprintf(instruction, "IFFALSE_%d:\n", tempCount);
        addToInstructionEntry(instruction);
        
        exitInstructionScope(); // exit else config scope
        
        // Dig to the relevant scope
        digScope(prevScope);

        // Evaluate the statement
        genStatement(statement -> children[2]);

        // Set the previous scope
        prevScope = head;

        // Leave the scope
        exitScope();
        
        createInstructionScope(statement, head); // else ending config scope
        
        // Create the end-if branch
        sprintf(instruction, "ENDIF_%d:\n", tempCount);
        addToInstructionEntry(instruction);
        
        exitInstructionScope(); // exit else ending config scope

        exitInstructionScope(); // exit broader statement scope    
    } else if (statementType == NODETYPE_WHILE) {
        int tempCount = loopCount;
        loopCount++;

        createInstructionScope(statement, head); // broader statement scope

        createInstructionScope(statement, head); // pre-expression config

        // Branch for the beginning of the loop
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "WLOOP_%d:\n", tempCount);
        addToInstructionEntry(instruction);

        exitInstructionScope(); // exit pre-expression config

        createInstructionScope(statement, head); // expression handling for branching

        // Evaluate the expression
        genExp(statement -> children[0]);
        struct InstructionEntry * expScope = instructionHead -> children[0];

        // Handle the expression value
        sprintf(instruction, "cmp $t%d, #0\n", expScope -> temp_id);
        addToInstructionEntry(instruction);
        
        // Add the branching instruction on false
        sprintf(instruction, "beq ENDWLOOP_%d\n", tempCount);
        addToInstructionEntry(instruction);

        instructionHead -> response_type = RESPONSETYPE_TEMP;

        exitInstructionScope();

        // Dig to the relevant scope
        digScope(prevScope);

        // Evaluate the statement
        genStatement(statement -> children[1]);

        // Set the previous scope
        prevScope = head;

        // Exit the relevant scope
        exitScope();

        createInstructionScope(statement, head); // ending loop config

        // Auto-branch at the end of the loop to the beginning
        sprintf(instruction, "b WLOOP_%d\n", tempCount);
        addToInstructionEntry(instruction);

        // Branch for the end of the loop
        sprintf(instruction, "ENDWLOOP_%d:\n", tempCount);
        addToInstructionEntry(instruction);

        exitInstructionScope(); // exit ending loop config

        exitInstructionScope(); // exit broader statement scope
    }
}

// Generate 3AC for static method declarations
void genStaticMethodDecl(struct ASTNode * staticMethodDecl) {
    createInstructionScope(staticMethodDecl, head); // method instruction scope
    genMethodInit(staticMethodDecl, staticMethodDecl -> data.value.string_value);
    genStatementList(staticMethodDecl -> children[2]);
    genMethodEnd(staticMethodDecl, staticMethodDecl -> data.value.string_value);
    exitInstructionScope(); // exit method instruction scope
}

// Generate 3AC for static variable declarations
void genStaticVarDecl(struct ASTNode * varDecl, struct ASTNode * expList, struct ASTNode * expDecl) {
    createInstructionScope(varDecl, head);

    // Change the symbol table entry to record global variables
    struct SymbolTableEntry * found = searchGlobalScope(expList -> data.value.string_value);
    found -> var_type = VARTYPE_GLOBAL;
    if (expDecl -> node_type == NODETYPE_NULLABLE) {
        found -> data_type = DATATYPE_UNDEFINED;
        addToInstructionEntry(expList -> data.value.string_value);
        addToInstructionEntry(": ");
        addToInstructionEntry(".skip 4");
        addToInstructionEntry("\n");
    } else {
        // Work-around for the time-being
        struct ASTNode * exp = expDecl -> children[0];
        struct ASTNode * term = exp -> children[0];
        struct ASTNode * factor = term -> children[0];

        if (factor -> data.type == DATATYPE_INT) {
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "%d", factor -> data.value.int_value);
            addToInstructionEntry(expList -> data.value.string_value);
            addToInstructionEntry(": ");
            addToInstructionEntry(".word ");
            addToInstructionEntry(instruction);
            addToInstructionEntry("\n");
        } else if (factor -> data.type == DATATYPE_STR) {
            addToInstructionEntry(expList -> data.value.string_value);
            addToInstructionEntry(": ");
            addToInstructionEntry(".asciz ");
            addToInstructionEntry(factor -> data.value.string_value);
            addToInstructionEntry("\n");
        } 
    }
    
    exitInstructionScope();

    struct ASTNode * nextList = expList;
    enum NodeType expListType = nextList -> node_type;

    if (expListType == NODETYPE_VARDECL) {
        nextList = nextList -> children[2];
        expListType = nextList -> node_type;
        while (expListType != NODETYPE_NULLABLE) {
            expDecl = nextList -> children[0];
            genStaticVarDecl(varDecl, nextList, expDecl);
            nextList = nextList -> children[1];
            expListType = nextList -> node_type;
        }
    }
}

// Generate 3AC for variable declarations
void genVarDecl(struct ASTNode * varDecl, struct ASTNode * expList, struct ASTNode * expDecl) {
    if (expDecl -> node_type != NODETYPE_NULLABLE) {
        createInstructionScope(varDecl, head);
        
        // Work-around for the time-being
        struct ASTNode * exp = expDecl -> children[0];
        struct ASTNode * term = exp -> children[0];
        struct ASTNode * factor = term -> children[0];

        genExp(exp);

        // Change the symbol table entry to record global variables
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "str $t%d, %s\n", tempCount, varDecl -> data.value.string_value);
        addToInstructionEntry(instruction);

        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> id = expList -> data.value.string_value;
        
        exitInstructionScope();
    }

    struct ASTNode * nextList = expList;
    enum NodeType expListType = nextList -> node_type;

    if (expListType == NODETYPE_VARDECL) {
        nextList = nextList -> children[2];
        expListType = nextList -> node_type;
        while (expListType != NODETYPE_NULLABLE) {
            expDecl = nextList -> children[0];
            genVarDecl(varDecl, nextList, expDecl);
            nextList = nextList -> children[1];
            expListType = nextList -> node_type;
        }
    }
}

// Generate 3AC for method calls
void genMethodCall(struct ASTNode * methodCall) {
    enum NodeType methodCallType = methodCall -> node_type;
    if (methodCallType == NODETYPE_METHODCALL) {
        createInstructionScope(methodCall, head);
        struct SymbolTableEntry * found = searchGlobalScope(methodCall -> data.value.string_value);
        struct ASTNode * expList = methodCall -> children[0];
        struct ASTNode * exp = expList -> children[0];
        struct ASTNode * expTail = expList -> children[1];

        // Create the instructions for all argument expressions
        if (found -> num_args > 0) {
            while (exp) {
                genExp(exp);
                exp = expTail -> children[0];
                if (exp) expTail = expTail -> children[1];                
            }
        }

        // Create the instruction for loading the argument registers
        for (int i = 0; i < instructionHead -> num_children; i++) {
            struct InstructionEntry * arg = instructionHead -> children[i];
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "ldr r%d, $t%d\n", i, arg -> temp_id);
            addToInstructionEntry(instruction);
        }

        // Create the instruction for branching terms
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "bl %s\n", methodCall -> data.value.string_value);
        addToInstructionEntry(instruction);
        
        // Create the instruction for loading r0 into a temp variable
        sprintf(instruction, "str r0, $t%d\n", tempCount);
        addToInstructionEntry(instruction);

        // Set the return symbolic register
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();
    } else if (methodCallType == NODETYPE_PARSEINT) {
        createInstructionScope(methodCall, head);

        // Generate for the given expression
        genExp(methodCall -> children[0]);

        // Load the variable into register from expression
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "ldr r0, $t%d\n", instructionHead -> children[0] -> temp_id);
        addToInstructionEntry(instruction);

        // Branch to parse int
        addToInstructionEntry("bl atoi\n");

        // Store the result in temp variable
        sprintf(instruction, "str r0, $t%d\n", tempCount);
        addToInstructionEntry(instruction);

        // Set the return symbolic register
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();
    }
}

// Generate 3AC for expression declaration
void genExpDecl(struct ASTNode * expDecl) {
    if (expDecl -> node_type != NODETYPE_NULLABLE) {
        genExp(expDecl -> children[0]);
    }
}

// Generate 3AC for expression tree
void genExp(struct ASTNode * exp) {
    enum NodeType expType = exp -> node_type;
    if (expType == NODETYPE_ADDOP) {
        struct ASTNode * nestedExp = exp -> children[0];
        struct ASTNode * term = exp -> children[1];
        createInstructionScope(exp, head);
        
        // Incorporate the nested expression instructions into the current instruction scope
        genExp(nestedExp);
        genTerm(term);
        
        if (exp -> data.type == DATATYPE_INT) {
            // Define the arguments of the child scopes
            int arg1 = instructionHead -> children[0] -> temp_id;
            int arg2 = instructionHead -> children[1] -> temp_id;

            // Create the instruction for the expression operation
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "add $t%d, $t%d, $t%d\n", tempCount, arg1, arg2);
            addToInstructionEntry(instruction);
            
            // Provide the metadata for later instruction parsing
            instructionHead -> response_type = RESPONSETYPE_TEMP;
            instructionHead -> temp_id = tempCount;
            instructionHead -> offset = offset;
            offset += 4;
            tempCount++;
        } else if (exp -> data.type == DATATYPE_STR) {
            // Define the arguments of the child scopes
            int arg1 = instructionHead -> children[0] -> temp_id;
            int arg2 = instructionHead -> children[1] -> temp_id;

            // Take the combined string length of the operands
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "ldr r0, $t%d\n", arg1);
            addToInstructionEntry(instruction);
            addToInstructionEntry("bl strlen\n");
            addToInstructionEntry("mov r1, r0\n");
            sprintf(instruction, "ldr r0, $t%d\n", arg2);
            addToInstructionEntry(instruction);
            addToInstructionEntry("bl strlen\n");
            addToInstructionEntry("add r0, r0, r1\nadd r0, r0, #1\n");

            // Allocate the memory for the resulting string
            addToInstructionEntry("bl malloc\n");
            sprintf(instruction, "str r0, $t%d\n", tempCount);
            addToInstructionEntry(instruction);   
            
            // Copy the contents of first string to malloced area      
            sprintf(instruction, "ldr r1, $t%d\n", arg1);
            addToInstructionEntry(instruction);    
            addToInstructionEntry("bl strcpy\n");  

            // Concat the strings
            sprintf(instruction, "ldr r0, $t%d\n", tempCount);
            addToInstructionEntry(instruction);
            sprintf(instruction, "ldr r1, $t%d\n", arg2);
            addToInstructionEntry(instruction);
            addToInstructionEntry("bl strcat\n");

            // Provide the metadata for later instruction parsing
            instructionHead -> response_type = RESPONSETYPE_TEMP;
            instructionHead -> temp_id = tempCount;
            instructionHead -> offset = offset;
            offset += 4;
            tempCount++;
        }

        exitInstructionScope();
    } else if (expType == NODETYPE_SUBOP) {
        struct ASTNode * nestedExp = exp -> children[0];
        struct ASTNode * term = exp -> children[1];
        createInstructionScope(exp, head);
        
        // Incorporate the nested expression instructions into the current instruction scope
        genExp(nestedExp);
        genTerm(term);
        
        // Define the arguments of the child scopes
        int arg1 = instructionHead -> children[0] -> temp_id;
        int arg2 = instructionHead -> children[1] -> temp_id;

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "sub $t%d, $t%d, $t%d\n", tempCount, arg1, arg2);
        addToInstructionEntry(instruction);
        
        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope(); 
    } else if (expType == NODETYPE_AND) {
        createInstructionScope(exp, head);

        // Generate first operand expression
        genExp(exp -> children[0]);

        // Generate second operand expression
        genExp(exp -> children[1]);

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "and $t%d, $t%d, $t%d\n", tempCount, instructionHead -> children[0] -> temp_id, instructionHead -> children[1] -> temp_id);
        addToInstructionEntry(instruction);

        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();
    } else if (expType == NODETYPE_OR) {
        createInstructionScope(exp, head);

        // Generate first operand expression
        genExp(exp -> children[0]);

        // Generate second operand expression
        genExp(exp -> children[1]);

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "orr $t%d, $t%d, $t%d\n", tempCount, instructionHead -> children[0] -> temp_id, instructionHead -> children[1] -> temp_id);
        addToInstructionEntry(instruction);

        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();
    } else if (expType == NODETYPE_COMPEQ) {
        createInstructionScope(exp, head);

        // Generate first operand expression
        genExp(exp -> children[0]);

        // Generate second operand expression
        genExp(exp -> children[1]);

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "mov $t%d, #0\n", tempCount);
        addToInstructionEntry(instruction);

        sprintf(instruction, "cmp $t%d, $t%d\n", instructionHead -> children[0] -> temp_id, instructionHead -> children[1] -> temp_id);
        addToInstructionEntry(instruction);

        sprintf(instruction, "moveq $t%d, #1\n", tempCount);
        addToInstructionEntry(instruction);

        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();    
    } else if (expType == NODETYPE_COMPNEQ) {
        createInstructionScope(exp, head);

        // Generate first operand expression
        genExp(exp -> children[0]);

        // Generate second operand expression
        genExp(exp -> children[1]);

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "mov $t%d, #0\n", tempCount);
        addToInstructionEntry(instruction);

        sprintf(instruction, "cmp $t%d, $t%d\n", instructionHead -> children[0] -> temp_id, instructionHead -> children[1] -> temp_id);
        addToInstructionEntry(instruction);

        sprintf(instruction, "movne $t%d, #1\n", tempCount);
        addToInstructionEntry(instruction);

        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();  
    } else if (expType == NODETYPE_COMPGREAT) {
        createInstructionScope(exp, head);

        // Generate first operand expression
        genExp(exp -> children[0]);

        // Generate second operand expression
        genExp(exp -> children[1]);

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "mov $t%d, #0\n", tempCount);
        addToInstructionEntry(instruction);

        sprintf(instruction, "cmp $t%d, $t%d\n", instructionHead -> children[0] -> temp_id, instructionHead -> children[1] -> temp_id);
        addToInstructionEntry(instruction);

        sprintf(instruction, "movgt $t%d, #1\n", tempCount);
        addToInstructionEntry(instruction);

        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();      
    } else if (expType == NODETYPE_COMPLESS) {
        createInstructionScope(exp, head);

        // Generate first operand expression
        genExp(exp -> children[0]);

        // Generate second operand expression
        genExp(exp -> children[1]);

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "mov $t%d, #0\n", tempCount);
        addToInstructionEntry(instruction);

        sprintf(instruction, "cmp $t%d, $t%d\n", instructionHead -> children[0] -> temp_id, instructionHead -> children[1] -> temp_id);
        addToInstructionEntry(instruction);

        sprintf(instruction, "movlt $t%d, #1\n", tempCount);
        addToInstructionEntry(instruction);

        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();      
    } else if (expType == NODETYPE_COMPGREQ) {
        createInstructionScope(exp, head);

        // Generate first operand expression
        genExp(exp -> children[0]);

        // Generate second operand expression
        genExp(exp -> children[1]);

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "mov $t%d, #0\n", tempCount);
        addToInstructionEntry(instruction);

        sprintf(instruction, "cmp $t%d, $t%d\n", instructionHead -> children[0] -> temp_id, instructionHead -> children[1] -> temp_id);
        addToInstructionEntry(instruction);

        sprintf(instruction, "movge $t%d, #1\n", tempCount);
        addToInstructionEntry(instruction);

        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();  
    } else if (expType == NODETYPE_COMPLEQ) {
        createInstructionScope(exp, head);

        // Generate first operand expression
        genExp(exp -> children[0]);

        // Generate second operand expression
        genExp(exp -> children[1]);

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "mov $t%d, #0\n", tempCount);
        addToInstructionEntry(instruction);

        sprintf(instruction, "cmp $t%d, $t%d\n", instructionHead -> children[0] -> temp_id, instructionHead -> children[1] -> temp_id);
        addToInstructionEntry(instruction);

        sprintf(instruction, "movle $t%d, #1\n", tempCount);
        addToInstructionEntry(instruction);

        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();  
    } else if (expType == NODETYPE_TERM) {
        genTerm(exp -> children[0]);
    }
}

void genTerm(struct ASTNode * term) {
    enum NodeType termType = term -> node_type;
    if (termType == NODETYPE_MULOP) {
        struct ASTNode * nestedTerm = term -> children[0];
        struct ASTNode * factor = term -> children[1];
        createInstructionScope(term, head);
        
        // Incorporate the nested expression instructions into the current instruction scope
        genTerm(nestedTerm);
        genFactor(factor);
        
        // Define the arguments of the child scopes
        int arg1 = instructionHead -> children[0] -> temp_id;
        int arg2 = instructionHead -> children[1] -> temp_id;

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "mul $t%d, $t%d, $t%d\n", tempCount, arg1, arg2);
        addToInstructionEntry(instruction);
        
        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope(); 
    } else if (termType == NODETYPE_DIVOP) {
        struct ASTNode * nestedTerm = term -> children[0];
        struct ASTNode * factor = term -> children[1];
        createInstructionScope(term, head);
        
        // Incorporate the nested expression instructions into the current instruction scope
        genTerm(nestedTerm);
        genFactor(factor);
        
        // Define the arguments of the child scopes
        int arg1 = instructionHead -> children[0] -> temp_id;
        int arg2 = instructionHead -> children[1] -> temp_id;

        // Create the instruction for the expression operation
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "sdiv $t%d, $t%d, $t%d\n", tempCount, arg1, arg2);
        addToInstructionEntry(instruction);
        
        // Provide the metadata for later instruction parsing
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope(); 
    } else if (termType == NODETYPE_FACTOR) {
        genFactor(term -> children[0]);
    }
}

// make sure to use the offsets stored in the node value as reference for varDecl, and method calls

void genFactor(struct ASTNode * factor) {
    enum NodeType factorType = factor -> node_type;
    if (factorType == NODETYPE_LITERAL) {
        createInstructionScope(factor, head);

        if (factor -> data.type == DATATYPE_STR) {
            char stringName[MAX_INSTRUCTION_SIZE];
            sprintf(stringName, "S_%d", literalCount);
            char * name = createInstruction(stringName);

            // Assign literals to globals
            struct InstructionEntry * tempHead = instructionHead;
            instructionHead = globalInstructionHead;
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "%s: .asciz %s\n", name,  factor -> data.value.string_value);
            addToInstructionEntry(instruction);  
            instructionHead = tempHead;

            // Provide metadata for later instruction parsing      
            instructionHead -> id = name;    
            instructionHead -> temp_id = tempCount;
            instructionHead -> response_type = RESPONSETYPE_GLOBAL; // since we're saving the literal to the .data section make reference global
            tempCount++;
            literalCount++;
        } else if (factor -> data.type == DATATYPE_INT) {
            // Create the instruction for temporary literal
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "ldr $t%d, #%d\n", tempCount, factor -> data.value.int_value);
            addToInstructionEntry(instruction);  

            // Provide metadata for later instruction parsing          
            instructionHead -> temp_id = tempCount;
            instructionHead -> response_type = RESPONSETYPE_LITERAL;
            tempCount++;
        } else if (factor -> data.type == DATATYPE_BOOLEAN) {
            // Create the instruction for temporary literal
            char instruction[MAX_INSTRUCTION_SIZE];
            if (factor -> data.value.boolean_value) sprintf(instruction, "ldr $t%d, #1\n", tempCount); // if the literal is true
            else sprintf(instruction, "ldr $t%d, #0\n", tempCount); // if the literal is false
            addToInstructionEntry(instruction);  

            // Provide metadata for later instruction parsing          
            instructionHead -> temp_id = tempCount;
            instructionHead -> response_type = RESPONSETYPE_LITERAL;
            tempCount++;
        }

        exitInstructionScope();
    } else if (factorType == NODETYPE_LEFTVALUE) {
        struct ASTNode * leftValue = factor -> children[0];
        if (leftValue -> node_type == NODETYPE_LEFTVALUE) {
            struct SymbolTableEntry * foundEntry = searchGlobalScope(leftValue -> data.value.string_value);
            createInstructionScope(factor, head);

            // Create the instruction for the temporary variable reference
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "mov $t%d, %s\n", tempCount, leftValue -> data.value.string_value); // replace with offsets assigned in local var prescreen
            addToInstructionEntry(instruction);   

            // Provide the metadata for later instruction parsing
            instructionHead -> temp_id = tempCount;
            instructionHead -> id = leftValue -> data.value.string_value;
            if (foundEntry -> var_type == VARTYPE_LOCAL || foundEntry -> var_type == VARTYPE_ARG) instructionHead -> response_type = RESPONSETYPE_LOCAL;
            else if (foundEntry -> var_type == VARTYPE_GLOBAL) instructionHead -> response_type = RESPONSETYPE_GLOBAL;
            tempCount++;

            exitInstructionScope();
        } else if (leftValue -> node_type == NODETYPE_LEFTVALUEINDEX) {
            struct ASTNode * index = leftValue -> children[0];
            struct SymbolTableEntry * foundEntry = searchGlobalScope(leftValue -> data.value.string_value);

            createInstructionScope(factor, head);
            
            genExp(index -> children[0]);

            // Create the instruction for the temporary variable reference
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "mov $t%d, %s\n", tempCount, leftValue -> data.value.string_value); // replace with offsets assigned in local var prescreen
            addToInstructionEntry(instruction);   

            // Provide the metadata for later instruction parsing
            instructionHead -> temp_id = tempCount;
            instructionHead -> id = leftValue -> data.value.string_value;
            instructionHead -> response_type = RESPONSETYPE_TEMP;
            instructionHead -> offset = offset;
            offset += 4;
            tempCount++;

            exitInstructionScope();
        }
    } else if (factorType == NODETYPE_LENGTH) {
        createInstructionScope(factor, head);

        struct ASTNode * leftValue = factor -> children[0];

        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "mov r0, %s\n", leftValue -> data.value.string_value); 
        addToInstructionEntry(instruction);  

        addToInstructionEntry("ldr r0, [r0]\n");    
        
        sprintf(instruction, "str r0, $t%d\n", tempCount); 
        addToInstructionEntry(instruction);    

        // Provide the metadata for later instruction parsing
        instructionHead -> temp_id = tempCount;
        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();
    } else if (factorType == NODETYPE_METHODCALL) {
        genMethodCall(factor -> children[0]);
    } else if (factorType == NODETYPE_PLUSOP) {
        createInstructionScope(factor, head);

        genFactor(factor -> children[0]);

        // Create the instruction for the temporary variable reference
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "ldr $t%d, +$%d\n", tempCount, instructionHead -> children[0] -> temp_id); // replace with offsets assigned in local var prescreen
        addToInstructionEntry(instruction);   

        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();
    } else if (factorType == NODETYPE_MINUSOP) {
        createInstructionScope(factor, head);

        genFactor(factor -> children[0]);

        // Create the instruction for the temporary variable reference
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "ldr $t%d, -$%d\n", tempCount, instructionHead -> children[0] -> temp_id); // replace with offsets assigned in local var prescreen
        addToInstructionEntry(instruction);   

        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();
    } else if (factorType == NODETYPE_NOT) {
        createInstructionScope(factor, head);

        // Generate the factor instructions
        genFactor(factor -> children[0]);

        // Create comparison instructions
        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "mvn $t%d, $t%d\n", tempCount, instructionHead -> children[0] -> temp_id);
        addToInstructionEntry(instruction);

        instructionHead -> response_type = RESPONSETYPE_TEMP;
        instructionHead -> temp_id = tempCount;
        instructionHead -> offset = offset;
        offset += 4;
        tempCount++;

        exitInstructionScope();
    } else if (factorType == NODETYPE_ARRAY) {
        createInstructionScope(factor, head);
        struct ASTNode * index = factor -> children[1];

        if (factor -> data.num_indices == 1) {
            struct ASTNode * exp = index -> children[0];

            // Evaluate index expression
            genExp(exp);

            // Load the expression value into register
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "ldr r0, $t%d\n", instructionHead -> children[0] -> temp_id);
            addToInstructionEntry(instruction);

            // Add additional entry for dynamic length and mult by 4 (left shift 2 bits)
            addToInstructionEntry("add r0, r0, #1\n");
            addToInstructionEntry("lsl r0, r0, #2\n");

            // Branch to malloc
            addToInstructionEntry("bl malloc\n");

            // Save base address to temp variable
            sprintf(instruction, "str r0, $t%d\n", tempCount);
            addToInstructionEntry(instruction);

            // Save the length of the array to the first index
            sprintf(instruction, "ldr r1, $t%d\n", instructionHead -> children[0] -> temp_id);
            addToInstructionEntry(instruction);
            addToInstructionEntry("str r1, [r0]\n");

            // Adjust instructionHead metadata
            instructionHead -> response_type = RESPONSETYPE_TEMP;
            instructionHead -> temp_id = tempCount;
            instructionHead -> offset = offset;
            offset += 4;
            tempCount++;
        } else if (factor -> data.num_indices == 2) {
            struct ASTNode * newIndex = index -> children[0]; 
            struct ASTNode * exp1 = newIndex -> children[0];
            struct ASTNode * exp2 = index -> children[1];

            createInstructionScope(newIndex, head);
            
            genExp(exp1);

            // Load the expression value into register
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "ldr r0, $t%d\n", instructionHead -> children[0] -> temp_id);
            addToInstructionEntry(instruction);

            // Add additional entry for dynamic length and mult by 4 (left shift 2 bits)
            addToInstructionEntry("add r0, r0, #1\n");
            addToInstructionEntry("lsl r0, r0, #2\n");

            // Branch to malloc
            addToInstructionEntry("bl malloc\n");

            // Save base address to temp variable
            sprintf(instruction, "str r0, $t%d\n", tempCount);
            addToInstructionEntry(instruction);

            // Save the length of the array to the first index
            sprintf(instruction, "ldr r1, $t%d\n", instructionHead -> children[0] -> temp_id);
            addToInstructionEntry(instruction);
            addToInstructionEntry("str r1, [r0]\n");

            int baseAddressTemp = tempCount;
            int baseAddressOffset = offset;

            // Adjust instructionHead metadata
            instructionHead -> response_type = RESPONSETYPE_LITERAL;
            instructionHead -> temp_id = tempCount;
            instructionHead -> offset = offset;
            offset += 4;
            tempCount++;

            exitInstructionScope();

            createInstructionScope(index, head);

            genExp(exp2);

            createInstructionScope(index, head);

            // Load base of array for loading the length
            sprintf(instruction, "ldr r0, $t%d\n", instructionHead -> parent -> children[0] -> temp_id);
            addToInstructionEntry(instruction);

            // Load the length from the register
            addToInstructionEntry("ldr r0, [r0]\n");

            // Store the length as a temp variable
            sprintf(instruction, "str r0, $t%d\n", tempCount);

            // Create loop label
            sprintf(instruction, "WLOOP_%d:\n", loopCount);
            addToInstructionEntry(instruction);

            // Load iterator from temp
            sprintf(instruction, "ldr r0, $t%d\n", tempCount);
            addToInstructionEntry(instruction);

            // Comp operator
            addToInstructionEntry("cmp r0, #1\n");

            // Branching instruction
            sprintf(instruction, "ble ENDWLOOP_%d\n", loopCount);
            addToInstructionEntry(instruction);

            // Subtract from the iterator
            addToInstructionEntry("sub r0, r0, #1\n");

            // Store new iterator
            sprintf(instruction, "str r0, $t%d\n", tempCount);
            addToInstructionEntry(instruction);

            instructionHead -> temp_id = tempCount;
            instructionHead -> offset = offset;
            instructionHead -> response_type = RESPONSETYPE_LITERAL;
            tempCount++;
            offset += 4;

            exitInstructionScope(); // exit the loop config scope

            // Load the length of the inner array
            sprintf(instruction, "ldr r0, $%d", instructionHead -> children[0] -> temp_id);
            addToInstructionEntry(instruction);

            // Add additional entry for dynamic length and mult by 4 (left shift 2 bits)
            addToInstructionEntry("add r0, r0, #1\n");
            addToInstructionEntry("lsl r0, r0, #2\n");

            // Branch to malloc
            addToInstructionEntry("bl malloc\n");

            // Save base address to temp variable
            sprintf(instruction, "str r0, $t%d\n", tempCount); // change this to a new temporary name
            addToInstructionEntry(instruction);

            // Save the length of the array to the first index
            sprintf(instruction, "ldr r1, $t%d\n", instructionHead -> children[0] -> temp_id);
            addToInstructionEntry(instruction);
            addToInstructionEntry("str r1, [r0]\n");

            // Save the base address of the embedded array to the parent index
            sprintf(instruction, "ldr r1, $t%d\n", instructionHead -> parent -> children[0] -> temp_id);
            addToInstructionEntry(instruction);
            addToInstructionEntry("ldr r2, [r0]\n"); // load the array length
            sprintf(instruction, "ldr r3, $t%d\n", instructionHead -> children[1] -> temp_id); // load the iterator
            addToInstructionEntry(instruction);
            addToInstructionEntry("sub r3, r2, r3\n");
            addToInstructionEntry("lsl r3, r3, #2\n");
            addToInstructionEntry("add r3, r3, r1\n"); // get the new offset
            addToInstructionEntry("str r0, [r1]\n"); // store the new malloc at the offset

            // Loop back to start
            sprintf(instruction, "b WLOOP%d\n", loopCount);
            addToInstructionEntry(instruction);

            // Ending loop branch
            sprintf(instruction, "ENDWLOOP_%d:\n", loopCount);
            addToInstructionEntry(instruction);

            // add literal metadata here
            instructionHead -> temp_id = tempCount;
            instructionHead -> offset = offset;
            instructionHead -> response_type = RESPONSETYPE_LITERAL;
            tempCount++;
            offset += 4;

            exitInstructionScope();

            // Adjust instructionHead metadata
            instructionHead -> response_type = RESPONSETYPE_TEMP;
            instructionHead -> temp_id = baseAddressTemp;
            instructionHead -> offset = baseAddressOffset;
        }

        exitInstructionScope();
    } else if (factorType == NODETYPE_EXP) {
        genExp(factor -> children[0]);
    } 
}

/*
    Final run-through and eval functions
*/

void genMethodInit(struct ASTNode * node, char * id) {
    struct ScopeEntry * methodScope = findMethodScope(id, head);
    char branch[strlen(id) + 3];
    sprintf(branch, "%s:\n", id);

    instructionHead -> response_type = RESPONSETYPE_METHOD;
    instructionHead -> id = id;

    createInstructionScope(node, methodScope); // create a config instruction scope
    addToInstructionEntry(branch);
    addToInstructionEntry("push {lr}\n"); 

    // Load arguments from the registers (for non-main methods)
    struct SymbolTableEntry * foundMethod = searchGlobalScope(id);
    if (strcmp(id, "main") != 0) {
        for (int i = 0; i < foundMethod -> num_args; i++) {
            // Search for the argumentw within the method and adjust the scope
            head = methodScope;
            struct SymbolTableEntry * foundArg = searchLocalScope(foundMethod -> args[i] -> id);
            foundArg -> offset = offset;
            offset += 4;

            // Create the instruction
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "str r0, %s\n", foundMethod -> args[i] -> id); // replace with offsets assigned in local var prescreen
            addToInstructionEntry(instruction);   
        }
    } else {
        head = methodScope;
        struct ArgEntry * arg = foundMethod -> args[0];
        struct SymbolTableEntry * foundArg = searchLocalScope(arg -> id);
        foundArg -> offset = offset;
        offset += 4;

        char instruction[MAX_INSTRUCTION_SIZE];
        sprintf(instruction, "str r1, %s\n", arg -> id); // replace with offsets assigned in local var prescreen
        addToInstructionEntry(instruction);   
    }

    head = methodScope -> children[0]; // navigate to the method local scope for symbol table context
    genLocalVars(head);
    exitInstructionScope(); // exit the config instruction scope
 }

void genMethodEnd(struct ASTNode * node, char * id) {
    createInstructionScope(node, NULL); // method ending config instruction scope
    char instruction[MAX_INSTRUCTION_SIZE];
    sprintf(instruction, "END%s:\n", id);
    addToInstructionEntry(instruction);

    sprintf(instruction, "pop {pc}\n\n");
    addToInstructionEntry(instruction);

    // Standardize the total offsets used for later use
    struct SymbolTableEntry * foundMethod = searchGlobalScope(id);
    foundMethod -> offset = offset;
    offset = 0;
    prevScope = NULL;

    exitInstructionScope(); // exit method ending config instruction scope
    exitInstructionScope(); // exit method instruction scope
    exitScope(); // exit local scope
    exitScope(); // exit method scope
}

// Apply offsets to local variables
void genLocalVars(struct ScopeEntry * scope) {
    if (scope == NULL) return;

    // Apply offset to all local variables
    for (int i = 0; i < scope -> num_entries; i++) {
        scope -> symbol_table[i] -> offset = offset;
        offset += 4;
    }
    
    // Check remaining scopes
    for (int i = 0; i < scope -> num_children; i++) {
        genLocalVars(scope -> children[i]);
    }
}

// Generate unoptimized ARM assembly from 3AC
void genTraversal(struct InstructionEntry * parent, struct InstructionEntry * curr) {
    for (int i = curr -> num_children - 1; i >= 0; i--) genTraversal(curr, curr -> children[i]);

    // If the scope is the root, just return
    if (parent == NULL) return;

    // Insert instructions to children as parent (inserting offset information for allocating stack variables)
    if (curr -> response_type == RESPONSETYPE_METHOD) {
        struct SymbolTableEntry * foundMethod = searchGlobalScope(curr -> id);
        struct InstructionEntry * config1 = curr -> children[0];
        struct InstructionEntry * config2 = curr -> children[curr -> num_children - 1];

        if (strcmp(curr -> id, "main") != 0) { // for all methods not main
            // Insert allocation after pushing return reference
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "sub sp, sp, #%d\n", foundMethod -> offset);
            insertInstruction(curr, createInstruction(instruction), 2);
            memset(instruction, 0, strlen(instruction));

            // Grab the arguments for the method from the registers
            for (int i = 0; i < foundMethod -> num_args; i++) {
                sprintf(instruction, "str r%d, [sp, #%d]\n", i, 4 * i);
                curr -> instructions[i + 3] = createInstruction(instruction);
                memset(instruction, 0, strlen(instruction));
            }

            // Insert deallocation at the last config
            sprintf(instruction, "add sp, sp, #%d\n", foundMethod -> offset);
            insertInstruction(curr, createInstruction(instruction), curr -> num_instructions - 1);
        } else { // for main method
            // Insert allocation after pushing return reference
            char instruction[MAX_INSTRUCTION_SIZE];
            sprintf(instruction, "sub sp, sp, #%d\n", foundMethod -> offset);
            insertInstruction(curr, createInstruction(instruction), 2);
            memset(instruction, 0, strlen(instruction));

            // Store the references to the argument count and the arguments head
            sprintf(instruction, "str r0, [r1]\nstr r1, [sp, #%d]\n", 0);
            curr -> instructions[3] = createInstruction(instruction);
            memset(instruction, 0, strlen(instruction));

            // Insert deallocation at the last config
            sprintf(instruction, "add sp, sp, #%d\n", foundMethod -> offset);
            insertInstruction(curr, createInstruction(instruction), curr -> num_instructions - 1);        
        }
    }

    // Grab the sum of the child instruction entries to exclude re-evaluation
    int childInstructions = 0;
    for (int i = 0; i < curr -> num_children; i++) childInstructions += curr -> children[i] -> num_instructions;

    int iterator = 0;
    int original_length = curr -> num_instructions;

    // Handle all post-processing for the 3AC instructions
    for (int i = 0; i < original_length; i++) {
        if (i >= childInstructions) {
            if (curr -> response_type == RESPONSETYPE_LITERAL) { // literal var reference
                curr -> num_instructions -= 1; // since we are not using anymore instructions here, simply return
            } else if (curr -> response_type == RESPONSETYPE_LOCAL) { // local var reference
                curr -> num_instructions -= 1; // since we are not using anymore instructions here, simply return
            } else if (curr -> response_type == RESPONSETYPE_GLOBAL) { // global var reference
                curr -> num_instructions -= 1; // since we are not using anymore instructions here, simply return
            } else if (curr -> response_type == RESPONSETYPE_TEMP) { // intermediary result (all operation handlers)
                if (curr -> node -> node_type == NODETYPE_ADDOP) { // add operator
                    struct InstructionEntry * arg1 = curr -> children[0];
                    struct InstructionEntry * arg2 = curr -> children[1];
                    char * instruction;

                    if (arg1 -> node -> data.type == DATATYPE_INT) { // general add
                        // Load argument literals and variable references
                        instruction = genLoadChildNode(arg1, arg1 -> num_child);
                        insertInstruction(parent, instruction, iterator);
                        iterator++;
                        curr -> num_instructions++;

                        instruction = genLoadChildNode(arg2, arg2 -> num_child);
                        insertInstruction(parent, instruction, iterator);
                        iterator++;
                        curr -> num_instructions++;

                        // Insert general operation instruction
                        insertInstruction(parent, createInstruction("add r2, r0, r1\n"), iterator);
                        iterator++;
                        curr -> num_instructions++;

                        // Add storage operation instruction
                        char storeInstruction[MAX_INSTRUCTION_SIZE];
                        sprintf(storeInstruction, "str r2, [sp, #%d]\n", curr -> offset);
                        insertInstruction(parent, createInstruction(storeInstruction), iterator);
                    } else if (arg1 -> node -> data.type == DATATYPE_STR) { // string concat
                        // Load string as argument
                        instruction = genLoadChildNode(arg1, 0);
                        insertInstruction(parent, instruction, iterator);
                        iterator++;
                        i++;

                        // Branch for strlen
                        insertInstruction(parent, curr -> instructions[iterator], iterator);
                        iterator++;
                        i++;

                        // Move length in r1
                        insertInstruction(parent, curr -> instructions[iterator], iterator);
                        iterator++;
                        i++;

                        // Load second string as argument
                        instruction = genLoadChildNode(arg2, 0);
                        insertInstruction(parent, instruction, iterator);
                        iterator++;
                        i++;  
                        
                        // Branch for strlen
                        insertInstruction(parent, curr -> instructions[iterator], iterator);
                        iterator++;
                        i++;

                        // Add length between arguments
                        insertInstruction(parent, curr -> instructions[iterator], iterator);
                        iterator++;
                        i++;

                        // Malloc based on strlen
                        insertInstruction(parent, curr -> instructions[iterator], iterator);
                        iterator++;
                        i++;

                        // Store register in the offset
                        char storeInstruction[MAX_INSTRUCTION_SIZE];
                        sprintf(storeInstruction, "str r0, [sp, #%d]\n", curr -> offset);
                        insertInstruction(parent, createInstruction(storeInstruction), iterator);
                        iterator++;
                        i++;

                        // Load first argument
                        instruction = genLoadChildNode(arg1, 1);
                        insertInstruction(parent, instruction, iterator);
                        iterator++;
                        i++;

                        // Strcpy
                        insertInstruction(parent, curr -> instructions[iterator], iterator);
                        iterator++;
                        i++;

                        // Load malloced area
                        sprintf(storeInstruction, "ldr r0, [sp, #%d]\n", curr -> offset);
                        insertInstruction(parent, createInstruction(storeInstruction), iterator);
                        iterator++;
                        i++;

                        // Load second argument
                        instruction = genLoadChildNode(arg2, 1);
                        insertInstruction(parent, instruction, iterator);
                        iterator++;
                        i++;

                        // Strcat
                        insertInstruction(parent, curr -> instructions[iterator], iterator);
                        iterator++;
                        i++;
                    }
                } else if (curr -> node -> node_type == NODETYPE_SUBOP) { // sub operator
                    struct InstructionEntry * arg1 = curr -> children[0];
                    struct InstructionEntry * arg2 = curr -> children[1];
                    char * instruction;

                    // Load argument literals and variable references
                    instruction = genLoadChildNode(arg1, arg1 -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;
                    instruction = genLoadChildNode(arg2, arg2 -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    // Insert general operation instruction
                    insertInstruction(parent, createInstruction("sub r2, r0, r1\n"), iterator);
                    iterator++;
                    curr -> num_instructions++;

                    // Add storage operation instruction
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "str r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);
                } else if (curr -> node -> node_type == NODETYPE_MULOP) { // mul operator
                    struct InstructionEntry * arg1 = curr -> children[0];
                    struct InstructionEntry * arg2 = curr -> children[1];
                    char * instruction;

                    // Load argument literals and variable references
                    instruction = genLoadChildNode(arg1, arg1 -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;
                    
                    instruction = genLoadChildNode(arg2, arg2 -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    // Insert general operation instruction
                    insertInstruction(parent, createInstruction("mul r2, r0, r1\n"), iterator);
                    iterator++;
                    curr -> num_instructions++;

                    // Add storage operation instruction
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "str r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);
                } else if (curr -> node -> node_type == NODETYPE_DIVOP) { // div operator
                    struct InstructionEntry * arg1 = curr -> children[0];
                    struct InstructionEntry * arg2 = curr -> children[1];
                    char * instruction;

                    // Load argument literals and variable references
                    instruction = genLoadChildNode(arg1, arg1 -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;
                    
                    instruction = genLoadChildNode(arg2, arg2 -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    // Insert general operation instruction
                    insertInstruction(parent, createInstruction("sdiv r2, r0, r1\n"), iterator);
                    iterator++;
                    curr -> num_instructions++;

                    // Add storage operation instruction
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "str r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);
                } else if (curr -> node -> node_type == NODETYPE_METHODCALL) { // method calls 
                    enum NodeType methodCallType = curr -> node -> children[0] -> node_type;

                    // Iterate through children and reformat the register loads
                    for (int j = 0; j < curr -> num_children; j++) {
                        struct InstructionEntry * arg = curr -> children[j];
                        char * instruction = genLoadChildNode(arg, j);
                        insertInstruction(parent, instruction, iterator);
                        iterator++;
                        i++;
                    }

                    // Finally insert the original branch and link instruction
                    insertInstruction(parent, curr -> instructions[iterator], iterator);
                    iterator++;
                    i++;

                    // Add storage operation instruction
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "str r0, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);
                } else if (curr -> node -> node_type == NODETYPE_PARSEINT) {
                    // Insert the argument loading
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    i++;

                    // Insert the branching instruction
                    insertInstruction(parent, curr -> instructions[iterator], iterator);
                    iterator++;
                    i++;

                    // Insert the storing of the result into temp
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "str r0, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);
                } else if (curr -> node -> node_type == NODETYPE_PRINT || curr -> node -> node_type == NODETYPE_PRINTLN) { // print statements
                    struct InstructionEntry * arg1 = curr -> children[0];
                    char * instruction;

                    // Insert the first instruction (unchanged)
                    insertInstruction(parent, curr -> instructions[iterator], iterator);
                    iterator++;
                    i++;

                    // Load argument literals and variable references
                    instruction = genLoadChildNode(arg1, 1);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    i++;

                    // Insert the third instruction (unchanged)
                    insertInstruction(parent, curr -> instructions[iterator], iterator);
                } else if (curr -> node -> node_type == NODETYPE_VARDECL) { // variable declarations
                    // Load the expression into register
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;
                    
                    // Add storage operation instruction
                    head = curr -> scope;
                    struct SymbolTableEntry * foundVariable = searchGlobalScope(curr -> id);
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "str r0, [sp, #%d]\n", foundVariable -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);
                } else if (curr -> node -> node_type == NODETYPE_RETURN) { // return instructions
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    i++;

                    insertInstruction(parent, curr -> instructions[iterator], iterator);
                } else if (curr -> node -> node_type == NODETYPE_LEFTVALUE) { // left value address (main method arguments)
                    head = curr -> scope;
                    struct SymbolTableEntry * found = searchGlobalScope(curr -> id);
                    struct ScopeEntry * foundScope = nearestMethodScope();
                    struct SymbolTableEntry * foundMethod = searchGlobalScope(foundScope -> id);
                    
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;
                    if (found -> num_indices == 1) {
                        char storeInstruction[MAX_INSTRUCTION_SIZE];
                        sprintf(storeInstruction, "add r1, r0, #1\nlsl r1, r1, #2\nldr r0, [sp, #%d]\nadd r0, r0, r1\nldr r0, [r0]\nstr r0, [sp, #%d]\n", found -> offset, curr -> offset);
                        insertInstruction(parent, createInstruction(storeInstruction), iterator);
                    } else if (found -> num_indices == 2) {
                        // to be handled
                    }
                } else if (curr -> node -> node_type == NODETYPE_ARRAY) {
                    if (curr -> node -> data.num_indices == 1) {
                        char * instruction;
                        instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                        insertInstruction(parent, instruction, iterator);
                        iterator++;
                        i++;

                        // Add instruction
                        insertInstruction(parent, curr -> instructions[iterator], iterator);
                        iterator++;
                        i++;

                        // Left shift instruction
                        insertInstruction(parent, curr -> instructions[iterator], iterator);
                        iterator++;
                        i++;

                        // Branching instruction
                        insertInstruction(parent, curr -> instructions[iterator], iterator);
                        iterator++;
                        i++;

                        // Store the base offset in the temporary variable
                        char storeInstruction[MAX_INSTRUCTION_SIZE];
                        sprintf(storeInstruction, "str r0, [sp, #%d]\n", curr -> offset);
                        insertInstruction(parent, createInstruction(storeInstruction), iterator);
                        iterator++;
                        i++;

                        // Load the length again into the register
                        instruction = genLoadChildNode(curr -> children[0], 1);
                        insertInstruction(parent, instruction, iterator);
                        iterator++;
                        i++;

                        // Store the length in the base offset
                        insertInstruction(parent, createInstruction("str r1, [r0]\n"), iterator);
                    } else if (curr -> node -> data.num_indices == 2) {
                        // to be handled
                    }
                } else if (curr -> node -> node_type == NODETYPE_LENGTH) {
                    struct ASTNode * leftValue = curr -> node -> children[0];
                    struct SymbolTableEntry * found = searchGlobalScope(leftValue -> data.value.string_value);
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "ldr r0, [sp, #%d]\n", found -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);
                    iterator++;
                    i++;

                    insertInstruction(parent, createInstruction("ldr r0, [r0]\n"), iterator);
                    iterator++;
                    i++;

                    sprintf(storeInstruction, "str r0, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);
                } else if (curr -> node -> node_type == NODETYPE_REASSIGN) { // variable reassignment
                    head = curr -> scope;
                    struct SymbolTableEntry * found = searchGlobalScope(curr -> node -> children[0] -> data.value.string_value);

                    if (found -> var_type == VARTYPE_GLOBAL) { // handle globa/static variable declaration
                        char * instruction;
                        instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                        insertInstruction(parent, instruction, iterator);
                        iterator++;
                        curr -> num_instructions++;

                        char storeInstruction[MAX_INSTRUCTION_SIZE];
                        sprintf(storeInstruction, "ldr r1, =%s\n", found -> id);
                        insertInstruction(parent, createInstruction(storeInstruction), iterator);
                        iterator++;
                        curr -> num_instructions++;

                        sprintf(storeInstruction, "str r0, [r1]\n");
                        insertInstruction(parent, createInstruction(storeInstruction), iterator);
                    } else {
                        if (found -> num_indices == 0) {
                            char * instruction;
                            instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                            insertInstruction(parent, instruction, iterator);
                            iterator++;
                            curr -> num_instructions++;

                            char storeInstruction[MAX_INSTRUCTION_SIZE];
                            sprintf(storeInstruction, "str r0, [sp, #%d]\n", found -> offset);
                            insertInstruction(parent, createInstruction(storeInstruction), iterator);
                        } else if (found -> num_indices == 1) {
                            // load the temporary from index expression
                            char * instruction;
                            instruction = genLoadChildNode(curr -> children[1], 0);
                            insertInstruction(parent, instruction, iterator);
                            iterator++;
                            curr -> num_instructions++;

                            char storeInstruction[MAX_INSTRUCTION_SIZE];
                            sprintf(storeInstruction, "ldr r1, [sp, #%d]\n", found -> offset);
                            insertInstruction(parent, createInstruction(storeInstruction), iterator);
                            iterator++;
                            curr -> num_children++;

                            insertInstruction(parent, createInstruction("add r0, r0, #1\nlsl r0, r0, #2\nadd r1, r1, r0\n"), iterator);
                            iterator++;
                            curr -> num_children++;

                            instruction = genLoadChildNode(curr -> children[0], 0);
                            insertInstruction(parent, instruction, iterator);
                            iterator++;
                            curr -> num_instructions++;

                            insertInstruction(parent, createInstruction("str r0, [r1, #0]\n"), iterator);
                        } else if (found -> num_indices == 2) {
                            // to be handled
                        }
                    }
                } else if (curr -> node -> node_type == NODETYPE_PLUSOP) { // positive unary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;
                    
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "rsbmi r0, r0, #0\nstr r0, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);
                } else if (curr -> node -> node_type == NODETYPE_MINUSOP) { // negative unary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;
                    
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "neg r0, r0\nstr r0, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);
                } else if (curr -> node -> node_type == NODETYPE_AND) { // and binary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    instruction = genLoadChildNode(curr -> children[1], curr -> children[1] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;                    
                    
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "and r2, r1, r0\nstr r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);  
                } else if (curr -> node -> node_type == NODETYPE_OR) { // or binary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    instruction = genLoadChildNode(curr -> children[1], curr -> children[1] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;                    
                    
                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "orr r2, r1, r0\nstr r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);                  
                } else if (curr -> node -> node_type == NODETYPE_COMPEQ) { // eq binary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    instruction = genLoadChildNode(curr -> children[1], curr -> children[1] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;       


                    insertInstruction(parent, createInstruction("mov r2, #0\n"), iterator);
                    iterator++;
                    i++;

                    insertInstruction(parent, createInstruction("cmp r0, r1\n"), iterator);
                    iterator++;
                    i++;

                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "moveq r2, #1\nstr r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);        
                } else if (curr -> node -> node_type == NODETYPE_COMPNEQ) { // neq binary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    instruction = genLoadChildNode(curr -> children[1], curr -> children[1] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;       


                    insertInstruction(parent, createInstruction("mov r2, #0\n"), iterator);
                    iterator++;
                    i++;

                    insertInstruction(parent, createInstruction("cmp r0, r1\n"), iterator);
                    iterator++;
                    i++;

                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "movne r2, #1\nstr r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);          
                } else if (curr -> node -> node_type == NODETYPE_COMPGREAT) { // great binary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    instruction = genLoadChildNode(curr -> children[1], curr -> children[1] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;       


                    insertInstruction(parent, createInstruction("mov r2, #0\n"), iterator);
                    iterator++;
                    i++;

                    insertInstruction(parent, createInstruction("cmp r0, r1\n"), iterator);
                    iterator++;
                    i++;

                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "movgt r2, #1\nstr r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);    
                } else if (curr -> node -> node_type == NODETYPE_COMPLESS) { // less binary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    instruction = genLoadChildNode(curr -> children[1], curr -> children[1] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;       


                    insertInstruction(parent, createInstruction("mov r2, #0\n"), iterator);
                    iterator++;
                    i++;

                    insertInstruction(parent, createInstruction("cmp r0, r1\n"), iterator);
                    iterator++;
                    i++;

                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "movlt r2, #1\nstr r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);    
                } else if (curr -> node -> node_type == NODETYPE_COMPGREQ) { // greq binary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    instruction = genLoadChildNode(curr -> children[1], curr -> children[1] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;       


                    insertInstruction(parent, createInstruction("mov r2, #0\n"), iterator);
                    iterator++;
                    i++;

                    insertInstruction(parent, createInstruction("cmp r0, r1\n"), iterator);
                    iterator++;
                    i++;

                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "movge r2, #1\nstr r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);    
                } else if (curr -> node -> node_type == NODETYPE_COMPLEQ) { // leq binary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    instruction = genLoadChildNode(curr -> children[1], curr -> children[1] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;       


                    insertInstruction(parent, createInstruction("mov r2, #0\n"), iterator);
                    iterator++;
                    i++;

                    insertInstruction(parent, createInstruction("cmp r0, r1\n"), iterator);
                    iterator++;
                    i++;

                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "movle r2, #1\nstr r2, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);    
                } else if (curr -> node -> node_type == NODETYPE_NOT) { // not binary operator
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    char storeInstruction[MAX_INSTRUCTION_SIZE];
                    sprintf(storeInstruction, "mvn r0, r0\nstr r0, [sp, #%d]\n", curr -> offset);
                    insertInstruction(parent, createInstruction(storeInstruction), iterator);                    
                } else if (curr -> node -> node_type == NODETYPE_IFELSE) { // if else statement handler
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    insertInstruction(parent, createInstruction("cmp r0, #0\n"), iterator);      
                    iterator++;
                    i++;

                    insertInstruction(parent, curr -> instructions[iterator - 1], iterator);   
                } else if (curr -> node -> node_type == NODETYPE_WHILE) { // while loop handler
                    char * instruction;
                    instruction = genLoadChildNode(curr -> children[0], curr -> children[0] -> num_child);
                    insertInstruction(parent, instruction, iterator);
                    iterator++;
                    curr -> num_instructions++;

                    insertInstruction(parent, createInstruction("cmp r0, #0\n"), iterator);      
                    iterator++;
                    i++;

                    insertInstruction(parent, curr -> instructions[iterator - 1], iterator);      
                }
            } else {
                insertInstruction(parent, curr -> instructions[iterator], iterator);
            }
        } else {
            //printf("%d // %s", iterator, curr -> instructions[iterator]);
            insertInstruction(parent, curr -> instructions[iterator], iterator);
        }
        
        iterator++;
    }
}

char * genLoadChildNode(struct InstructionEntry * leaf, int reg) {
    char instruction[MAX_INSTRUCTION_SIZE];
    
    if (leaf -> response_type == RESPONSETYPE_LITERAL) {
        if (leaf -> node -> data.type == DATATYPE_INT) {
            sprintf(instruction, "ldr r%d, =#%d\n", reg, leaf -> node -> data.value.int_value); 
        } else if (leaf -> node -> data.type == DATATYPE_BOOLEAN) {
            sprintf(instruction, "ldr r%d, =#%d\n", reg, leaf -> node -> data.value.int_value); 
        }
    } else if (leaf -> response_type == RESPONSETYPE_LOCAL) {
        head = leaf -> scope;
        struct SymbolTableEntry * found = searchGlobalScope(leaf -> id);
        if (found -> data_type == DATATYPE_STR) {
            sprintf(instruction, "ldr r%d, [sp, #%d]\n", reg, found -> offset);
        } else if (found -> data_type == DATATYPE_INT) {
            sprintf(instruction, "ldr r%d, [sp, #%d]\n", reg, found -> offset); 
        } else if (found -> data_type == DATATYPE_BOOLEAN) {
            sprintf(instruction, "ldr r%d, [sp, #%d]\n", reg, found -> offset); 
        }
    } else if (leaf -> response_type == RESPONSETYPE_GLOBAL) {
        struct SymbolTableEntry * found = searchGlobalScope(leaf -> id);
        if (!found) { // for string literals (treated as globals)
            sprintf(instruction, "ldr r%d, =%s\n", reg, leaf -> id);    
        } else if (found -> data_type == DATATYPE_INT) { // for integer globals
            sprintf(instruction, "ldr r%d, =%s\nldr r%d, [r%d, #0]\n", reg, leaf -> id, reg, reg);    
        } else if (found -> data_type == DATATYPE_BOOLEAN) { // for boolean globals 
            sprintf(instruction, "ldr r%d, =%s\nldr r%d, [r%d, #0]\n", reg, leaf -> id, reg, reg);    
        } else if (found -> data_type == DATATYPE_UNDEFINED) { // for uninitialized variables
            sprintf(instruction, "ldr r%d, =%s\nldr r%d, [r%d]\n", reg, leaf -> id, reg, reg);    
        } else { // for string globals
            sprintf(instruction, "ldr r%d, =%s\n", reg, leaf -> id);    
        }
    } else if (leaf -> response_type == RESPONSETYPE_TEMP) {
        // may need to define some type specific changes here
        if (leaf -> node -> data.type == DATATYPE_STR) {
            sprintf(instruction, "ldr r%d, [sp, #%d]\n", reg, leaf -> offset);
        } else if (leaf -> node -> data.type == DATATYPE_INT) {
            sprintf(instruction, "ldr r%d, [sp, #%d]\n", reg, leaf -> offset);
        } else if (leaf -> node -> data.type == DATATYPE_BOOLEAN) {
            sprintf(instruction, "ldr r%d, [sp, #%d]\n", reg, leaf -> offset);
        }
    } 
    
    return createInstruction(instruction);
}

void genToFile(char * instructions[], int numInstructions, char * fileName) {
    char fileNameNoExt[strlen(fileName) - 2]; // include length for null terminator
    strncpy(fileNameNoExt, fileName, strlen(fileName) - 4); // remove the java extension
    fileNameNoExt[strlen(fileName) - 4] = 's'; // add the assembly extensions
    fileNameNoExt[strlen(fileName) - 3] = '\0'; // add back the null terminator
    FILE * fp = fopen(fileNameNoExt, "w"); // create the new file pointer
    for (int i = 0; i < numInstructions; i++) {
        if (!instructions[i]) {
            printf("Encountered empty instruction when writing to file %d out of %d \n", i + 1, numInstructions);
            break;
        }
        fwrite(instructions[i], 1, strlen(instructions[i]), fp);
    }
    fclose(fp); // ensure the file pointer is closed before unmount
}

/*
    General instruction helper functions
*/

char * createInstruction(char * instruction) {
    char * reference = (char *) malloc(sizeof(char) * strlen(instruction) + 1);
    strcpy(reference, instruction);
    reference[strlen(instruction)] = '\0';
    return reference;
}

void insertInstruction(struct InstructionEntry * instructionScope, char * instruction, int start) {
    if (instructionScope -> num_instructions + 1 >= MAX_INSTRUCTIONS) {
        return;
    }

    int iterator = start;
    char * temp = NULL;    
    char * curr = instructionScope -> instructions[iterator];
    instructionScope -> instructions[iterator] = instruction;
    iterator++;

    while (curr) {
        temp = instructionScope -> instructions[iterator];
        instructionScope -> instructions[iterator] = curr;
        curr = temp;
        iterator++;
    }

    instructionScope -> num_instructions++;
}

/*
    New instruction helper functions
*/

void addToInstructionEntry(char * instruction) {
    char * reference = (char *) malloc(sizeof(char) * strlen(instruction) + 1);
    strcpy(reference, instruction);
    instructionHead -> instructions[instructionHead -> num_instructions] = reference;
    instructionHead -> num_instructions++;
}

void createInstructionScope(struct ASTNode * node, struct ScopeEntry * scope) {
    struct InstructionEntry * child = malloc(sizeof(struct InstructionEntry));
    memset(child, 0, sizeof(struct InstructionEntry));
    addChildInstructionScope(instructionHead, child);
    child -> parent = instructionHead;
    child -> scope = scope;
    child -> node = node;
    child -> num_instructions = 0;
    child -> num_children = 0;
    child -> response_type = RESPONSETYPE_NULLABLE;
    if (child -> parent) child -> num_child = child -> parent -> num_children - 1;
    instructionHead = child;
}

void addChildInstructionScope(struct InstructionEntry * parent, struct InstructionEntry * child) {
    if (parent && parent -> num_children < MAX_SCOPED_CHILDREN) {
        parent -> children[parent -> num_children] = child;
        parent -> num_children++;
    }
}

void exitInstructionScope() {
    if (instructionHead -> parent) instructionHead = instructionHead -> parent;
}