#include "node.h"
#include <stdlib.h>
#include <string.h>

struct ASTNode* new_node(enum NodeType t, int line_no){
    struct ASTNode* ast_node = malloc(sizeof(struct ASTNode));
    memset(ast_node, 0, sizeof(struct ASTNode));
    ast_node -> node_type = t;
    ast_node -> data.line_no = line_no;
    ast_node -> data.num_indices = 0;
    return ast_node;
}

int add_child(struct ASTNode* parent, struct ASTNode* child){
    if (parent->num_children < MAX_NUM_CHILDREN) {
        parent -> children[parent->num_children] = child;
        parent -> num_children++;
        return 0;
    } else {
        return -1;
    }
}

void set_string_value(struct ASTNode* node, char* s){
    node->data.type = DATATYPE_STR;
    node->data.value.string_value = s;
}

void set_int_value(struct ASTNode* node, int i){
    node->data.type = DATATYPE_INT;
    node->data.value.int_value = i;
}

void set_boolean_value(struct ASTNode* node, bool b){
    node->data.type = DATATYPE_BOOLEAN;
    node->data.value.boolean_value = b;
}



