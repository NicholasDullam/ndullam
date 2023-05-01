%{
#include "y.tab.h"

#include <stdio.h>
#include <stdlib.h>
extern int yylex();
%}

%option yylineno

%%
"//".*                               { } /* inline comments */
"/*"([^\*]|("*"+[^\/\*]))*"*"+"/"    { } /* block comments  */
[ \t\n]                              { } /* skip whitespace */

if                    { return KW_IF;                 } /* keywords */
else                  { return KW_ELSE;               }
return                { return KW_RETURN;             }
new                   { return KW_NEW;                }
boolean               { return KW_BOOLEAN;            }
class                 { return KW_CLASS;              }
true                  { return KW_TRUE;               }
while                 { return KW_WHILE;              }
false                 { return KW_FALSE;              }
int                   { return KW_INT;                }
main                  { return MAIN;                  }
public                { return KW_PUBLIC;             }
private               { return KW_PRIVATE;            }
static                { return KW_STATIC;             }
String                { return KW_STRING;             }
System\.out\.print    { return SYSTEM_OUT_PRINT;      }
System\.out\.println  { return SYSTEM_OUT_PRINTLN;    }
Integer\.parseInt     { return INTEGER_PARSE_INT;     }
void                  { return KW_VOID;               }
length                { return KW_LENGTH;             }

"&&"                  { return TOK_AND;               } /* operators */
"||"                  { return TOK_OR;                }
"<"                   { return TOK_LESS;              }
">"                   { return TOK_GREAT;             }   
"<="                  { return TOK_LEQ;               }
">="                  { return TOK_GREQ;              }
"!="                  { return TOK_NEQ;               }
"=="                  { return TOK_EQ;                }
"+"                   { return TOK_PLUS;              }
"-"                   { return TOK_MINUS;             }
"*"                   { return TOK_MULT;              }
"/"                   { return TOK_DIV;               }
"!"                   { return TOK_NOT;               }

\{                    { return *yytext;               } /* other */
\}                    { return *yytext;               }
\[                    { return *yytext;               }
\]                    { return *yytext;               }
\(                    { return *yytext;               }
\)                    { return *yytext;               } 
\=                    { return *yytext;               }
\;                    { return *yytext;               }
\,                    { return *yytext;               }
\.                    { return *yytext;               }


[0-9]+ {
    yylval.integer = atoi(strdup(yytext));
    return INTEGER_LITERAL;
}

[a-zA-Z][a-zA-Z0-9_]* {
    yylval.string = strdup(yytext);
    return ID;                 
}

\"([^"\\]|\\.)*\" {
    yylval.string = strdup(yytext);
    return STRING_LITERAL;                    
}

%%

int yywrap(void) {
    return 1;
}