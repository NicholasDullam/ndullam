#ifndef NODE_H
#define NODE_H
#define MAX_NUM_CHILDREN 3

#include <stdbool.h>

enum DataType { 
    DATATYPE_UNDEFINED, 
    DATATYPE_STR, 
    DATATYPE_INT, 
    DATATYPE_BOOLEAN
};

// Returns the name of the given data type.
static inline const char *type_string(enum DataType t) {
    static const char *names[] = {"Undefined", "String", "Integer", "Boolean"};
    return names[t % 4];
}

struct SemanticData {
    enum DataType type;
    int num_indices;
    int line_no;
    int offset;
    union value_t {
        char* string_value;
        int int_value;
        bool boolean_value;
    } value;
};

enum NodeType {
    NODETYPE_PROGRAM,
    NODETYPE_MAINCLASS,
    NODETYPE_STATEMENT,
    NODETYPE_STATEMENTLIST,

    NODETYPE_BINOP,     // all binary operations
    NODETYPE_AND,
    NODETYPE_OR,
    NODETYPE_NOT,       // for bin op of not
    NODETYPE_COMPOP,    // all comparison operations
    NODETYPE_COMPGREAT,
    NODETYPE_COMPLESS,
    NODETYPE_COMPGREQ,
    NODETYPE_COMPLEQ,
    NODETYPE_COMPEQ,      // all equals comparison operations
    NODETYPE_COMPNEQ,

    NODETYPE_ADDOP,     // separated for concatenation
    NODETYPE_SUBOP,
    NODETYPE_MULOP,
    NODETYPE_DIVOP,
    NODETYPE_ADJOP,     // for all adjustment operations
    NODETYPE_PLUSOP,
    NODETYPE_MINUSOP,
    NODETYPE_TERMOP,    // other term operations
    NODETYPE_FACTOP,    // all factor operations
    NODETYPE_TERM,      // for all terms
    NODETYPE_FACTOR,    // for all factors

    NODETYPE_IFELSE,
    NODETYPE_WHILE,
    NODETYPE_REASSIGN,
    NODETYPE_RETURN,

    NODETYPE_VARDECL,
    NODETYPE_VARDECLEXPLIST,
    NODETYPE_STATICVARDECL,
    NODETYPE_STATICVARDECLLIST,
    NODETYPE_STATICMETHODDECL,
    NODETYPE_STATICMETHODDECLLIST,
    NODETYPE_FORMALLIST,
    NODETYPE_ARG,
    NODETYPE_ARGLIST,
    NODETYPE_METHODCALL,
    NODETYPE_PRINT,
    NODETYPE_PRINTLN,
    NODETYPE_PARSEINT,
    
    NODETYPE_NULLABLE,
    NODETYPE_PRIMETYPE,
    NODETYPE_TYPE,
    NODETYPE_LEFTVALUE,
    NODETYPE_LEFTVALUEINDEX,
    NODETYPE_LENGTH,
    NODETYPE_ARRAY,
    NODETYPE_INDEX,
    NODETYPE_INDEXLIST,
    NODETYPE_LITERAL,
    NODETYPE_EXP,
    NODETYPE_EXPDECL,
    NODETYPE_EXPLIST,
    NODETYPE_EXPTAIL
};

struct ASTNode {
    struct ASTNode* children[MAX_NUM_CHILDREN];
    int num_children;
    
    enum NodeType node_type;
    struct SemanticData data;
};

// Creates a new node with 0 children on the heap using `malloc()`.
struct ASTNode* new_node(enum NodeType t, int line_no);
// Adds the given children to the parent node. Returns -1 if the capacity is full.
int add_child(struct ASTNode* parent, struct ASTNode* child);

// Sets the data of the node to the given value and the corresponding type.

void set_string_value(struct ASTNode* node, char* s);
void set_int_value(struct ASTNode* node, int i);
void set_boolean_value(struct ASTNode* node, bool b);

#endif
