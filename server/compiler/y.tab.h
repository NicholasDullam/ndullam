/* A Bison parser, made by GNU Bison 3.8.2.  */

/* Bison interface for Yacc-like parsers in C

   Copyright (C) 1984, 1989-1990, 2000-2015, 2018-2021 Free Software Foundation,
   Inc.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

/* As a special exception, you may create a larger work that contains
   part or all of the Bison parser skeleton and distribute that work
   under terms of your choice, so long as that work isn't itself a
   parser generator using the skeleton or a modified version thereof
   as a parser skeleton.  Alternatively, if you modify or redistribute
   the parser skeleton itself, you may (at your option) remove this
   special exception, which will cause the skeleton and the resulting
   Bison output files to be licensed under the GNU General Public
   License without this special exception.

   This special exception was added by the Free Software Foundation in
   version 2.2 of Bison.  */

/* DO NOT RELY ON FEATURES THAT ARE NOT DOCUMENTED in the manual,
   especially those whose name start with YY_ or yy_.  They are
   private implementation details that can be changed or removed.  */

#ifndef YY_YY_Y_TAB_H_INCLUDED
# define YY_YY_Y_TAB_H_INCLUDED
/* Debug traces.  */
#ifndef YYDEBUG
# define YYDEBUG 1
#endif
#if YYDEBUG
extern int yydebug;
#endif

/* Token kinds.  */
#ifndef YYTOKENTYPE
# define YYTOKENTYPE
  enum yytokentype
  {
    YYEMPTY = -2,
    YYEOF = 0,                     /* "end of file"  */
    YYerror = 256,                 /* error  */
    YYUNDEF = 257,                 /* "invalid token"  */
    TOK_AND = 258,                 /* TOK_AND  */
    TOK_OR = 259,                  /* TOK_OR  */
    TOK_LESS = 260,                /* TOK_LESS  */
    TOK_GREAT = 261,               /* TOK_GREAT  */
    TOK_LEQ = 262,                 /* TOK_LEQ  */
    TOK_GREQ = 263,                /* TOK_GREQ  */
    TOK_NEQ = 264,                 /* TOK_NEQ  */
    TOK_EQ = 265,                  /* TOK_EQ  */
    TOK_PLUS = 266,                /* TOK_PLUS  */
    TOK_MINUS = 267,               /* TOK_MINUS  */
    TOK_MULT = 268,                /* TOK_MULT  */
    TOK_DIV = 269,                 /* TOK_DIV  */
    TOK_NOT = 270,                 /* TOK_NOT  */
    KW_BOOLEAN = 271,              /* KW_BOOLEAN  */
    KW_CLASS = 272,                /* KW_CLASS  */
    KW_FALSE = 273,                /* KW_FALSE  */
    KW_INT = 274,                  /* KW_INT  */
    MAIN = 275,                    /* MAIN  */
    KW_PUBLIC = 276,               /* KW_PUBLIC  */
    KW_TRUE = 277,                 /* KW_TRUE  */
    KW_VOID = 278,                 /* KW_VOID  */
    KW_IF = 279,                   /* KW_IF  */
    KW_ELSE = 280,                 /* KW_ELSE  */
    KW_RETURN = 281,               /* KW_RETURN  */
    KW_WHILE = 282,                /* KW_WHILE  */
    KW_LENGTH = 283,               /* KW_LENGTH  */
    KW_STATIC = 284,               /* KW_STATIC  */
    KW_STRING = 285,               /* KW_STRING  */
    KW_NEW = 286,                  /* KW_NEW  */
    KW_PRIVATE = 287,              /* KW_PRIVATE  */
    SYSTEM_OUT_PRINT = 288,        /* SYSTEM_OUT_PRINT  */
    SYSTEM_OUT_PRINTLN = 289,      /* SYSTEM_OUT_PRINTLN  */
    INTEGER_PARSE_INT = 290,       /* INTEGER_PARSE_INT  */
    INTEGER_LITERAL = 291,         /* INTEGER_LITERAL  */
    STRING_LITERAL = 292,          /* STRING_LITERAL  */
    ID = 293                       /* ID  */
  };
  typedef enum yytokentype yytoken_kind_t;
#endif
/* Token kinds.  */
#define YYEMPTY -2
#define YYEOF 0
#define YYerror 256
#define YYUNDEF 257
#define TOK_AND 258
#define TOK_OR 259
#define TOK_LESS 260
#define TOK_GREAT 261
#define TOK_LEQ 262
#define TOK_GREQ 263
#define TOK_NEQ 264
#define TOK_EQ 265
#define TOK_PLUS 266
#define TOK_MINUS 267
#define TOK_MULT 268
#define TOK_DIV 269
#define TOK_NOT 270
#define KW_BOOLEAN 271
#define KW_CLASS 272
#define KW_FALSE 273
#define KW_INT 274
#define MAIN 275
#define KW_PUBLIC 276
#define KW_TRUE 277
#define KW_VOID 278
#define KW_IF 279
#define KW_ELSE 280
#define KW_RETURN 281
#define KW_WHILE 282
#define KW_LENGTH 283
#define KW_STATIC 284
#define KW_STRING 285
#define KW_NEW 286
#define KW_PRIVATE 287
#define SYSTEM_OUT_PRINT 288
#define SYSTEM_OUT_PRINTLN 289
#define INTEGER_PARSE_INT 290
#define INTEGER_LITERAL 291
#define STRING_LITERAL 292
#define ID 293

/* Value type.  */
#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
union YYSTYPE
{
#line 22 "parser.y"

    struct ASTNode* node;
    int integer;
    char * string;

#line 149 "y.tab.h"

};
typedef union YYSTYPE YYSTYPE;
# define YYSTYPE_IS_TRIVIAL 1
# define YYSTYPE_IS_DECLARED 1
#endif


extern YYSTYPE yylval;


int yyparse (void);


#endif /* !YY_YY_Y_TAB_H_INCLUDED  */
