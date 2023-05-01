#ifndef TYPE_CHECK_H
#define TYPE_CHECK_H

#define MAX_SCOPED_CHILDREN 200             // max child scopes for a given scope
#define MAX_TABLE_SIZE 50                   // max symbol table size for a given scope
#define MAX_ARGUMENTS 10                    // max arguments for a given method entry

#include "node.h"
#include <stddef.h>

extern struct ScopeEntry * head;

enum ScopeType { 
    SCOPETYPE_GLOBAL, 
    SCOPETYPE_METHOD, 
    SCOPETYPE_LOCAL 
};

enum EntryType { 
    ENTRYTYPE_CLASS, 
    ENTRYTYPE_METHOD, 
    ENTRYTYPE_VAR 
};

enum VarType {
    VARTYPE_ARG,
    VARTYPE_LOCAL,
    VARTYPE_GLOBAL
};

/*
    Data structure to represent arguments and their data_types
    including indices
*/

struct ArgEntry {
    char * id;
    int num_indices;                        // used for tracking array types of table entries
    enum DataType data_type;
};

/*
    Each symbol table entry should include the type
    of entry (i.e. class, method, variable...) alongside the
    intended data type. If the entry is a function, the arg_types
    may be used -- an array of data types for method call verification.
*/

struct SymbolTableEntry {
    char * id;
    int length;                             // used to represent the length of an array datatype
    int offset;
    int num_args;                           // used to represent the length of the arguments array
    int num_indices;                        // used for tracking array types of table entries
    int num_declarations;                   // used tracking method declarations and reporting method overloading at proper stage    
    enum EntryType type;
    enum VarType var_type;
    enum DataType data_type;
    struct ArgEntry * args[MAX_ARGUMENTS];
};

/*
    Scope entries act as a tree of scope permissions, opting
    to memoize the entire state, rather than destroying scopes after
    escaping. Each scope has a specified type, reserving the level of 
    permissions for overriding pre-existing variables.
*/

struct ScopeEntry {
    char * id;                              // this will be used as a utility for checking return type
    enum DataType data_type;                // this will be used as a utility for checking return type
    int num_indices;                        // this will be used as a utility for checking return type
    int num_children;
    int num_entries;
    int depth;
    enum ScopeType type;
    struct ScopeEntry * parent;
    struct ScopeEntry * children[MAX_SCOPED_CHILDREN];
    struct SymbolTableEntry * symbol_table[MAX_TABLE_SIZE];
};

/*
    All argument handlers
*/

struct ArgEntry * createArgument(char * id, enum DataType data_type, int num_indices);

/*
    All scope handler functions
*/

struct ScopeEntry * findMethodScope(char * id, struct ScopeEntry * scope);
void createScope(enum ScopeType type);
void createMethodScope(char * id, enum DataType data_type, int num_indices);
int addChildScope(struct ScopeEntry* parent, struct ScopeEntry * child);
void digScope(struct ScopeEntry* prevScope);
int exitScope();

struct ScopeEntry * nearestMethodScope();
struct SymbolTableEntry * searchLocalScope(char* id);
struct SymbolTableEntry * searchMethodScope(char* id);
struct SymbolTableEntry * searchGlobalScope(char* id);

/*
    All symbol-table handler functions
*/

struct SymbolTableEntry * addToSymbolTable(char * id, enum EntryType type, enum DataType data_type, int num_indices);
struct SymbolTableEntry * findSymbol(struct ScopeEntry * scope, char* id);

/*
    All type-checking handler functions
*/

void checkProgram(struct ASTNode* program);
void checkMain(struct ASTNode* mainClass);

void createMethodForwardReferences(struct ASTNode* staticMethodDeclList);
void createMethodForwardReference(struct ASTNode* staticMethodDecl);
void checkStaticVarDeclList(struct ASTNode* staticVarDeclList);
void checkStaticMethodDeclList(struct ASTNode* staticMethodDeclList);
void checkStatementList(struct ASTNode* statementList);

void checkStaticVarDecl(struct ASTNode* staticVarDecl);
void checkVarDecl(struct ASTNode* varDecl);
void checkMethodCall(struct ASTNode* methodCall);
void checkExpDecl(struct ASTNode* varDecl, struct ASTNode* parent, struct ASTNode* expDecl);
void checkStaticMethodDecl(struct ASTNode* staticMethodDecl);
void checkExp(struct ASTNode* exp);
void checkFactor(struct ASTNode* factor);
void checkTerm(struct ASTNode* term);
int checkIndex(struct ASTNode* index);          // returns integer to indicate the depth of indices for type information
void checkLeftValue(struct ASTNode* leftValue);
void checkStatement(struct ASTNode* statement);

extern int num_errors;

#endif
