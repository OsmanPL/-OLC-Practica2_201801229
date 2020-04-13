import {Token} from '../Interfaces/Token';
import {Errores} from '../Interfaces/Errores';
import {TipoToken} from '../Interfaces/Token';

export class Analizador_Lexico{
    tokens:any[]=[];
    errores:any []=[];
    numero:number = 1;
    numerror : number = 1;
    constructor(){

    }
    addToken(id: number, lexema:string, tipo:TipoToken, columna:number, fila:number){
        this.tokens.push(new Token(id, lexema,tipo,columna,fila));
        this.numero++;
    }

    addError(id:number, nombre:string, columna:number, fila:number){
        this.errores.push(new Errores(id,nombre,"Lexico","Caracter Desconocido",columna,fila));
        this.numerror++;
    }
    analizador(texto:string){
        texto = texto +" ";
        let c: string;
        let columna:number=0;
        let fila:number=1;
        let estado:number=0;
        let  lexema : string = "";
        for (let index = 0; index < texto.length; index++) {
            c = texto[index];
            columna++;
            switch(estado){
                case 0:
                    if(this.letras(c)){
                        console.log(c);
                        lexema += c;
                        estado = 1;
                        console.log(estado);
                    }else if(this.numeros(c)){
                        lexema+=c;
                        estado = 2;
                    }else if(c == "\n"){
                        fila++;
                        columna = 1;
                        estado = 0;
                    }else if(c == " "){

                    }else if(c == "*"){
                        this.addToken(this.numero,c,TipoToken.simbolo_multiplicacion,columna,fila);
                    }else if(c == "{"){
                        this.addToken(this.numero,c,TipoToken.llave_izquierda,columna,fila);
                    }else if(c == "}"){
                        this.addToken(this.numero,c,TipoToken.llave_derecha,columna,fila);
                    }else if(c == "("){
                        this.addToken(this.numero,c,TipoToken.parentesis_izquierdo,columna,fila);
                    }else if(c == ")"){
                        this.addToken(this.numero,c,TipoToken.parentesis_derecho,columna,fila);
                    }else if(c == "."){
                        this.addToken(this.numero,c,TipoToken.punto,columna,fila);
                    }else if(c == ";"){
                        this.addToken(this.numero,c,TipoToken.punto_coma,columna,fila);
                    }else if(c == ","){
                        this.addToken(this.numero,c,TipoToken.coma,columna,fila);
                    }else if(c == ":"){
                        this.addToken(this.numero,c,TipoToken.dos_puntos,columna,fila);
                    }else if(c == "\u0022"){
                        this.addToken(this.numero,c,TipoToken.comilla_doble,columna,fila);
                        estado = 4;
                    }else if(c == "\u0027"){
                        this.addToken(this.numero,c,TipoToken.comilla_simple,columna,fila);
                        estado = 5;
                    }else if(c == "/"){
                        estado = 7;
                        lexema += c;
                    }
                    else if(c == ">"){
                        estado = 11;
                        lexema += c;
                    }
                    else if(c == "<"){
                        estado = 12;
                        lexema += c;
                    }
                    else if(c == "="){
                        estado = 13;
                        lexema += c;
                    }
                    else if(c == "!"){
                        estado = 14;
                        lexema += c;
                    }
                    else if(c == "&"){
                        estado = 15;
                        lexema += c;
                    }
                    else if(c == "|"){
                        estado = 16;
                        lexema += c;
                    }
                    else if(c == "+"){
                        estado = 17;
                        lexema += c;
                    }
                    else if(c == "-"){
                        estado = 18;
                        lexema += c;
                    }
                    else{
                        this.addError(this.numerror,c,columna,fila);
                    }
                    break;
                case 1:
                    if(this.letrasNumeros(c) || c == "_"){
                        console.log(c);
                        lexema += c;
                        estado = 1;
                    }else{
                        console.log(c);
                        this.palabrareservada(lexema,columna,fila);
                        lexema = "";
                        index--;
                        estado = 0;
                    }
                    break;
                case 2:
                    if(this.numeros(c)){
                        lexema+=c;
                        estado = 2;
                    }else if(c=="."){
                        lexema+=c;
                        estado = 3;
                    }else{
                        this.addToken(this.numero,lexema,TipoToken.numero,columna,fila);
                        index--;
                        estado = 0;
                        lexema = "";
                    }
                    break;
                case 3:
                    if(this.numeros(c)){
                        lexema+=c;
                        estado = 3;
                    }else{
                        this.addToken(this.numero,lexema,TipoToken.decimal,columna,fila);
                        index--;
                        estado = 0;
                        lexema = "";
                    }
                    break;
                case 4:
                    if(c=="\u0022"){
                        this.addToken(this.numero,lexema,TipoToken.cadena,columna,fila);
                        this.addToken(this.numero,c,TipoToken.comilla_doble,columna,fila);
                        lexema = "";
                        estado = 0;
                    }else{
                        lexema += c;
                        estado = 4;
                    }
                    break;
                case 5:
                    if(c=="\u0027"){
                        this.addToken(this.numero,c,TipoToken.comilla_simple,columna,fila);
                        lexema = "";
                        estado = 0;
                    }else{
                        lexema += c;
                        estado = 6;
                    }
                    break;
                case 6:
                    if(c=="\u0027"){
                        this.addToken(this.numero,lexema,TipoToken.caracter,columna,fila);
                        this.addToken(this.numero,c,TipoToken.comilla_simple,columna,fila);
                        lexema = "";
                        estado = 0;
                    }else{
                        this.addError(this.numerror,c,columna,fila);
                        lexema = "";
                        estado = 0;
                    }
                    break;
                case 7:
                    if(c=="/"){
                        lexema += c;
                        this.addToken(this.numero,lexema,TipoToken.doble_diagonal,columna,fila);
                        lexema = "";
                        estado = 8;
                    }else if(c=="*"){
                        lexema += c;
                        this.addToken(this.numero,lexema,TipoToken.abrir_comentario,columna,fila);
                        lexema = "";
                        estado = 9;
                    }
                    else{
                        index--;
                        this.addToken(this.numero,lexema,TipoToken.simbolo_division,columna,fila);
                        lexema = "";
                        estado = 0;
                    }
                    break;
                case 8:
                    if(c=="\n"){
                        index--;
                        this.addToken(this.numero,lexema,TipoToken.comentario_linea,columna,fila);
                        lexema = "";
                        estado = 0;
                    }else{
                        lexema+=c;
                        estado = 8;
                    }
                    break;
                case 9:
                    if(c=="*"){
                        estado = 10;
                    }else{
                        lexema+=c;
                        estado = 9;
                    }
                    break;
                case 10:
                    if(c=="/"){
                        this.addToken(this.numero,lexema,TipoToken.comentario_multilinea,columna,fila);
                        lexema="";
                        lexema+= "*"+c;
                        this.addToken(this.numero,lexema,TipoToken.cerrar_comentario,columna,fila);
                        lexema = "";
                        estado = 0;
                    }else{
                        lexema += "*";
                        estado = 9;
                    }
                    break;
                case 11:
                    if(c=="="){
                        lexema+= c;
                        this.addToken(this.numero,lexema,TipoToken.mayor_igual,columna,fila);
                        lexema = "";
                        estado = 0; 
                    }else{
                        index--;
                        this.addToken(this.numero,lexema,TipoToken.mayor,columna,fila);
                        lexema = "";
                        estado = 0;
                    }
                    break;
                case 12:
                    if(c=="="){
                        lexema+= c;
                        this.addToken(this.numero,lexema,TipoToken.menor_igual,columna,fila);
                        lexema = "";
                        estado = 0; 
                    }else{
                        index--;
                        this.addToken(this.numero,lexema,TipoToken.menor,columna,fila);
                        lexema = "";
                        estado = 0;
                    }
                    break;
                case 13:
                    if(c=="="){
                        lexema+= c;
                        this.addToken(this.numero,lexema,TipoToken.igual_igual,columna,fila);
                        lexema = "";
                        estado = 0; 
                    }else{
                        index--;
                        this.addToken(this.numero,lexema,TipoToken.igual,columna,fila);
                        lexema = "";
                        estado = 0;
                    }
                    break;
                case 14:
                    if(c=="="){
                        lexema+= c;
                        this.addToken(this.numero,lexema,TipoToken.distinto,columna,fila);
                        lexema = "";
                        estado = 0; 
                    }else{
                        index--;
                        this.addToken(this.numero,lexema,TipoToken.simbolo_not,columna,fila);
                        lexema = "";
                        estado = 0;
                    }
                    break;
                case 15:
                    if(c=="&"){
                        lexema+= c;
                        this.addToken(this.numero,lexema,TipoToken.simbolo_and,columna,fila);
                        lexema = "";
                        estado = 0; 
                    }else{
                        index--;
                        this.addError(this.numerror,lexema,columna,fila);
                        lexema = "";
                        estado = 0;
                    }
                    break;
                case 16:
                    if(c=="|"){
                        lexema+= c;
                        this.addToken(this.numero,lexema,TipoToken.simbolo_or,columna,fila);
                        lexema = "";
                        estado = 0; 
                    }else{
                        index--;
                        this.addError(this.numerror,lexema,columna,fila);
                        lexema = "";
                        estado = 0;
                    }
                    break;
                case 17:
                    if(c=="+"){
                        lexema+= c;
                        this.addToken(this.numero,lexema,TipoToken.doble_mas,columna,fila);
                        lexema = "";
                        estado = 0; 
                    }else{
                        index--;
                        this.addToken(this.numero,lexema,TipoToken.simbolo_mas,columna,fila);
                        lexema = "";
                        estado = 0;
                    }
                    break;
                case 18:
                    if(c=="-"){
                        lexema+= c;
                        this.addToken(this.numero,lexema,TipoToken.doble_menos,columna,fila);
                        lexema = "";
                        estado = 0; 
                    }else{
                        index--;
                        this.addToken(this.numero,lexema,TipoToken.simbolo_resta,columna,fila);
                        lexema = "";
                        estado = 0;
                    }
                    break;
            }
        }
    }

    letras(texto:string){
       var letters = /^[a-zA-Z]+$/;
       if(texto[0].match(letters))
       {
            return true;
        }
        else
        {
            return false;
        }
    }
    numeros(texto:string){
        var letters = /^[0-9]+$/;
        if(texto[0].match(letters))
        {
             return true;
         }
         else
         {
             return false;
         }
     }
     letrasNumeros(texto:string){
        var letters = /^[0-9a-zA-Z]+$/;
        if(texto[0].match(letters))
        {
             return true;
         }
         else
         {
             return false;
         }
     }

    palabrareservada(palabra:string, columna:number, fila:number){
        if(palabra == "void"){
            this.addToken(this.numero,palabra,TipoToken.palabra_void,columna,fila);
            console.log(palabra);
        }
        else if(palabra == "main"){
            this.addToken(this.numero,palabra,TipoToken.palabra_main,columna,fila);
        }
        else if(palabra == "break"){
            this.addToken(this.numero,palabra,TipoToken.palabra_break,columna,fila);
        }
        else if(palabra == "case"){
            this.addToken(this.numero,palabra,TipoToken.palabra_case,columna,fila);
        }
        else if(palabra == "Console"){
            this.addToken(this.numero,palabra,TipoToken.palabra_console,columna,fila);
        }
        else if(palabra == "continue"){
            this.addToken(this.numero,palabra,TipoToken.palabra_continue,columna,fila);
        }
        else if(palabra == "default"){
            this.addToken(this.numero,palabra,TipoToken.palabra_default,columna,fila);
        }
        else if(palabra == "do"){
            this.addToken(this.numero,palabra,TipoToken.palabra_do,columna,fila);
        }
        else if(palabra == "else"){
            this.addToken(this.numero,palabra,TipoToken.palabra_else,columna,fila);
        }
        else if(palabra == "for"){
            this.addToken(this.numero,palabra,TipoToken.palabra_for,columna,fila);
        }
        else if(palabra == "if"){
            this.addToken(this.numero,palabra,TipoToken.palabra_if,columna,fila);
        }
        else if(palabra == "return"){
            this.addToken(this.numero,palabra,TipoToken.palabra_return,columna,fila);
        }
        else if(palabra == "switch"){
            this.addToken(this.numero,palabra,TipoToken.palabra_switch,columna,fila);
        }
        else if(palabra == "while"){
            this.addToken(this.numero,palabra,TipoToken.palabra_while,columna,fila);
        }
        else if(palabra == "Write"){
            this.addToken(this.numero,palabra,TipoToken.palabra_write,columna,fila);
        }
        else if(palabra == "int"){
            this.addToken(this.numero,palabra,TipoToken.tipo_dato_int,columna,fila)
        }
        else if(palabra == "bool"){
            this.addToken(this.numero,palabra,TipoToken.tipo_dato_bool,columna,fila)
        }
        else if(palabra == "char"){
            this.addToken(this.numero,palabra,TipoToken.tipo_dato_char,columna,fila)
        }
        else if(palabra == "double"){
            this.addToken(this.numero,palabra,TipoToken.tipo_dato_double,columna,fila)
        }
        else if(palabra == "string"){
            this.addToken(this.numero,palabra,TipoToken.tipo_dato_string,columna,fila)
        }
        else{
            this.addToken(this.numero,palabra,TipoToken.identificador,columna,fila);
        }
    }   
}