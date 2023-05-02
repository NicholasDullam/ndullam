/* A Bison parser, made by GNU Bison 3.8.2.  */

/* Bison implementation for Yacc-like parsers in C

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

/* C LALR(1) parser skeleton written by Richard Stallman, by
   simplifying the original so-called "semantic" parser.  */

/* DO NOT RELY ON FEATURES THAT ARE NOT DOCUMENTED in the manual,
   especially those whose name start with YY_ or yy_.  They are
   private implementation details that can be changed or removed.  */

/* All symbols defined below should begin with yy or YY, to avoid
   infringing on user name space.  This should be done even for local
   variables, as they might otherwise be expanded by user macros.
   There are some unavoidable exceptions within include files to
   define necessary library symbols; they are noted "INFRINGES ON
   USER NAME SPACE" below.  */

/* Identify Bison output, and Bison version.  */
#define YYBISON 30802

/* Bison version string.  */
#define YYBISON_VERSION "3.8.2"

/* Skeleton name.  */
#define YYSKELETON_NAME "yacc.c"

/* Pure parsers.  */
#define YYPURE 0

/* Push parsers.  */
#define YYPUSH 0

/* Pull parsers.  */
#define YYPULL 1




/* First part of user prologue.  */
#line 1 "parser.y"

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

#line 89 "y.tab.c"

# ifndef YY_CAST
#  ifdef __cplusplus
#   define YY_CAST(Type, Val) static_cast<Type> (Val)
#   define YY_REINTERPRET_CAST(Type, Val) reinterpret_cast<Type> (Val)
#  else
#   define YY_CAST(Type, Val) ((Type) (Val))
#   define YY_REINTERPRET_CAST(Type, Val) ((Type) (Val))
#  endif
# endif
# ifndef YY_NULLPTR
#  if defined __cplusplus
#   if 201103L <= __cplusplus
#    define YY_NULLPTR nullptr
#   else
#    define YY_NULLPTR 0
#   endif
#  else
#   define YY_NULLPTR ((void*)0)
#  endif
# endif

/* Use api.header.include to #include this header
   instead of duplicating it here.  */
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

#line 224 "y.tab.c"

};
typedef union YYSTYPE YYSTYPE;
# define YYSTYPE_IS_TRIVIAL 1
# define YYSTYPE_IS_DECLARED 1
#endif


extern YYSTYPE yylval;


int yyparse (void);


#endif /* !YY_YY_Y_TAB_H_INCLUDED  */
/* Symbol kind.  */
enum yysymbol_kind_t
{
  YYSYMBOL_YYEMPTY = -2,
  YYSYMBOL_YYEOF = 0,                      /* "end of file"  */
  YYSYMBOL_YYerror = 1,                    /* error  */
  YYSYMBOL_YYUNDEF = 2,                    /* "invalid token"  */
  YYSYMBOL_TOK_AND = 3,                    /* TOK_AND  */
  YYSYMBOL_TOK_OR = 4,                     /* TOK_OR  */
  YYSYMBOL_TOK_LESS = 5,                   /* TOK_LESS  */
  YYSYMBOL_TOK_GREAT = 6,                  /* TOK_GREAT  */
  YYSYMBOL_TOK_LEQ = 7,                    /* TOK_LEQ  */
  YYSYMBOL_TOK_GREQ = 8,                   /* TOK_GREQ  */
  YYSYMBOL_TOK_NEQ = 9,                    /* TOK_NEQ  */
  YYSYMBOL_TOK_EQ = 10,                    /* TOK_EQ  */
  YYSYMBOL_TOK_PLUS = 11,                  /* TOK_PLUS  */
  YYSYMBOL_TOK_MINUS = 12,                 /* TOK_MINUS  */
  YYSYMBOL_TOK_MULT = 13,                  /* TOK_MULT  */
  YYSYMBOL_TOK_DIV = 14,                   /* TOK_DIV  */
  YYSYMBOL_TOK_NOT = 15,                   /* TOK_NOT  */
  YYSYMBOL_KW_BOOLEAN = 16,                /* KW_BOOLEAN  */
  YYSYMBOL_KW_CLASS = 17,                  /* KW_CLASS  */
  YYSYMBOL_KW_FALSE = 18,                  /* KW_FALSE  */
  YYSYMBOL_KW_INT = 19,                    /* KW_INT  */
  YYSYMBOL_MAIN = 20,                      /* MAIN  */
  YYSYMBOL_KW_PUBLIC = 21,                 /* KW_PUBLIC  */
  YYSYMBOL_KW_TRUE = 22,                   /* KW_TRUE  */
  YYSYMBOL_KW_VOID = 23,                   /* KW_VOID  */
  YYSYMBOL_KW_IF = 24,                     /* KW_IF  */
  YYSYMBOL_KW_ELSE = 25,                   /* KW_ELSE  */
  YYSYMBOL_KW_RETURN = 26,                 /* KW_RETURN  */
  YYSYMBOL_KW_WHILE = 27,                  /* KW_WHILE  */
  YYSYMBOL_KW_LENGTH = 28,                 /* KW_LENGTH  */
  YYSYMBOL_KW_STATIC = 29,                 /* KW_STATIC  */
  YYSYMBOL_KW_STRING = 30,                 /* KW_STRING  */
  YYSYMBOL_KW_NEW = 31,                    /* KW_NEW  */
  YYSYMBOL_KW_PRIVATE = 32,                /* KW_PRIVATE  */
  YYSYMBOL_SYSTEM_OUT_PRINT = 33,          /* SYSTEM_OUT_PRINT  */
  YYSYMBOL_SYSTEM_OUT_PRINTLN = 34,        /* SYSTEM_OUT_PRINTLN  */
  YYSYMBOL_INTEGER_PARSE_INT = 35,         /* INTEGER_PARSE_INT  */
  YYSYMBOL_INTEGER_LITERAL = 36,           /* INTEGER_LITERAL  */
  YYSYMBOL_STRING_LITERAL = 37,            /* STRING_LITERAL  */
  YYSYMBOL_ID = 38,                        /* ID  */
  YYSYMBOL_39_ = 39,                       /* '{'  */
  YYSYMBOL_40_ = 40,                       /* '('  */
  YYSYMBOL_41_ = 41,                       /* '['  */
  YYSYMBOL_42_ = 42,                       /* ']'  */
  YYSYMBOL_43_ = 43,                       /* ')'  */
  YYSYMBOL_44_ = 44,                       /* '}'  */
  YYSYMBOL_45_ = 45,                       /* ';'  */
  YYSYMBOL_46_ = 46,                       /* ','  */
  YYSYMBOL_47_ = 47,                       /* '='  */
  YYSYMBOL_48_ = 48,                       /* '.'  */
  YYSYMBOL_YYACCEPT = 49,                  /* $accept  */
  YYSYMBOL_Program = 50,                   /* Program  */
  YYSYMBOL_MainClass = 51,                 /* MainClass  */
  YYSYMBOL_VarDecl = 52,                   /* VarDecl  */
  YYSYMBOL_StaticVarDecl = 53,             /* StaticVarDecl  */
  YYSYMBOL_StaticVarDeclList = 54,         /* StaticVarDeclList  */
  YYSYMBOL_VarDeclExpList = 55,            /* VarDeclExpList  */
  YYSYMBOL_Statement = 56,                 /* Statement  */
  YYSYMBOL_StatementList = 57,             /* StatementList  */
  YYSYMBOL_LeftValue = 58,                 /* LeftValue  */
  YYSYMBOL_Index = 59,                     /* Index  */
  YYSYMBOL_Type = 60,                      /* Type  */
  YYSYMBOL_PrimeType = 61,                 /* PrimeType  */
  YYSYMBOL_MethodCall = 62,                /* MethodCall  */
  YYSYMBOL_StaticMethodDecl = 63,          /* StaticMethodDecl  */
  YYSYMBOL_StaticMethodDeclList = 64,      /* StaticMethodDeclList  */
  YYSYMBOL_FormalList = 65,                /* FormalList  */
  YYSYMBOL_Arg = 66,                       /* Arg  */
  YYSYMBOL_ArgList = 67,                   /* ArgList  */
  YYSYMBOL_Exp = 68,                       /* Exp  */
  YYSYMBOL_Term = 69,                      /* Term  */
  YYSYMBOL_Factor = 70,                    /* Factor  */
  YYSYMBOL_ExpDecl = 71,                   /* ExpDecl  */
  YYSYMBOL_ExpList = 72,                   /* ExpList  */
  YYSYMBOL_ExpTail = 73                    /* ExpTail  */
};
typedef enum yysymbol_kind_t yysymbol_kind_t;




#ifdef short
# undef short
#endif

/* On compilers that do not define __PTRDIFF_MAX__ etc., make sure
   <limits.h> and (if available) <stdint.h> are included
   so that the code can choose integer types of a good width.  */

#ifndef __PTRDIFF_MAX__
# include <limits.h> /* INFRINGES ON USER NAME SPACE */
# if defined __STDC_VERSION__ && 199901 <= __STDC_VERSION__
#  include <stdint.h> /* INFRINGES ON USER NAME SPACE */
#  define YY_STDINT_H
# endif
#endif

/* Narrow types that promote to a signed type and that can represent a
   signed or unsigned integer of at least N bits.  In tables they can
   save space and decrease cache pressure.  Promoting to a signed type
   helps avoid bugs in integer arithmetic.  */

#ifdef __INT_LEAST8_MAX__
typedef __INT_LEAST8_TYPE__ yytype_int8;
#elif defined YY_STDINT_H
typedef int_least8_t yytype_int8;
#else
typedef signed char yytype_int8;
#endif

#ifdef __INT_LEAST16_MAX__
typedef __INT_LEAST16_TYPE__ yytype_int16;
#elif defined YY_STDINT_H
typedef int_least16_t yytype_int16;
#else
typedef short yytype_int16;
#endif

/* Work around bug in HP-UX 11.23, which defines these macros
   incorrectly for preprocessor constants.  This workaround can likely
   be removed in 2023, as HPE has promised support for HP-UX 11.23
   (aka HP-UX 11i v2) only through the end of 2022; see Table 2 of
   <https://h20195.www2.hpe.com/V2/getpdf.aspx/4AA4-7673ENW.pdf>.  */
#ifdef __hpux
# undef UINT_LEAST8_MAX
# undef UINT_LEAST16_MAX
# define UINT_LEAST8_MAX 255
# define UINT_LEAST16_MAX 65535
#endif

#if defined __UINT_LEAST8_MAX__ && __UINT_LEAST8_MAX__ <= __INT_MAX__
typedef __UINT_LEAST8_TYPE__ yytype_uint8;
#elif (!defined __UINT_LEAST8_MAX__ && defined YY_STDINT_H \
       && UINT_LEAST8_MAX <= INT_MAX)
typedef uint_least8_t yytype_uint8;
#elif !defined __UINT_LEAST8_MAX__ && UCHAR_MAX <= INT_MAX
typedef unsigned char yytype_uint8;
#else
typedef short yytype_uint8;
#endif

#if defined __UINT_LEAST16_MAX__ && __UINT_LEAST16_MAX__ <= __INT_MAX__
typedef __UINT_LEAST16_TYPE__ yytype_uint16;
#elif (!defined __UINT_LEAST16_MAX__ && defined YY_STDINT_H \
       && UINT_LEAST16_MAX <= INT_MAX)
typedef uint_least16_t yytype_uint16;
#elif !defined __UINT_LEAST16_MAX__ && USHRT_MAX <= INT_MAX
typedef unsigned short yytype_uint16;
#else
typedef int yytype_uint16;
#endif

#ifndef YYPTRDIFF_T
# if defined __PTRDIFF_TYPE__ && defined __PTRDIFF_MAX__
#  define YYPTRDIFF_T __PTRDIFF_TYPE__
#  define YYPTRDIFF_MAXIMUM __PTRDIFF_MAX__
# elif defined PTRDIFF_MAX
#  ifndef ptrdiff_t
#   include <stddef.h> /* INFRINGES ON USER NAME SPACE */
#  endif
#  define YYPTRDIFF_T ptrdiff_t
#  define YYPTRDIFF_MAXIMUM PTRDIFF_MAX
# else
#  define YYPTRDIFF_T long
#  define YYPTRDIFF_MAXIMUM LONG_MAX
# endif
#endif

#ifndef YYSIZE_T
# ifdef __SIZE_TYPE__
#  define YYSIZE_T __SIZE_TYPE__
# elif defined size_t
#  define YYSIZE_T size_t
# elif defined __STDC_VERSION__ && 199901 <= __STDC_VERSION__
#  include <stddef.h> /* INFRINGES ON USER NAME SPACE */
#  define YYSIZE_T size_t
# else
#  define YYSIZE_T unsigned
# endif
#endif

#define YYSIZE_MAXIMUM                                  \
  YY_CAST (YYPTRDIFF_T,                                 \
           (YYPTRDIFF_MAXIMUM < YY_CAST (YYSIZE_T, -1)  \
            ? YYPTRDIFF_MAXIMUM                         \
            : YY_CAST (YYSIZE_T, -1)))

#define YYSIZEOF(X) YY_CAST (YYPTRDIFF_T, sizeof (X))


/* Stored state numbers (used for stacks). */
typedef yytype_uint8 yy_state_t;

/* State numbers in computations.  */
typedef int yy_state_fast_t;

#ifndef YY_
# if defined YYENABLE_NLS && YYENABLE_NLS
#  if ENABLE_NLS
#   include <libintl.h> /* INFRINGES ON USER NAME SPACE */
#   define YY_(Msgid) dgettext ("bison-runtime", Msgid)
#  endif
# endif
# ifndef YY_
#  define YY_(Msgid) Msgid
# endif
#endif


#ifndef YY_ATTRIBUTE_PURE
# if defined __GNUC__ && 2 < __GNUC__ + (96 <= __GNUC_MINOR__)
#  define YY_ATTRIBUTE_PURE __attribute__ ((__pure__))
# else
#  define YY_ATTRIBUTE_PURE
# endif
#endif

#ifndef YY_ATTRIBUTE_UNUSED
# if defined __GNUC__ && 2 < __GNUC__ + (7 <= __GNUC_MINOR__)
#  define YY_ATTRIBUTE_UNUSED __attribute__ ((__unused__))
# else
#  define YY_ATTRIBUTE_UNUSED
# endif
#endif

/* Suppress unused-variable warnings by "using" E.  */
#if ! defined lint || defined __GNUC__
# define YY_USE(E) ((void) (E))
#else
# define YY_USE(E) /* empty */
#endif

/* Suppress an incorrect diagnostic about yylval being uninitialized.  */
#if defined __GNUC__ && ! defined __ICC && 406 <= __GNUC__ * 100 + __GNUC_MINOR__
# if __GNUC__ * 100 + __GNUC_MINOR__ < 407
#  define YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN                           \
    _Pragma ("GCC diagnostic push")                                     \
    _Pragma ("GCC diagnostic ignored \"-Wuninitialized\"")
# else
#  define YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN                           \
    _Pragma ("GCC diagnostic push")                                     \
    _Pragma ("GCC diagnostic ignored \"-Wuninitialized\"")              \
    _Pragma ("GCC diagnostic ignored \"-Wmaybe-uninitialized\"")
# endif
# define YY_IGNORE_MAYBE_UNINITIALIZED_END      \
    _Pragma ("GCC diagnostic pop")
#else
# define YY_INITIAL_VALUE(Value) Value
#endif
#ifndef YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
# define YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
# define YY_IGNORE_MAYBE_UNINITIALIZED_END
#endif
#ifndef YY_INITIAL_VALUE
# define YY_INITIAL_VALUE(Value) /* Nothing. */
#endif

#if defined __cplusplus && defined __GNUC__ && ! defined __ICC && 6 <= __GNUC__
# define YY_IGNORE_USELESS_CAST_BEGIN                          \
    _Pragma ("GCC diagnostic push")                            \
    _Pragma ("GCC diagnostic ignored \"-Wuseless-cast\"")
# define YY_IGNORE_USELESS_CAST_END            \
    _Pragma ("GCC diagnostic pop")
#endif
#ifndef YY_IGNORE_USELESS_CAST_BEGIN
# define YY_IGNORE_USELESS_CAST_BEGIN
# define YY_IGNORE_USELESS_CAST_END
#endif


#define YY_ASSERT(E) ((void) (0 && (E)))

#if !defined yyoverflow

/* The parser invokes alloca or malloc; define the necessary symbols.  */

# ifdef YYSTACK_USE_ALLOCA
#  if YYSTACK_USE_ALLOCA
#   ifdef __GNUC__
#    define YYSTACK_ALLOC __builtin_alloca
#   elif defined __BUILTIN_VA_ARG_INCR
#    include <alloca.h> /* INFRINGES ON USER NAME SPACE */
#   elif defined _AIX
#    define YYSTACK_ALLOC __alloca
#   elif defined _MSC_VER
#    include <malloc.h> /* INFRINGES ON USER NAME SPACE */
#    define alloca _alloca
#   else
#    define YYSTACK_ALLOC alloca
#    if ! defined _ALLOCA_H && ! defined EXIT_SUCCESS
#     include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
      /* Use EXIT_SUCCESS as a witness for stdlib.h.  */
#     ifndef EXIT_SUCCESS
#      define EXIT_SUCCESS 0
#     endif
#    endif
#   endif
#  endif
# endif

# ifdef YYSTACK_ALLOC
   /* Pacify GCC's 'empty if-body' warning.  */
#  define YYSTACK_FREE(Ptr) do { /* empty */; } while (0)
#  ifndef YYSTACK_ALLOC_MAXIMUM
    /* The OS might guarantee only one guard page at the bottom of the stack,
       and a page size can be as small as 4096 bytes.  So we cannot safely
       invoke alloca (N) if N exceeds 4096.  Use a slightly smaller number
       to allow for a few compiler-allocated temporary stack slots.  */
#   define YYSTACK_ALLOC_MAXIMUM 4032 /* reasonable circa 2006 */
#  endif
# else
#  define YYSTACK_ALLOC YYMALLOC
#  define YYSTACK_FREE YYFREE
#  ifndef YYSTACK_ALLOC_MAXIMUM
#   define YYSTACK_ALLOC_MAXIMUM YYSIZE_MAXIMUM
#  endif
#  if (defined __cplusplus && ! defined EXIT_SUCCESS \
       && ! ((defined YYMALLOC || defined malloc) \
             && (defined YYFREE || defined free)))
#   include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
#   ifndef EXIT_SUCCESS
#    define EXIT_SUCCESS 0
#   endif
#  endif
#  ifndef YYMALLOC
#   define YYMALLOC malloc
#   if ! defined malloc && ! defined EXIT_SUCCESS
void *malloc (YYSIZE_T); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
#  ifndef YYFREE
#   define YYFREE free
#   if ! defined free && ! defined EXIT_SUCCESS
void free (void *); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
# endif
#endif /* !defined yyoverflow */

#if (! defined yyoverflow \
     && (! defined __cplusplus \
         || (defined YYSTYPE_IS_TRIVIAL && YYSTYPE_IS_TRIVIAL)))

/* A type that is properly aligned for any stack member.  */
union yyalloc
{
  yy_state_t yyss_alloc;
  YYSTYPE yyvs_alloc;
};

/* The size of the maximum gap between one aligned stack and the next.  */
# define YYSTACK_GAP_MAXIMUM (YYSIZEOF (union yyalloc) - 1)

/* The size of an array large to enough to hold all stacks, each with
   N elements.  */
# define YYSTACK_BYTES(N) \
     ((N) * (YYSIZEOF (yy_state_t) + YYSIZEOF (YYSTYPE)) \
      + YYSTACK_GAP_MAXIMUM)

# define YYCOPY_NEEDED 1

/* Relocate STACK from its old location to the new one.  The
   local variables YYSIZE and YYSTACKSIZE give the old and new number of
   elements in the stack, and YYPTR gives the new location of the
   stack.  Advance YYPTR to a properly aligned location for the next
   stack.  */
# define YYSTACK_RELOCATE(Stack_alloc, Stack)                           \
    do                                                                  \
      {                                                                 \
        YYPTRDIFF_T yynewbytes;                                         \
        YYCOPY (&yyptr->Stack_alloc, Stack, yysize);                    \
        Stack = &yyptr->Stack_alloc;                                    \
        yynewbytes = yystacksize * YYSIZEOF (*Stack) + YYSTACK_GAP_MAXIMUM; \
        yyptr += yynewbytes / YYSIZEOF (*yyptr);                        \
      }                                                                 \
    while (0)

#endif

#if defined YYCOPY_NEEDED && YYCOPY_NEEDED
/* Copy COUNT objects from SRC to DST.  The source and destination do
   not overlap.  */
# ifndef YYCOPY
#  if defined __GNUC__ && 1 < __GNUC__
#   define YYCOPY(Dst, Src, Count) \
      __builtin_memcpy (Dst, Src, YY_CAST (YYSIZE_T, (Count)) * sizeof (*(Src)))
#  else
#   define YYCOPY(Dst, Src, Count)              \
      do                                        \
        {                                       \
          YYPTRDIFF_T yyi;                      \
          for (yyi = 0; yyi < (Count); yyi++)   \
            (Dst)[yyi] = (Src)[yyi];            \
        }                                       \
      while (0)
#  endif
# endif
#endif /* !YYCOPY_NEEDED */

/* YYFINAL -- State number of the termination state.  */
#define YYFINAL  5
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   343

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  49
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  25
/* YYNRULES -- Number of rules.  */
#define YYNRULES  71
/* YYNSTATES -- Number of states.  */
#define YYNSTATES  162

/* YYMAXUTOK -- Last valid token kind.  */
#define YYMAXUTOK   293


/* YYTRANSLATE(TOKEN-NUM) -- Symbol number corresponding to TOKEN-NUM
   as returned by yylex, with out-of-bounds checking.  */
#define YYTRANSLATE(YYX)                                \
  (0 <= (YYX) && (YYX) <= YYMAXUTOK                     \
   ? YY_CAST (yysymbol_kind_t, yytranslate[YYX])        \
   : YYSYMBOL_YYUNDEF)

/* YYTRANSLATE[TOKEN-NUM] -- Symbol number corresponding to TOKEN-NUM
   as returned by yylex.  */
static const yytype_int8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
      40,    43,     2,     2,    46,     2,    48,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,    45,
       2,    47,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    41,     2,    42,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    39,     2,    44,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     1,     2,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      15,    16,    17,    18,    19,    20,    21,    22,    23,    24,
      25,    26,    27,    28,    29,    30,    31,    32,    33,    34,
      35,    36,    37,    38
};

#if YYDEBUG
/* YYRLINE[YYN] -- Source line where rule number YYN was defined.  */
static const yytype_int16 yyrline[] =
{
       0,    73,    73,    80,   100,   109,   115,   120,   125,   131,
     140,   144,   148,   154,   159,   163,   167,   172,   176,   182,
     187,   192,   196,   203,   207,   218,   223,   231,   235,   239,
     249,   254,   260,   271,   276,   281,   286,   291,   298,   303,
     312,   318,   324,   330,   336,   342,   348,   354,   360,   366,
     372,   379,   385,   391,   398,   402,   406,   410,   414,   419,
     424,   429,   433,   437,   441,   445,   452,   456,   461,   466,
     471,   476
};
#endif

/** Accessing symbol of state STATE.  */
#define YY_ACCESSING_SYMBOL(State) YY_CAST (yysymbol_kind_t, yystos[State])

#if YYDEBUG || 0
/* The user-facing name of the symbol whose (internal) number is
   YYSYMBOL.  No bounds checking.  */
static const char *yysymbol_name (yysymbol_kind_t yysymbol) YY_ATTRIBUTE_UNUSED;

/* YYTNAME[SYMBOL-NUM] -- String name of the symbol SYMBOL-NUM.
   First, the terminals, then, starting at YYNTOKENS, nonterminals.  */
static const char *const yytname[] =
{
  "\"end of file\"", "error", "\"invalid token\"", "TOK_AND", "TOK_OR",
  "TOK_LESS", "TOK_GREAT", "TOK_LEQ", "TOK_GREQ", "TOK_NEQ", "TOK_EQ",
  "TOK_PLUS", "TOK_MINUS", "TOK_MULT", "TOK_DIV", "TOK_NOT", "KW_BOOLEAN",
  "KW_CLASS", "KW_FALSE", "KW_INT", "MAIN", "KW_PUBLIC", "KW_TRUE",
  "KW_VOID", "KW_IF", "KW_ELSE", "KW_RETURN", "KW_WHILE", "KW_LENGTH",
  "KW_STATIC", "KW_STRING", "KW_NEW", "KW_PRIVATE", "SYSTEM_OUT_PRINT",
  "SYSTEM_OUT_PRINTLN", "INTEGER_PARSE_INT", "INTEGER_LITERAL",
  "STRING_LITERAL", "ID", "'{'", "'('", "'['", "']'", "')'", "'}'", "';'",
  "','", "'='", "'.'", "$accept", "Program", "MainClass", "VarDecl",
  "StaticVarDecl", "StaticVarDeclList", "VarDeclExpList", "Statement",
  "StatementList", "LeftValue", "Index", "Type", "PrimeType", "MethodCall",
  "StaticMethodDecl", "StaticMethodDeclList", "FormalList", "Arg",
  "ArgList", "Exp", "Term", "Factor", "ExpDecl", "ExpList", "ExpTail", YY_NULLPTR
};

static const char *
yysymbol_name (yysymbol_kind_t yysymbol)
{
  return yytname[yysymbol];
}
#endif

#define YYPACT_NINF (-115)

#define yypact_value_is_default(Yyn) \
  ((Yyn) == YYPACT_NINF)

#define YYTABLE_NINF (-1)

#define yytable_value_is_error(Yyn) \
  0

/* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
   STATE-NUM.  */
static const yytype_int16 yypact[] =
{
       2,    -7,    42,  -115,     1,  -115,  -115,    12,    20,  -115,
      43,    60,    58,  -115,  -115,  -115,  -115,  -115,    -5,  -115,
      61,    45,    52,   129,    40,    17,   104,  -115,   112,   114,
      17,    17,    17,  -115,  -115,    60,   115,  -115,  -115,    18,
      17,   109,  -115,   331,    72,  -115,   120,   117,   130,    60,
    -115,  -115,  -115,   124,    17,    17,    17,   125,   116,   140,
      17,    17,    17,    17,    17,    17,    17,    17,    17,    17,
      17,    17,    45,  -115,   132,    62,   131,   193,   125,   126,
      -1,   134,   207,    17,  -115,  -115,   216,   226,    93,    93,
      93,    93,    93,    93,    72,    72,  -115,  -115,   104,   199,
    -115,   139,    60,  -115,  -115,    17,  -115,  -115,  -115,   247,
    -115,   204,  -115,   193,    -1,  -115,   200,   244,  -115,  -115,
     205,   206,    17,   208,   221,   222,  -115,  -115,  -115,  -115,
     198,   202,  -115,    17,    63,    17,    17,    17,   268,    17,
    -115,   289,   136,  -115,   177,   187,   197,  -115,   106,   220,
     137,   137,   224,   227,  -115,  -115,   240,  -115,  -115,  -115,
     137,  -115
};

/* YYDEFACT[STATE-NUM] -- Default reduction number in state STATE-NUM.
   Performed when YYTABLE does not specify something else to do.  Zero
   means the default is an error.  */
static const yytype_int8 yydefact[] =
{
       0,     0,     0,     2,     0,     1,     7,    34,     0,     6,
       0,     0,     0,    33,    28,    27,    29,     5,     0,    25,
       0,    67,     0,     0,     0,     0,     9,    26,     0,     0,
       0,     0,     0,    57,    56,     0,     0,    54,    55,    21,
       0,    62,    64,    66,    50,    53,     0,     0,     0,    36,
      59,    60,    58,     0,     0,    69,     0,    22,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    67,     4,     0,     0,     0,    39,    65,     0,
      71,     0,     0,     0,    61,    63,    42,    43,    44,    45,
      46,    47,    49,    48,    40,    41,    51,    52,     9,     0,
      37,     0,     0,    35,    31,     0,    68,    30,    23,     0,
       8,     0,    20,    39,    71,    24,     0,     0,    38,    70,
       0,     0,     0,     0,     0,     0,    20,    32,    10,    19,
       0,     0,    20,     0,     0,     0,     0,     0,     0,     0,
      18,     0,     0,    17,     0,     0,     0,    11,     0,     0,
       0,     0,     0,     0,    16,     3,     0,    13,    15,    14,
       0,    12
};

/* YYPGOTO[NTERM-NUM].  */
static const yytype_int16 yypgoto[] =
{
    -115,  -115,  -115,   255,  -115,  -115,   169,   -62,  -114,  -104,
     223,   -19,   238,  -100,  -115,  -115,  -115,   173,   167,   -40,
      38,    31,   209,  -115,   171
};

/* YYDEFGOTO[NTERM-NUM].  */
static const yytype_uint8 yydefgoto[] =
{
       0,     2,     3,   128,     9,     7,    47,   129,   117,    41,
      57,    18,    19,    42,    13,    10,    76,    77,   103,    43,
      44,    45,    26,    81,   106
};

/* YYTABLE[YYPACT[STATE-NUM]] -- What to do in state STATE-NUM.  If
   positive, shift that token.  If negative, reduce the rule whose
   number is the opposite.  If YYTABLE_NINF, syntax error.  */
static const yytype_uint8 yytable[] =
{
      58,    24,    60,    61,    62,    63,    64,    65,    66,    67,
      68,    69,   138,   130,    79,    80,    82,   131,   141,     1,
      86,    87,    88,    89,    90,    91,    92,    93,    30,    31,
      75,     4,    32,    21,   130,    33,    22,   130,   131,    34,
       6,   131,     5,   109,     8,   105,   130,   130,    35,    11,
     131,   131,    36,    37,    38,    39,   130,    40,    55,    56,
     131,    50,    51,    52,    12,   114,    60,    61,    62,    63,
      64,    65,    66,    67,    68,    69,    14,    14,    29,    15,
      15,    22,   134,    75,    23,    70,    71,    20,   156,   157,
      16,    16,    25,   142,    27,   144,   145,   146,   161,   148,
     100,    96,    97,    22,    68,    69,    94,    95,   143,    60,
      61,    62,    63,    64,    65,    66,    67,    68,    69,    60,
      61,    62,    63,    64,    65,    66,    67,    68,    69,    60,
      61,    62,    63,    64,    65,    66,    67,    68,    69,    60,
      61,    62,    63,    64,    65,    66,    67,    68,    69,    28,
      46,   154,    48,    14,    49,    54,    15,    59,    72,    84,
      74,   121,    73,   122,   123,    56,    83,    16,    85,   104,
     124,   125,    36,    99,   101,    39,   126,   107,   112,   150,
      60,    61,    62,    63,    64,    65,    66,    67,    68,    69,
      60,    61,    62,    63,    64,    65,    66,    67,    68,    69,
      60,    61,    62,    63,    64,    65,    66,    67,    68,    69,
      60,    61,    62,    63,    64,    65,    66,    67,    68,    69,
     151,    62,    63,    64,    65,    66,    67,    68,    69,    60,
     152,    62,    63,    64,    65,    66,    67,    68,    69,   102,
     153,   111,   116,   120,   132,   139,   133,   140,   135,   108,
      60,    61,    62,    63,    64,    65,    66,    67,    68,    69,
      14,   136,   137,    15,   155,   160,    17,   110,   121,   158,
     122,   123,   159,    53,    16,   113,    78,   124,   125,    36,
     118,    98,    39,   126,    14,   119,     0,    15,   127,   115,
       0,     0,   121,     0,   122,   123,     0,     0,    16,     0,
       0,   124,   125,    36,     0,    14,    39,   126,    15,     0,
       0,     0,   147,   121,     0,   122,   123,     0,     0,    16,
       0,     0,   124,   125,    36,     0,     0,    39,   126,     0,
       0,     0,     0,   149,    60,    61,    62,    63,    64,    65,
      66,    67,    68,    69
};

static const yytype_int16 yycheck[] =
{
      40,    20,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,   126,   117,    54,    55,    56,   117,   132,    17,
      60,    61,    62,    63,    64,    65,    66,    67,    11,    12,
      49,    38,    15,    38,   138,    18,    41,   141,   138,    22,
      39,   141,     0,    83,    32,    46,   150,   151,    31,    29,
     150,   151,    35,    36,    37,    38,   160,    40,    40,    41,
     160,    30,    31,    32,    21,   105,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    16,    16,    38,    19,
      19,    41,   122,   102,    23,    13,    14,    29,   150,   151,
      30,    30,    47,   133,    42,   135,   136,   137,   160,   139,
      38,    70,    71,    41,    11,    12,    68,    69,    45,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    20,
      46,    45,    40,    16,    40,    40,    19,    48,    38,    43,
      30,    24,    45,    26,    27,    41,    41,    30,    28,    43,
      33,    34,    35,    41,    43,    38,    39,    43,    39,    43,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      43,     5,     6,     7,     8,     9,    10,    11,    12,     3,
      43,     5,     6,     7,     8,     9,    10,    11,    12,    46,
      43,    42,    38,    43,    39,    47,    40,    45,    40,    42,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      16,    40,    40,    19,    44,    25,    11,    98,    24,    45,
      26,    27,    45,    35,    30,   102,    53,    33,    34,    35,
     113,    72,    38,    39,    16,   114,    -1,    19,    44,    42,
      -1,    -1,    24,    -1,    26,    27,    -1,    -1,    30,    -1,
      -1,    33,    34,    35,    -1,    16,    38,    39,    19,    -1,
      -1,    -1,    44,    24,    -1,    26,    27,    -1,    -1,    30,
      -1,    -1,    33,    34,    35,    -1,    -1,    38,    39,    -1,
      -1,    -1,    -1,    44,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12
};

/* YYSTOS[STATE-NUM] -- The symbol kind of the accessing symbol of
   state STATE-NUM.  */
static const yytype_int8 yystos[] =
{
       0,    17,    50,    51,    38,     0,    39,    54,    32,    53,
      64,    29,    21,    63,    16,    19,    30,    52,    60,    61,
      29,    38,    41,    23,    60,    47,    71,    42,    20,    38,
      11,    12,    15,    18,    22,    31,    35,    36,    37,    38,
      40,    58,    62,    68,    69,    70,    46,    55,    40,    40,
      70,    70,    70,    61,    40,    40,    41,    59,    68,    48,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    38,    45,    30,    60,    65,    66,    59,    68,
      68,    72,    68,    41,    43,    28,    68,    68,    68,    68,
      68,    68,    68,    68,    69,    69,    70,    70,    71,    41,
      38,    43,    46,    67,    43,    46,    73,    43,    42,    68,
      55,    42,    39,    66,    68,    42,    38,    57,    67,    73,
      43,    24,    26,    27,    33,    34,    39,    44,    52,    56,
      58,    62,    39,    40,    68,    40,    40,    40,    57,    47,
      45,    57,    68,    45,    68,    68,    68,    44,    68,    44,
      43,    43,    43,    43,    45,    44,    56,    56,    45,    45,
      25,    56
};

/* YYR1[RULE-NUM] -- Symbol kind of the left-hand side of rule RULE-NUM.  */
static const yytype_int8 yyr1[] =
{
       0,    49,    50,    51,    52,    53,    54,    54,    55,    55,
      56,    56,    56,    56,    56,    56,    56,    56,    56,    57,
      57,    58,    58,    59,    59,    60,    60,    61,    61,    61,
      62,    62,    63,    64,    64,    65,    65,    66,    67,    67,
      68,    68,    68,    68,    68,    68,    68,    68,    68,    68,
      68,    69,    69,    69,    70,    70,    70,    70,    70,    70,
      70,    70,    70,    70,    70,    70,    71,    71,    72,    72,
      73,    73
};

/* YYR2[RULE-NUM] -- Number of symbols on the right-hand side of rule RULE-NUM.  */
static const yytype_int8 yyr2[] =
{
       0,     2,     1,    19,     5,     3,     2,     0,     4,     0,
       1,     3,     7,     5,     5,     5,     4,     3,     2,     2,
       0,     1,     2,     3,     4,     1,     3,     1,     1,     1,
       4,     4,    10,     2,     0,     2,     0,     2,     3,     0,
       3,     3,     3,     3,     3,     3,     3,     3,     3,     3,
       1,     3,     3,     1,     1,     1,     1,     1,     2,     2,
       2,     3,     1,     3,     1,     3,     2,     0,     2,     0,
       3,     0
};


enum { YYENOMEM = -2 };

#define yyerrok         (yyerrstatus = 0)
#define yyclearin       (yychar = YYEMPTY)

#define YYACCEPT        goto yyacceptlab
#define YYABORT         goto yyabortlab
#define YYERROR         goto yyerrorlab
#define YYNOMEM         goto yyexhaustedlab


#define YYRECOVERING()  (!!yyerrstatus)

#define YYBACKUP(Token, Value)                                    \
  do                                                              \
    if (yychar == YYEMPTY)                                        \
      {                                                           \
        yychar = (Token);                                         \
        yylval = (Value);                                         \
        YYPOPSTACK (yylen);                                       \
        yystate = *yyssp;                                         \
        goto yybackup;                                            \
      }                                                           \
    else                                                          \
      {                                                           \
        yyerror (YY_("syntax error: cannot back up")); \
        YYERROR;                                                  \
      }                                                           \
  while (0)

/* Backward compatibility with an undocumented macro.
   Use YYerror or YYUNDEF. */
#define YYERRCODE YYUNDEF


/* Enable debugging if requested.  */
#if YYDEBUG

# ifndef YYFPRINTF
#  include <stdio.h> /* INFRINGES ON USER NAME SPACE */
#  define YYFPRINTF fprintf
# endif

# define YYDPRINTF(Args)                        \
do {                                            \
  if (yydebug)                                  \
    YYFPRINTF Args;                             \
} while (0)




# define YY_SYMBOL_PRINT(Title, Kind, Value, Location)                    \
do {                                                                      \
  if (yydebug)                                                            \
    {                                                                     \
      YYFPRINTF (stderr, "%s ", Title);                                   \
      yy_symbol_print (stderr,                                            \
                  Kind, Value); \
      YYFPRINTF (stderr, "\n");                                           \
    }                                                                     \
} while (0)


/*-----------------------------------.
| Print this symbol's value on YYO.  |
`-----------------------------------*/

static void
yy_symbol_value_print (FILE *yyo,
                       yysymbol_kind_t yykind, YYSTYPE const * const yyvaluep)
{
  FILE *yyoutput = yyo;
  YY_USE (yyoutput);
  if (!yyvaluep)
    return;
  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  YY_USE (yykind);
  YY_IGNORE_MAYBE_UNINITIALIZED_END
}


/*---------------------------.
| Print this symbol on YYO.  |
`---------------------------*/

static void
yy_symbol_print (FILE *yyo,
                 yysymbol_kind_t yykind, YYSTYPE const * const yyvaluep)
{
  YYFPRINTF (yyo, "%s %s (",
             yykind < YYNTOKENS ? "token" : "nterm", yysymbol_name (yykind));

  yy_symbol_value_print (yyo, yykind, yyvaluep);
  YYFPRINTF (yyo, ")");
}

/*------------------------------------------------------------------.
| yy_stack_print -- Print the state stack from its BOTTOM up to its |
| TOP (included).                                                   |
`------------------------------------------------------------------*/

static void
yy_stack_print (yy_state_t *yybottom, yy_state_t *yytop)
{
  YYFPRINTF (stderr, "Stack now");
  for (; yybottom <= yytop; yybottom++)
    {
      int yybot = *yybottom;
      YYFPRINTF (stderr, " %d", yybot);
    }
  YYFPRINTF (stderr, "\n");
}

# define YY_STACK_PRINT(Bottom, Top)                            \
do {                                                            \
  if (yydebug)                                                  \
    yy_stack_print ((Bottom), (Top));                           \
} while (0)


/*------------------------------------------------.
| Report that the YYRULE is going to be reduced.  |
`------------------------------------------------*/

static void
yy_reduce_print (yy_state_t *yyssp, YYSTYPE *yyvsp,
                 int yyrule)
{
  int yylno = yyrline[yyrule];
  int yynrhs = yyr2[yyrule];
  int yyi;
  YYFPRINTF (stderr, "Reducing stack by rule %d (line %d):\n",
             yyrule - 1, yylno);
  /* The symbols being reduced.  */
  for (yyi = 0; yyi < yynrhs; yyi++)
    {
      YYFPRINTF (stderr, "   $%d = ", yyi + 1);
      yy_symbol_print (stderr,
                       YY_ACCESSING_SYMBOL (+yyssp[yyi + 1 - yynrhs]),
                       &yyvsp[(yyi + 1) - (yynrhs)]);
      YYFPRINTF (stderr, "\n");
    }
}

# define YY_REDUCE_PRINT(Rule)          \
do {                                    \
  if (yydebug)                          \
    yy_reduce_print (yyssp, yyvsp, Rule); \
} while (0)

/* Nonzero means print parse trace.  It is left uninitialized so that
   multiple parsers can coexist.  */
int yydebug;
#else /* !YYDEBUG */
# define YYDPRINTF(Args) ((void) 0)
# define YY_SYMBOL_PRINT(Title, Kind, Value, Location)
# define YY_STACK_PRINT(Bottom, Top)
# define YY_REDUCE_PRINT(Rule)
#endif /* !YYDEBUG */


/* YYINITDEPTH -- initial size of the parser's stacks.  */
#ifndef YYINITDEPTH
# define YYINITDEPTH 200
#endif

/* YYMAXDEPTH -- maximum size the stacks can grow to (effective only
   if the built-in stack extension method is used).

   Do not make this value too large; the results are undefined if
   YYSTACK_ALLOC_MAXIMUM < YYSTACK_BYTES (YYMAXDEPTH)
   evaluated with infinite-precision integer arithmetic.  */

#ifndef YYMAXDEPTH
# define YYMAXDEPTH 10000
#endif






/*-----------------------------------------------.
| Release the memory associated to this symbol.  |
`-----------------------------------------------*/

static void
yydestruct (const char *yymsg,
            yysymbol_kind_t yykind, YYSTYPE *yyvaluep)
{
  YY_USE (yyvaluep);
  if (!yymsg)
    yymsg = "Deleting";
  YY_SYMBOL_PRINT (yymsg, yykind, yyvaluep, yylocationp);

  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  YY_USE (yykind);
  YY_IGNORE_MAYBE_UNINITIALIZED_END
}


/* Lookahead token kind.  */
int yychar;

/* The semantic value of the lookahead symbol.  */
YYSTYPE yylval;
/* Number of syntax errors so far.  */
int yynerrs;




/*----------.
| yyparse.  |
`----------*/

int
yyparse (void)
{
    yy_state_fast_t yystate = 0;
    /* Number of tokens to shift before error messages enabled.  */
    int yyerrstatus = 0;

    /* Refer to the stacks through separate pointers, to allow yyoverflow
       to reallocate them elsewhere.  */

    /* Their size.  */
    YYPTRDIFF_T yystacksize = YYINITDEPTH;

    /* The state stack: array, bottom, top.  */
    yy_state_t yyssa[YYINITDEPTH];
    yy_state_t *yyss = yyssa;
    yy_state_t *yyssp = yyss;

    /* The semantic value stack: array, bottom, top.  */
    YYSTYPE yyvsa[YYINITDEPTH];
    YYSTYPE *yyvs = yyvsa;
    YYSTYPE *yyvsp = yyvs;

  int yyn;
  /* The return value of yyparse.  */
  int yyresult;
  /* Lookahead symbol kind.  */
  yysymbol_kind_t yytoken = YYSYMBOL_YYEMPTY;
  /* The variables used to return semantic value and location from the
     action routines.  */
  YYSTYPE yyval;



#define YYPOPSTACK(N)   (yyvsp -= (N), yyssp -= (N))

  /* The number of symbols on the RHS of the reduced rule.
     Keep to zero when no symbol should be popped.  */
  int yylen = 0;

  YYDPRINTF ((stderr, "Starting parse\n"));

  yychar = YYEMPTY; /* Cause a token to be read.  */

  goto yysetstate;


/*------------------------------------------------------------.
| yynewstate -- push a new state, which is found in yystate.  |
`------------------------------------------------------------*/
yynewstate:
  /* In all cases, when you get here, the value and location stacks
     have just been pushed.  So pushing a state here evens the stacks.  */
  yyssp++;


/*--------------------------------------------------------------------.
| yysetstate -- set current state (the top of the stack) to yystate.  |
`--------------------------------------------------------------------*/
yysetstate:
  YYDPRINTF ((stderr, "Entering state %d\n", yystate));
  YY_ASSERT (0 <= yystate && yystate < YYNSTATES);
  YY_IGNORE_USELESS_CAST_BEGIN
  *yyssp = YY_CAST (yy_state_t, yystate);
  YY_IGNORE_USELESS_CAST_END
  YY_STACK_PRINT (yyss, yyssp);

  if (yyss + yystacksize - 1 <= yyssp)
#if !defined yyoverflow && !defined YYSTACK_RELOCATE
    YYNOMEM;
#else
    {
      /* Get the current used size of the three stacks, in elements.  */
      YYPTRDIFF_T yysize = yyssp - yyss + 1;

# if defined yyoverflow
      {
        /* Give user a chance to reallocate the stack.  Use copies of
           these so that the &'s don't force the real ones into
           memory.  */
        yy_state_t *yyss1 = yyss;
        YYSTYPE *yyvs1 = yyvs;

        /* Each stack pointer address is followed by the size of the
           data in use in that stack, in bytes.  This used to be a
           conditional around just the two extra args, but that might
           be undefined if yyoverflow is a macro.  */
        yyoverflow (YY_("memory exhausted"),
                    &yyss1, yysize * YYSIZEOF (*yyssp),
                    &yyvs1, yysize * YYSIZEOF (*yyvsp),
                    &yystacksize);
        yyss = yyss1;
        yyvs = yyvs1;
      }
# else /* defined YYSTACK_RELOCATE */
      /* Extend the stack our own way.  */
      if (YYMAXDEPTH <= yystacksize)
        YYNOMEM;
      yystacksize *= 2;
      if (YYMAXDEPTH < yystacksize)
        yystacksize = YYMAXDEPTH;

      {
        yy_state_t *yyss1 = yyss;
        union yyalloc *yyptr =
          YY_CAST (union yyalloc *,
                   YYSTACK_ALLOC (YY_CAST (YYSIZE_T, YYSTACK_BYTES (yystacksize))));
        if (! yyptr)
          YYNOMEM;
        YYSTACK_RELOCATE (yyss_alloc, yyss);
        YYSTACK_RELOCATE (yyvs_alloc, yyvs);
#  undef YYSTACK_RELOCATE
        if (yyss1 != yyssa)
          YYSTACK_FREE (yyss1);
      }
# endif

      yyssp = yyss + yysize - 1;
      yyvsp = yyvs + yysize - 1;

      YY_IGNORE_USELESS_CAST_BEGIN
      YYDPRINTF ((stderr, "Stack size increased to %ld\n",
                  YY_CAST (long, yystacksize)));
      YY_IGNORE_USELESS_CAST_END

      if (yyss + yystacksize - 1 <= yyssp)
        YYABORT;
    }
#endif /* !defined yyoverflow && !defined YYSTACK_RELOCATE */


  if (yystate == YYFINAL)
    YYACCEPT;

  goto yybackup;


/*-----------.
| yybackup.  |
`-----------*/
yybackup:
  /* Do appropriate processing given the current state.  Read a
     lookahead token if we need one and don't already have one.  */

  /* First try to decide what to do without reference to lookahead token.  */
  yyn = yypact[yystate];
  if (yypact_value_is_default (yyn))
    goto yydefault;

  /* Not known => get a lookahead token if don't already have one.  */

  /* YYCHAR is either empty, or end-of-input, or a valid lookahead.  */
  if (yychar == YYEMPTY)
    {
      YYDPRINTF ((stderr, "Reading a token\n"));
      yychar = yylex ();
    }

  if (yychar <= YYEOF)
    {
      yychar = YYEOF;
      yytoken = YYSYMBOL_YYEOF;
      YYDPRINTF ((stderr, "Now at end of input.\n"));
    }
  else if (yychar == YYerror)
    {
      /* The scanner already issued an error message, process directly
         to error recovery.  But do not keep the error token as
         lookahead, it is too special and may lead us to an endless
         loop in error recovery. */
      yychar = YYUNDEF;
      yytoken = YYSYMBOL_YYerror;
      goto yyerrlab1;
    }
  else
    {
      yytoken = YYTRANSLATE (yychar);
      YY_SYMBOL_PRINT ("Next token is", yytoken, &yylval, &yylloc);
    }

  /* If the proper action on seeing token YYTOKEN is to reduce or to
     detect an error, take that action.  */
  yyn += yytoken;
  if (yyn < 0 || YYLAST < yyn || yycheck[yyn] != yytoken)
    goto yydefault;
  yyn = yytable[yyn];
  if (yyn <= 0)
    {
      if (yytable_value_is_error (yyn))
        goto yyerrlab;
      yyn = -yyn;
      goto yyreduce;
    }

  /* Count tokens shifted since error; after three, turn off error
     status.  */
  if (yyerrstatus)
    yyerrstatus--;

  /* Shift the lookahead token.  */
  YY_SYMBOL_PRINT ("Shifting", yytoken, &yylval, &yylloc);
  yystate = yyn;
  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  *++yyvsp = yylval;
  YY_IGNORE_MAYBE_UNINITIALIZED_END

  /* Discard the shifted token.  */
  yychar = YYEMPTY;
  goto yynewstate;


/*-----------------------------------------------------------.
| yydefault -- do the default action for the current state.  |
`-----------------------------------------------------------*/
yydefault:
  yyn = yydefact[yystate];
  if (yyn == 0)
    goto yyerrlab;
  goto yyreduce;


/*-----------------------------.
| yyreduce -- do a reduction.  |
`-----------------------------*/
yyreduce:
  /* yyn is the number of a rule to reduce with.  */
  yylen = yyr2[yyn];

  /* If YYLEN is nonzero, implement the default value of the action:
     '$$ = $1'.

     Otherwise, the following line sets YYVAL to garbage.
     This behavior is undocumented and Bison
     users should not rely upon it.  Assigning to YYVAL
     unconditionally makes the parser a bit smaller, and it avoids a
     GCC warning that YYVAL may be used uninitialized.  */
  yyval = yyvsp[1-yylen];


  YY_REDUCE_PRINT (yyn);
  switch (yyn)
    {
  case 2: /* Program: MainClass  */
#line 73 "parser.y"
              {   
        (yyval.node) = new_node(NODETYPE_PROGRAM, yylineno);
        root = (yyval.node);
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1422 "y.tab.c"
    break;

  case 3: /* MainClass: KW_CLASS ID '{' StaticVarDeclList StaticMethodDeclList KW_PUBLIC KW_STATIC KW_VOID MAIN '(' KW_STRING '[' ']' ID ')' '{' StatementList '}' '}'  */
#line 87 "parser.y"
    {   
        (yyval.node) = new_node(NODETYPE_MAINCLASS, yylineno);
        set_string_value((yyval.node), (yyvsp[-5].string));
        add_child((yyval.node), (yyvsp[-15].node));
        add_child((yyval.node), (yyvsp[-14].node));
        add_child((yyval.node), (yyvsp[-2].node));
    }
#line 1434 "y.tab.c"
    break;

  case 4: /* VarDecl: Type ID ExpDecl VarDeclExpList ';'  */
#line 100 "parser.y"
                                       {
        (yyval.node) = new_node(NODETYPE_VARDECL, yylineno);
        set_string_value((yyval.node), (yyvsp[-3].string));
        add_child((yyval.node), (yyvsp[-4].node));
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1446 "y.tab.c"
    break;

  case 5: /* StaticVarDecl: KW_PRIVATE KW_STATIC VarDecl  */
#line 109 "parser.y"
                                 {
        (yyval.node) = new_node(NODETYPE_STATICVARDECL, yylineno);
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1455 "y.tab.c"
    break;

  case 6: /* StaticVarDeclList: StaticVarDeclList StaticVarDecl  */
#line 115 "parser.y"
                                    {
        (yyval.node) = new_node(NODETYPE_STATICVARDECLLIST, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1465 "y.tab.c"
    break;

  case 7: /* StaticVarDeclList: %empty  */
#line 120 "parser.y"
      {
        (yyval.node) = new_node(NODETYPE_NULLABLE, yylineno);
    }
#line 1473 "y.tab.c"
    break;

  case 8: /* VarDeclExpList: ',' ID ExpDecl VarDeclExpList  */
#line 125 "parser.y"
                                  {
        (yyval.node) = new_node(NODETYPE_VARDECLEXPLIST, yylineno);
        set_string_value((yyval.node), (yyvsp[-2].string));
        add_child((yyval.node), (yyvsp[-1].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1484 "y.tab.c"
    break;

  case 9: /* VarDeclExpList: %empty  */
#line 131 "parser.y"
       {
        (yyval.node) = new_node(NODETYPE_NULLABLE, yylineno);
    }
#line 1492 "y.tab.c"
    break;

  case 10: /* Statement: VarDecl  */
#line 140 "parser.y"
            {
        (yyval.node) = new_node(NODETYPE_VARDECL, yylineno);
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1501 "y.tab.c"
    break;

  case 11: /* Statement: '{' StatementList '}'  */
#line 144 "parser.y"
                            {
        (yyval.node) = new_node(NODETYPE_STATEMENTLIST, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1510 "y.tab.c"
    break;

  case 12: /* Statement: KW_IF '(' Exp ')' Statement KW_ELSE Statement  */
#line 148 "parser.y"
                                                    {
        (yyval.node) = new_node(NODETYPE_IFELSE, yylineno);
        add_child((yyval.node), (yyvsp[-4].node));
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1521 "y.tab.c"
    break;

  case 13: /* Statement: KW_WHILE '(' Exp ')' Statement  */
#line 154 "parser.y"
                                     {
        (yyval.node) = new_node(NODETYPE_WHILE, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1531 "y.tab.c"
    break;

  case 14: /* Statement: SYSTEM_OUT_PRINTLN '(' Exp ')' ';'  */
#line 159 "parser.y"
                                         {
        (yyval.node) = new_node(NODETYPE_PRINTLN, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
    }
#line 1540 "y.tab.c"
    break;

  case 15: /* Statement: SYSTEM_OUT_PRINT '(' Exp ')' ';'  */
#line 163 "parser.y"
                                       {
        (yyval.node) = new_node(NODETYPE_PRINT, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
    }
#line 1549 "y.tab.c"
    break;

  case 16: /* Statement: LeftValue '=' Exp ';'  */
#line 167 "parser.y"
                            { 
        (yyval.node) = new_node(NODETYPE_REASSIGN, yylineno);
        add_child((yyval.node), (yyvsp[-3].node));
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1559 "y.tab.c"
    break;

  case 17: /* Statement: KW_RETURN Exp ';'  */
#line 172 "parser.y"
                        {
        (yyval.node) = new_node(NODETYPE_RETURN, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1568 "y.tab.c"
    break;

  case 18: /* Statement: MethodCall ';'  */
#line 176 "parser.y"
                     {
        (yyval.node) = new_node(NODETYPE_METHODCALL, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1577 "y.tab.c"
    break;

  case 19: /* StatementList: StatementList Statement  */
#line 182 "parser.y"
                            {
        (yyval.node) = new_node(NODETYPE_STATEMENTLIST, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1587 "y.tab.c"
    break;

  case 20: /* StatementList: %empty  */
#line 187 "parser.y"
      {
        (yyval.node) = new_node(NODETYPE_NULLABLE, yylineno);
    }
#line 1595 "y.tab.c"
    break;

  case 21: /* LeftValue: ID  */
#line 192 "parser.y"
       {
        (yyval.node) = new_node(NODETYPE_LEFTVALUE, yylineno);
        set_string_value((yyval.node), (yyvsp[0].string));
    }
#line 1604 "y.tab.c"
    break;

  case 22: /* LeftValue: ID Index  */
#line 196 "parser.y"
               {
        (yyval.node) = new_node(NODETYPE_LEFTVALUEINDEX, yylineno);
        set_string_value((yyval.node), (yyvsp[-1].string));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1614 "y.tab.c"
    break;

  case 23: /* Index: '[' Exp ']'  */
#line 203 "parser.y"
                {
        (yyval.node) = new_node(NODETYPE_INDEX, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1623 "y.tab.c"
    break;

  case 24: /* Index: Index '[' Exp ']'  */
#line 207 "parser.y"
                        {
        (yyval.node) = new_node(NODETYPE_INDEXLIST, yylineno);
        add_child((yyval.node), (yyvsp[-3].node));
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1633 "y.tab.c"
    break;

  case 25: /* Type: PrimeType  */
#line 218 "parser.y"
              {
        (yyval.node) = new_node(NODETYPE_TYPE, yylineno);
        (yyval.node) -> data.type = (yyvsp[0].node) -> data.type;
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1643 "y.tab.c"
    break;

  case 26: /* Type: Type '[' ']'  */
#line 223 "parser.y"
                   {
        (yyval.node) = new_node(NODETYPE_TYPE, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        (yyval.node) -> data.type = (yyvsp[-2].node) -> data.type;
        (yyval.node) -> data.num_indices = (yyvsp[-2].node) -> data.num_indices + 1;
    }
#line 1654 "y.tab.c"
    break;

  case 27: /* PrimeType: KW_INT  */
#line 231 "parser.y"
           {
        (yyval.node) = new_node(NODETYPE_PRIMETYPE, yylineno);
        (yyval.node) -> data.type = DATATYPE_INT;
    }
#line 1663 "y.tab.c"
    break;

  case 28: /* PrimeType: KW_BOOLEAN  */
#line 235 "parser.y"
                 {
        (yyval.node) = new_node(NODETYPE_PRIMETYPE, yylineno);
        (yyval.node) -> data.type = DATATYPE_BOOLEAN;
    }
#line 1672 "y.tab.c"
    break;

  case 29: /* PrimeType: KW_STRING  */
#line 239 "parser.y"
                {
        (yyval.node) = new_node(NODETYPE_PRIMETYPE, yylineno);
        (yyval.node) -> data.type = DATATYPE_STR;
    }
#line 1681 "y.tab.c"
    break;

  case 30: /* MethodCall: ID '(' ExpList ')'  */
#line 249 "parser.y"
                       {
        (yyval.node) = new_node(NODETYPE_METHODCALL, yylineno);
        set_string_value((yyval.node), (yyvsp[-3].string));
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1691 "y.tab.c"
    break;

  case 31: /* MethodCall: INTEGER_PARSE_INT '(' Exp ')'  */
#line 254 "parser.y"
                                    {
        (yyval.node) = new_node(NODETYPE_PARSEINT, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1700 "y.tab.c"
    break;

  case 32: /* StaticMethodDecl: KW_PUBLIC KW_STATIC Type ID '(' FormalList ')' '{' StatementList '}'  */
#line 262 "parser.y"
        {
        (yyval.node) = new_node(NODETYPE_STATICMETHODDECL, yylineno);
        set_string_value((yyval.node), (yyvsp[-6].string));
        add_child((yyval.node), (yyvsp[-7].node));
        add_child((yyval.node), (yyvsp[-4].node));
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1712 "y.tab.c"
    break;

  case 33: /* StaticMethodDeclList: StaticMethodDeclList StaticMethodDecl  */
#line 271 "parser.y"
                                          {
        (yyval.node) = new_node(NODETYPE_STATICMETHODDECLLIST, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1722 "y.tab.c"
    break;

  case 34: /* StaticMethodDeclList: %empty  */
#line 276 "parser.y"
      {
        (yyval.node) = new_node(NODETYPE_NULLABLE, yylineno);
    }
#line 1730 "y.tab.c"
    break;

  case 35: /* FormalList: Arg ArgList  */
#line 281 "parser.y"
                {
        (yyval.node) = new_node(NODETYPE_FORMALLIST, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1740 "y.tab.c"
    break;

  case 36: /* FormalList: %empty  */
#line 286 "parser.y"
      {
        (yyval.node) = new_node(NODETYPE_NULLABLE, yylineno);
    }
#line 1748 "y.tab.c"
    break;

  case 37: /* Arg: Type ID  */
#line 291 "parser.y"
            {
        (yyval.node) = new_node(NODETYPE_ARG, yylineno);
        set_string_value((yyval.node), (yyvsp[0].string));
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 1758 "y.tab.c"
    break;

  case 38: /* ArgList: ',' Arg ArgList  */
#line 298 "parser.y"
                    {
        (yyval.node) = new_node(NODETYPE_ARGLIST, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 1768 "y.tab.c"
    break;

  case 39: /* ArgList: %empty  */
#line 303 "parser.y"
      {
        (yyval.node) = new_node(NODETYPE_NULLABLE, yylineno);
    }
#line 1776 "y.tab.c"
    break;

  case 40: /* Exp: Exp TOK_PLUS Term  */
#line 312 "parser.y"
                      {
        (yyval.node) = new_node(NODETYPE_ADDOP, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1787 "y.tab.c"
    break;

  case 41: /* Exp: Exp TOK_MINUS Term  */
#line 318 "parser.y"
                         {
        (yyval.node) = new_node(NODETYPE_SUBOP, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));        
        // fill out other semantics
    }
#line 1798 "y.tab.c"
    break;

  case 42: /* Exp: Exp TOK_AND Exp  */
#line 324 "parser.y"
                      {
        (yyval.node) = new_node(NODETYPE_AND, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1809 "y.tab.c"
    break;

  case 43: /* Exp: Exp TOK_OR Exp  */
#line 330 "parser.y"
                     {
        (yyval.node) = new_node(NODETYPE_OR, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1820 "y.tab.c"
    break;

  case 44: /* Exp: Exp TOK_LESS Exp  */
#line 336 "parser.y"
                       {
        (yyval.node) = new_node(NODETYPE_COMPLESS, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1831 "y.tab.c"
    break;

  case 45: /* Exp: Exp TOK_GREAT Exp  */
#line 342 "parser.y"
                        {
        (yyval.node) = new_node(NODETYPE_COMPGREAT, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1842 "y.tab.c"
    break;

  case 46: /* Exp: Exp TOK_LEQ Exp  */
#line 348 "parser.y"
                      {
        (yyval.node) = new_node(NODETYPE_COMPLEQ, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1853 "y.tab.c"
    break;

  case 47: /* Exp: Exp TOK_GREQ Exp  */
#line 354 "parser.y"
                       {
        (yyval.node) = new_node(NODETYPE_COMPGREQ, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1864 "y.tab.c"
    break;

  case 48: /* Exp: Exp TOK_EQ Exp  */
#line 360 "parser.y"
                     {
        (yyval.node) = new_node(NODETYPE_COMPEQ, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1875 "y.tab.c"
    break;

  case 49: /* Exp: Exp TOK_NEQ Exp  */
#line 366 "parser.y"
                      {
        (yyval.node) = new_node(NODETYPE_COMPNEQ, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1886 "y.tab.c"
    break;

  case 50: /* Exp: Term  */
#line 372 "parser.y"
           {
        (yyval.node) = new_node(NODETYPE_TERM, yylineno);
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1896 "y.tab.c"
    break;

  case 51: /* Term: Term TOK_MULT Factor  */
#line 379 "parser.y"
                         {
        (yyval.node) = new_node(NODETYPE_MULOP, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1907 "y.tab.c"
    break;

  case 52: /* Term: Term TOK_DIV Factor  */
#line 385 "parser.y"
                          {
        (yyval.node) = new_node(NODETYPE_DIVOP, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1918 "y.tab.c"
    break;

  case 53: /* Term: Factor  */
#line 391 "parser.y"
             {
        (yyval.node) = new_node(NODETYPE_FACTOR, yylineno);
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1928 "y.tab.c"
    break;

  case 54: /* Factor: INTEGER_LITERAL  */
#line 398 "parser.y"
                    {
        (yyval.node) = new_node(NODETYPE_LITERAL, yylineno);
        set_int_value((yyval.node), (yyvsp[0].integer));
    }
#line 1937 "y.tab.c"
    break;

  case 55: /* Factor: STRING_LITERAL  */
#line 402 "parser.y"
                     {
        (yyval.node) = new_node(NODETYPE_LITERAL, yylineno);
        set_string_value((yyval.node), (yyvsp[0].string));
    }
#line 1946 "y.tab.c"
    break;

  case 56: /* Factor: KW_TRUE  */
#line 406 "parser.y"
              {
        (yyval.node) = new_node(NODETYPE_LITERAL, yylineno);
        set_boolean_value((yyval.node), true);
    }
#line 1955 "y.tab.c"
    break;

  case 57: /* Factor: KW_FALSE  */
#line 410 "parser.y"
               {
        (yyval.node) = new_node(NODETYPE_LITERAL, yylineno);
        set_boolean_value((yyval.node), false);
    }
#line 1964 "y.tab.c"
    break;

  case 58: /* Factor: TOK_NOT Factor  */
#line 414 "parser.y"
                     {
        (yyval.node) = new_node(NODETYPE_NOT, yylineno);
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1974 "y.tab.c"
    break;

  case 59: /* Factor: TOK_PLUS Factor  */
#line 419 "parser.y"
                      {
        (yyval.node) = new_node(NODETYPE_PLUSOP, yylineno);
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1984 "y.tab.c"
    break;

  case 60: /* Factor: TOK_MINUS Factor  */
#line 424 "parser.y"
                       {
        (yyval.node) = new_node(NODETYPE_MINUSOP, yylineno);
        add_child((yyval.node), (yyvsp[0].node));
        // fill out other semantics
    }
#line 1994 "y.tab.c"
    break;

  case 61: /* Factor: '(' Exp ')'  */
#line 429 "parser.y"
                  {
        (yyval.node) = new_node(NODETYPE_EXP, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
    }
#line 2003 "y.tab.c"
    break;

  case 62: /* Factor: LeftValue  */
#line 433 "parser.y"
                {
        (yyval.node) = new_node(NODETYPE_LEFTVALUE, yylineno);
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 2012 "y.tab.c"
    break;

  case 63: /* Factor: LeftValue '.' KW_LENGTH  */
#line 437 "parser.y"
                              {
        (yyval.node) = new_node(NODETYPE_LENGTH, yylineno);
        add_child((yyval.node), (yyvsp[-2].node));
    }
#line 2021 "y.tab.c"
    break;

  case 64: /* Factor: MethodCall  */
#line 441 "parser.y"
                 {
        (yyval.node) = new_node(NODETYPE_METHODCALL, yylineno);
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 2030 "y.tab.c"
    break;

  case 65: /* Factor: KW_NEW PrimeType Index  */
#line 445 "parser.y"
                             {
        (yyval.node) = new_node(NODETYPE_ARRAY, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 2040 "y.tab.c"
    break;

  case 66: /* ExpDecl: '=' Exp  */
#line 452 "parser.y"
            {
        (yyval.node) = new_node(NODETYPE_EXPDECL, yylineno);
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 2049 "y.tab.c"
    break;

  case 67: /* ExpDecl: %empty  */
#line 456 "parser.y"
      {
        (yyval.node) = new_node(NODETYPE_NULLABLE, yylineno);
    }
#line 2057 "y.tab.c"
    break;

  case 68: /* ExpList: Exp ExpTail  */
#line 461 "parser.y"
                {
        (yyval.node) = new_node(NODETYPE_EXPLIST, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 2067 "y.tab.c"
    break;

  case 69: /* ExpList: %empty  */
#line 466 "parser.y"
      {
        (yyval.node) = new_node(NODETYPE_NULLABLE, yylineno);
    }
#line 2075 "y.tab.c"
    break;

  case 70: /* ExpTail: ',' Exp ExpTail  */
#line 471 "parser.y"
                    {
        (yyval.node) = new_node(NODETYPE_EXPTAIL, yylineno);
        add_child((yyval.node), (yyvsp[-1].node));
        add_child((yyval.node), (yyvsp[0].node));
    }
#line 2085 "y.tab.c"
    break;

  case 71: /* ExpTail: %empty  */
#line 476 "parser.y"
      {
        (yyval.node) = new_node(NODETYPE_NULLABLE, yylineno);
    }
#line 2093 "y.tab.c"
    break;


#line 2097 "y.tab.c"

      default: break;
    }
  /* User semantic actions sometimes alter yychar, and that requires
     that yytoken be updated with the new translation.  We take the
     approach of translating immediately before every use of yytoken.
     One alternative is translating here after every semantic action,
     but that translation would be missed if the semantic action invokes
     YYABORT, YYACCEPT, or YYERROR immediately after altering yychar or
     if it invokes YYBACKUP.  In the case of YYABORT or YYACCEPT, an
     incorrect destructor might then be invoked immediately.  In the
     case of YYERROR or YYBACKUP, subsequent parser actions might lead
     to an incorrect destructor call or verbose syntax error message
     before the lookahead is translated.  */
  YY_SYMBOL_PRINT ("-> $$ =", YY_CAST (yysymbol_kind_t, yyr1[yyn]), &yyval, &yyloc);

  YYPOPSTACK (yylen);
  yylen = 0;

  *++yyvsp = yyval;

  /* Now 'shift' the result of the reduction.  Determine what state
     that goes to, based on the state we popped back to and the rule
     number reduced by.  */
  {
    const int yylhs = yyr1[yyn] - YYNTOKENS;
    const int yyi = yypgoto[yylhs] + *yyssp;
    yystate = (0 <= yyi && yyi <= YYLAST && yycheck[yyi] == *yyssp
               ? yytable[yyi]
               : yydefgoto[yylhs]);
  }

  goto yynewstate;


/*--------------------------------------.
| yyerrlab -- here on detecting error.  |
`--------------------------------------*/
yyerrlab:
  /* Make sure we have latest lookahead translation.  See comments at
     user semantic actions for why this is necessary.  */
  yytoken = yychar == YYEMPTY ? YYSYMBOL_YYEMPTY : YYTRANSLATE (yychar);
  /* If not already recovering from an error, report this error.  */
  if (!yyerrstatus)
    {
      ++yynerrs;
      yyerror (YY_("syntax error"));
    }

  if (yyerrstatus == 3)
    {
      /* If just tried and failed to reuse lookahead token after an
         error, discard it.  */

      if (yychar <= YYEOF)
        {
          /* Return failure if at end of input.  */
          if (yychar == YYEOF)
            YYABORT;
        }
      else
        {
          yydestruct ("Error: discarding",
                      yytoken, &yylval);
          yychar = YYEMPTY;
        }
    }

  /* Else will try to reuse lookahead token after shifting the error
     token.  */
  goto yyerrlab1;


/*---------------------------------------------------.
| yyerrorlab -- error raised explicitly by YYERROR.  |
`---------------------------------------------------*/
yyerrorlab:
  /* Pacify compilers when the user code never invokes YYERROR and the
     label yyerrorlab therefore never appears in user code.  */
  if (0)
    YYERROR;
  ++yynerrs;

  /* Do not reclaim the symbols of the rule whose action triggered
     this YYERROR.  */
  YYPOPSTACK (yylen);
  yylen = 0;
  YY_STACK_PRINT (yyss, yyssp);
  yystate = *yyssp;
  goto yyerrlab1;


/*-------------------------------------------------------------.
| yyerrlab1 -- common code for both syntax error and YYERROR.  |
`-------------------------------------------------------------*/
yyerrlab1:
  yyerrstatus = 3;      /* Each real token shifted decrements this.  */

  /* Pop stack until we find a state that shifts the error token.  */
  for (;;)
    {
      yyn = yypact[yystate];
      if (!yypact_value_is_default (yyn))
        {
          yyn += YYSYMBOL_YYerror;
          if (0 <= yyn && yyn <= YYLAST && yycheck[yyn] == YYSYMBOL_YYerror)
            {
              yyn = yytable[yyn];
              if (0 < yyn)
                break;
            }
        }

      /* Pop the current state because it cannot handle the error token.  */
      if (yyssp == yyss)
        YYABORT;


      yydestruct ("Error: popping",
                  YY_ACCESSING_SYMBOL (yystate), yyvsp);
      YYPOPSTACK (1);
      yystate = *yyssp;
      YY_STACK_PRINT (yyss, yyssp);
    }

  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  *++yyvsp = yylval;
  YY_IGNORE_MAYBE_UNINITIALIZED_END


  /* Shift the error token.  */
  YY_SYMBOL_PRINT ("Shifting", YY_ACCESSING_SYMBOL (yyn), yyvsp, yylsp);

  yystate = yyn;
  goto yynewstate;


/*-------------------------------------.
| yyacceptlab -- YYACCEPT comes here.  |
`-------------------------------------*/
yyacceptlab:
  yyresult = 0;
  goto yyreturnlab;


/*-----------------------------------.
| yyabortlab -- YYABORT comes here.  |
`-----------------------------------*/
yyabortlab:
  yyresult = 1;
  goto yyreturnlab;


/*-----------------------------------------------------------.
| yyexhaustedlab -- YYNOMEM (memory exhaustion) comes here.  |
`-----------------------------------------------------------*/
yyexhaustedlab:
  yyerror (YY_("memory exhausted"));
  yyresult = 2;
  goto yyreturnlab;


/*----------------------------------------------------------.
| yyreturnlab -- parsing is finished, clean up and return.  |
`----------------------------------------------------------*/
yyreturnlab:
  if (yychar != YYEMPTY)
    {
      /* Make sure we have latest lookahead translation.  See comments at
         user semantic actions for why this is necessary.  */
      yytoken = YYTRANSLATE (yychar);
      yydestruct ("Cleanup: discarding lookahead",
                  yytoken, &yylval);
    }
  /* Do not reclaim the symbols of the rule whose action triggered
     this YYABORT or YYACCEPT.  */
  YYPOPSTACK (yylen);
  YY_STACK_PRINT (yyss, yyssp);
  while (yyssp != yyss)
    {
      yydestruct ("Cleanup: popping",
                  YY_ACCESSING_SYMBOL (+*yyssp), yyvsp);
      YYPOPSTACK (1);
    }
#ifndef yyoverflow
  if (yyss != yyssa)
    YYSTACK_FREE (yyss);
#endif

  return yyresult;
}

#line 479 "parser.y"


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
