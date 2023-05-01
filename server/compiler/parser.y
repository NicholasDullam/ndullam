%{
#include <stdio.h>
#include <string.h>
#include "typecheck.h"
#include "codegen.h"
#include "node.h"

void yyerror(char *);
extern int yylex();

// Global variables defined by lex.yy.c.
extern int yylineno;
extern char* yytext;
extern FILE *yyin;

struct ASTNode* root;
%}

// Declares all variants of semantic values. Yacc/Bison copies all variants
// to the generated header file (y.tab.h) enclosed in a C-language union
// declaration, named `YYSTYPE`. Check out the header file to see it.
%union {
    struct ASTNode* node;
    int integer;
    char * string;
}

// Declares tokens. In the generated y.tab.h file, each token gets declared as 
// a enum constant and assigned with a unique number. These enum constants are
// used in the lex file, returned by `yylex()` to denote the symbolic tokens.

// These keyword-like tokens doesn't need to have a semantic value.

%token TOK_AND TOK_OR TOK_LESS TOK_GREAT TOK_LEQ TOK_GREQ TOK_NEQ
%token TOK_EQ TOK_PLUS TOK_MINUS TOK_MULT TOK_DIV TOK_NOT

%token KW_BOOLEAN KW_CLASS KW_FALSE KW_INT MAIN KW_PUBLIC KW_TRUE KW_VOID 
%token KW_IF KW_ELSE KW_RETURN KW_WHILE KW_LENGTH KW_STATIC KW_STRING 
%token KW_NEW KW_PRIVATE

%token SYSTEM_OUT_PRINT SYSTEM_OUT_PRINTLN INTEGER_PARSE_INT

// These tokens have additional information aside from what kind of token it
// is, so they carry semantic information.

// Left hand non-terminals. They are all associated to the `node` variant
// declared in the %union section, which is of type `ASTNode *`.

%type <node> Program MainClass VarDecl Statement Exp ExpList FormalList Arg ArgList Factor Term
%type <node> ExpTail ExpDecl Type PrimeType LeftValue Index MethodCall StatementList
%type <node> StaticVarDecl StaticVarDeclList StaticMethodDecl StaticMethodDeclList VarDeclExpList 

%token <integer> INTEGER_LITERAL
%token <string> STRING_LITERAL ID

// Handle operator precedence for logical expressions outside of Exp, Term, and Factor grammars

%left TOK_OR                                                // lowest precedence
%left TOK_AND 
%left TOK_GREQ TOK_GREAT TOK_LEQ TOK_LESS TOK_EQ TOK_NEQ    // highest precedence

// Declare the start non-terminal for the given grammar

%start Program

%%

/*
    All root grammars
*/

Program:                
    MainClass {   
        $$ = new_node(NODETYPE_PROGRAM, yylineno);
        root = $$;
        add_child($$, $1);
    };

MainClass: 
    KW_CLASS ID '{'
        StaticVarDeclList 
        StaticMethodDeclList
        KW_PUBLIC KW_STATIC KW_VOID MAIN '(' KW_STRING '[' ']' ID ')' '{' 
            StatementList
        '}'
    '}'
    {   
        $$ = new_node(NODETYPE_MAINCLASS, yylineno);
        set_string_value($$, $14);
        add_child($$, $4);
        add_child($$, $5);
        add_child($$, $17);
    };

/*
    All variable declaration grammars
*/

VarDecl:
    Type ID ExpDecl VarDeclExpList ';' {
        $$ = new_node(NODETYPE_VARDECL, yylineno);
        set_string_value($$, $2);
        add_child($$, $1);
        add_child($$, $3);
        add_child($$, $4);
    };

StaticVarDecl:
    KW_PRIVATE KW_STATIC VarDecl {
        $$ = new_node(NODETYPE_STATICVARDECL, yylineno);
        add_child($$, $3);
    };

StaticVarDeclList:
    StaticVarDeclList StaticVarDecl {
        $$ = new_node(NODETYPE_STATICVARDECLLIST, yylineno);
        add_child($$, $1);
        add_child($$, $2);
    }
    | {
        $$ = new_node(NODETYPE_NULLABLE, yylineno);
    };

VarDeclExpList:
    ',' ID ExpDecl VarDeclExpList {
        $$ = new_node(NODETYPE_VARDECLEXPLIST, yylineno);
        set_string_value($$, $2);
        add_child($$, $3);
        add_child($$, $4);
    }
    |  {
        $$ = new_node(NODETYPE_NULLABLE, yylineno);
    };

/*
    All statement-based grammars
*/

Statement:              
    VarDecl {
        $$ = new_node(NODETYPE_VARDECL, yylineno);
        add_child($$, $1);
    }
    | '{' StatementList '}' {
        $$ = new_node(NODETYPE_STATEMENTLIST, yylineno);
        add_child($$, $2);
    }
    | KW_IF '(' Exp ')' Statement KW_ELSE Statement {
        $$ = new_node(NODETYPE_IFELSE, yylineno);
        add_child($$, $3);
        add_child($$, $5);
        add_child($$, $7);
    }
    | KW_WHILE '(' Exp ')' Statement {
        $$ = new_node(NODETYPE_WHILE, yylineno);
        add_child($$, $3);
        add_child($$, $5);
    }
    | SYSTEM_OUT_PRINTLN '(' Exp ')' ';' {
        $$ = new_node(NODETYPE_PRINTLN, yylineno);
        add_child($$, $3);
    }
    | SYSTEM_OUT_PRINT '(' Exp ')' ';' {
        $$ = new_node(NODETYPE_PRINT, yylineno);
        add_child($$, $3);
    }
    | LeftValue '=' Exp ';' { 
        $$ = new_node(NODETYPE_REASSIGN, yylineno);
        add_child($$, $1);
        add_child($$, $3);
    }
    | KW_RETURN Exp ';' {
        $$ = new_node(NODETYPE_RETURN, yylineno);
        add_child($$, $2);
    }
    | MethodCall ';' {
        $$ = new_node(NODETYPE_METHODCALL, yylineno);
        add_child($$, $1);
    };

StatementList:
    StatementList Statement {
        $$ = new_node(NODETYPE_STATEMENTLIST, yylineno);
        add_child($$, $1);
        add_child($$, $2);
    }
    | {
        $$ = new_node(NODETYPE_NULLABLE, yylineno);
    };

LeftValue:
    ID {
        $$ = new_node(NODETYPE_LEFTVALUE, yylineno);
        set_string_value($$, $1);
    }
    | ID Index {
        $$ = new_node(NODETYPE_LEFTVALUEINDEX, yylineno);
        set_string_value($$, $1);
        add_child($$, $2);
    };

Index: 
    '[' Exp ']' {
        $$ = new_node(NODETYPE_INDEX, yylineno);
        add_child($$, $2);
    }
    | Index '[' Exp ']' {
        $$ = new_node(NODETYPE_INDEXLIST, yylineno);
        add_child($$, $1);
        add_child($$, $3);
    };

/*
    All typing-based grammars
*/

Type: 
    PrimeType {
        $$ = new_node(NODETYPE_TYPE, yylineno);
        $$ -> data.type = $1 -> data.type;
        add_child($$, $1);
    }
    | Type '[' ']' {
        $$ = new_node(NODETYPE_TYPE, yylineno);
        add_child($$, $1);
        $$ -> data.type = $1 -> data.type;
        $$ -> data.num_indices = $1 -> data.num_indices + 1;
    };

PrimeType:                   
    KW_INT {
        $$ = new_node(NODETYPE_PRIMETYPE, yylineno);
        $$ -> data.type = DATATYPE_INT;
    }
    | KW_BOOLEAN {
        $$ = new_node(NODETYPE_PRIMETYPE, yylineno);
        $$ -> data.type = DATATYPE_BOOLEAN;
    }
    | KW_STRING {
        $$ = new_node(NODETYPE_PRIMETYPE, yylineno);
        $$ -> data.type = DATATYPE_STR;
    };  

/*
    All method-based grammars
*/

MethodCall:
    ID '(' ExpList ')' {
        $$ = new_node(NODETYPE_METHODCALL, yylineno);
        set_string_value($$, $1);
        add_child($$, $3);
    }
    | INTEGER_PARSE_INT '(' Exp ')' {
        $$ = new_node(NODETYPE_PARSEINT, yylineno);
        add_child($$, $3);
    };    

StaticMethodDecl:
    KW_PUBLIC KW_STATIC Type ID '(' FormalList ')' '{'
        StatementList
    '}' {
        $$ = new_node(NODETYPE_STATICMETHODDECL, yylineno);
        set_string_value($$, $4);
        add_child($$, $3);
        add_child($$, $6);
        add_child($$, $9);
    };

StaticMethodDeclList:
    StaticMethodDeclList StaticMethodDecl {
        $$ = new_node(NODETYPE_STATICMETHODDECLLIST, yylineno);
        add_child($$, $1);
        add_child($$, $2);
    }
    | {
        $$ = new_node(NODETYPE_NULLABLE, yylineno);
    };

FormalList:
    Arg ArgList {
        $$ = new_node(NODETYPE_FORMALLIST, yylineno);
        add_child($$, $1);
        add_child($$, $2);
    }
    | {
        $$ = new_node(NODETYPE_NULLABLE, yylineno);
    };

Arg:
    Type ID {
        $$ = new_node(NODETYPE_ARG, yylineno);
        set_string_value($$, $2);
        add_child($$, $1);
    };

ArgList:
    ',' Arg ArgList {
        $$ = new_node(NODETYPE_ARGLIST, yylineno);
        add_child($$, $2);
        add_child($$, $3);
    }
    | {
        $$ = new_node(NODETYPE_NULLABLE, yylineno);
    };

/*
    All expression-based grammars
*/

Exp:  
    Exp TOK_PLUS Term {
        $$ = new_node(NODETYPE_ADDOP, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Exp TOK_MINUS Term {
        $$ = new_node(NODETYPE_SUBOP, yylineno);
        add_child($$, $1);
        add_child($$, $3);        
        // fill out other semantics
    }
    | Exp TOK_AND Exp {
        $$ = new_node(NODETYPE_AND, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Exp TOK_OR Exp {
        $$ = new_node(NODETYPE_OR, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Exp TOK_LESS Exp {
        $$ = new_node(NODETYPE_COMPLESS, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Exp TOK_GREAT Exp {
        $$ = new_node(NODETYPE_COMPGREAT, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Exp TOK_LEQ Exp {
        $$ = new_node(NODETYPE_COMPLEQ, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Exp TOK_GREQ Exp {
        $$ = new_node(NODETYPE_COMPGREQ, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Exp TOK_EQ Exp {
        $$ = new_node(NODETYPE_COMPEQ, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Exp TOK_NEQ Exp {
        $$ = new_node(NODETYPE_COMPNEQ, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Term {
        $$ = new_node(NODETYPE_TERM, yylineno);
        add_child($$, $1);
        // fill out other semantics
    };

Term:
    Term TOK_MULT Factor {
        $$ = new_node(NODETYPE_MULOP, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Term TOK_DIV Factor {
        $$ = new_node(NODETYPE_DIVOP, yylineno);
        add_child($$, $1);
        add_child($$, $3);
        // fill out other semantics
    }
    | Factor {
        $$ = new_node(NODETYPE_FACTOR, yylineno);
        add_child($$, $1);
        // fill out other semantics
    };

Factor:
    INTEGER_LITERAL {
        $$ = new_node(NODETYPE_LITERAL, yylineno);
        set_int_value($$, $1);
    }
    | STRING_LITERAL {
        $$ = new_node(NODETYPE_LITERAL, yylineno);
        set_string_value($$, $1);
    }
    | KW_TRUE {
        $$ = new_node(NODETYPE_LITERAL, yylineno);
        set_boolean_value($$, true);
    }
    | KW_FALSE {
        $$ = new_node(NODETYPE_LITERAL, yylineno);
        set_boolean_value($$, false);
    }
    | TOK_NOT Factor {
        $$ = new_node(NODETYPE_NOT, yylineno);
        add_child($$, $2);
        // fill out other semantics
    }
    | TOK_PLUS Factor {
        $$ = new_node(NODETYPE_PLUSOP, yylineno);
        add_child($$, $2);
        // fill out other semantics
    }
    | TOK_MINUS Factor {
        $$ = new_node(NODETYPE_MINUSOP, yylineno);
        add_child($$, $2);
        // fill out other semantics
    }
    | '(' Exp ')' {
        $$ = new_node(NODETYPE_EXP, yylineno);
        add_child($$, $2);
    }
    | LeftValue {
        $$ = new_node(NODETYPE_LEFTVALUE, yylineno);
        add_child($$, $1);
    } 
    | LeftValue '.' KW_LENGTH {
        $$ = new_node(NODETYPE_LENGTH, yylineno);
        add_child($$, $1);
    }
    | MethodCall {
        $$ = new_node(NODETYPE_METHODCALL, yylineno);
        add_child($$, $1);
    }
    | KW_NEW PrimeType Index {
        $$ = new_node(NODETYPE_ARRAY, yylineno);
        add_child($$, $2);
        add_child($$, $3);
    };

ExpDecl:
    '=' Exp {
        $$ = new_node(NODETYPE_EXPDECL, yylineno);
        add_child($$, $2);
    }
    | {
        $$ = new_node(NODETYPE_NULLABLE, yylineno);
    };

ExpList:
    Exp ExpTail {
        $$ = new_node(NODETYPE_EXPLIST, yylineno);
        add_child($$, $1);
        add_child($$, $2);
    }
    | {
        $$ = new_node(NODETYPE_NULLABLE, yylineno);
    };

ExpTail:
    ',' Exp ExpTail {
        $$ = new_node(NODETYPE_EXPTAIL, yylineno);
        add_child($$, $2);
        add_child($$, $3);
    }
    | {
        $$ = new_node(NODETYPE_NULLABLE, yylineno);
    };
%%

void yyerror(char* s) {
    fprintf(stderr, "Syntax errors in line %d\n", yylineno);
}

int main(int argc, char* argv[])
{
    yyin = fopen(argv[1], "r");

    // Checks for syntax errors and constructs AST
    if (yyparse() != 0) return 1;

    // Traverse the AST to check for semantic errors if no syntac errors
    checkProgram(root);

    // Return after type errors are reported
    if (num_errors != 0) return 1; 

    // Perform codegen
    genProgram(root, argv[1]);
    
    return 0;
}