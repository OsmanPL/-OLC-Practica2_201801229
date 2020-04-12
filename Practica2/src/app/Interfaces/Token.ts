export class Token {
    Id:number;
    Lexema: string;
    Token: TipoToken;
    Columna: number;
    Fila: number;

    constructor(id:number,lexema:string,token:TipoToken,columna:number,fila:number) {
        this.Id = id;
        this.Lexema=lexema;
        this.Token = token;
        this.Columna = columna;
        this.Fila = fila;
    }
}

export enum TipoToken{
    doble_diagonal = 'Doble Diagonal',
    comentario_linea = 'Comentario Una Linea',
    abrir_comentario = 'Abrir Comentario Multilinea',
    comentario_multilinea = 'Comentario Multilinea',
    cerrar_comentario = 'Cerrar Comentario Multlinea',
    tipo_dato_int = 'int',
    tipo_dato_string = 'string',
    tipo_dato_double = 'double',
    tipo_dato_char = 'char',
    tipo_dato_bool = 'bool',
    identificador = 'Identificador',
    coma = 'Coma (,)',
    punto = 'Punto (.)',
    igual = 'Igual (=)',
    punto_coma = 'Punto y Coma (;)',
    dos_puntos = 'Dos Puntos (:)',
    palabra_void = 'Palabra Reservada void',
    parentesis_izquierdo = 'Parentesis Izquierdo (',
    parentesis_derecho = 'Parentesis Derecho)',
    llave_izquierda = 'Llave Izquierda {',
    llave_derecha = 'Llave Derecha }',
    palabra_main = 'Palabra Reservada main',
    palabra_if = 'Palabra Reservada if',
    palabra_else = 'Palabra Reservada else',
    palabra_console = 'Palabra Reservada Console',
    palabra_write = 'Palabra Reservada Write',
    palabra_switch = 'Palabra Reservada switch',
    palabra_case = 'Palabra Reservada case',
    palabra_break = 'Palabra Reservada break',
    palabra_default = 'Palabra Reservada default',
    palabra_for = 'Palabra Reservada for',
    palabra_do = 'Palabra Reservada do',
    palabra_while = 'Palabra Reservada while',
    comilla_simple = 'Comilla Simple (\u0027)',
    comilla_doble = 'Comillas Dobles (\u0022)',
    palabra_return = 'Palabra Reservada return',
    palabra_continue = 'Palabra Reservada continue',
    simbolo_mas = 'Simbolo Más (+)',
    simbolo_resta = 'Simbolo Menos (-)',
    simbolo_multiplicacion = 'Simbolo Multiplicacion (*)',
    simbolo_division = 'Simbolo División (/)',
    simbolo_and = 'And (&&)',
    simbolo_or = 'Or (||)',
    simbolo_not = 'Not (!)',
    mayor = 'Mayor (>)',
    menor = 'Menor (<)',
    mayor_igual = 'Mayor Igual (>=)',
    menor_igual = 'Menor Igual (<=)',
    igual_igual = 'Igual Igual (==)',
    distinto = 'Distinto (!=)',
    cadena = 'Cadena',
    caracter = 'Caracter',
    numero = 'Numero',
    decimal = 'Numero Decimal',
    doble_mas = 'Doble Más (++)',
    doble_menos = 'Doble Menos (--)'
}
