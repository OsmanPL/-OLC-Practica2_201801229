import {Token} from '../Interfaces/Token';
import {Errores} from '../Interfaces/Errores';
import {TipoToken} from '../Interfaces/Token';

export class Analizador_Sintactico{
    tokens:any[]=[];
    errores:any []=[];
    index : number = 0;
    numerror : number = 1;
    tokenctual: Token;
    constructor(){

    }
    addError(id:number, nombre:string, descripcion:string,columna:number, fila:number){
        this.errores.push(new Errores(id,nombre,"Sintactico","Se esperaba "+ descripcion,columna,fila));
        this.numerror++;
        console.log(this.errores);
    }

    iniciarListas(listaTok:any[], listaer:any[]){
        this.tokens = listaTok;
        this.errores = listaer;
        this.tokenctual = <Token>this.tokens[this.index];
        this.iniciarAnalisis();
    }

    emparejar(tipoActual:Token, tipoEsperado:TipoToken){
        if(tipoActual.Token==tipoEsperado){
            this.index++;
            this.tokenctual=<Token>this.tokens[this.index];
            return true;
        }else{
            console.log(tipoActual.Token);
            return false;
        }
    }
    recuperacionPanico(){
        let validar:boolean = false;
        while(this.tokenctual !=null){
            if(this.tokenctual.Token==TipoToken.punto_coma){
                validar = true;
                break;
            }
            this.index++;
            this.tokenctual = <Token>this.tokens[this.index];
        }

        if(validar){
            this.index++;
            this.tokenctual = <Token>this.tokens[this.index];
            this.sentencia();
        }
    }

    iniciarAnalisis(){
        if(this.emparejar(this.tokenctual, TipoToken.palabra_void)){
            if(this.emparejar(this.tokenctual, TipoToken.palabra_main)){
                if(this.emparejar(this.tokenctual, TipoToken.parentesis_izquierdo)){
                    if(this.emparejar(this.tokenctual, TipoToken.parentesis_derecho)){
                        if(this.emparejar(this.tokenctual, TipoToken.llave_izquierda)){
                            this.sentencia();
                            if(this.emparejar(this.tokenctual, TipoToken.llave_derecha)){
                            }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.llave_derecha,this.tokenctual.Columna,this.tokenctual.Fila);
                                this.recuperacionPanico();}
                        }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.llave_izquierda,this.tokenctual.Columna,this.tokenctual.Fila);
                            this.recuperacionPanico();}
                    }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.parentesis_derecho,this.tokenctual.Columna,this.tokenctual.Fila);
                        this.recuperacionPanico();}
                }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.parentesis_izquierdo,this.tokenctual.Columna,this.tokenctual.Fila);
                    this.recuperacionPanico();}
            }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.palabra_main,this.tokenctual.Columna,this.tokenctual.Fila);
                this.recuperacionPanico();}
        }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.palabra_void,this.tokenctual.Columna,this.tokenctual.Fila);
            this.recuperacionPanico();}
    }
    sentencia(){
        if(this.emparejar(this.tokenctual, TipoToken.doble_diagonal)){
            if(this.emparejar(this.tokenctual, TipoToken.comentario_linea)){
                this.sentencia();
            }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.comentario_linea,this.tokenctual.Columna,this.tokenctual.Fila);
                this.recuperacionPanico();}
        }else if(this.emparejar(this.tokenctual, TipoToken.abrir_comentario)){
            if(this.emparejar(this.tokenctual, TipoToken.comentario_multilinea)){
                if(this.emparejar(this.tokenctual, TipoToken.cerrar_comentario)){
                    this.sentencia();
                }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.cerrar_comentario,this.tokenctual.Columna,this.tokenctual.Fila);
                    this.recuperacionPanico();}
            }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.comentario_multilinea,this.tokenctual.Columna,this.tokenctual.Fila);
                this.recuperacionPanico();}
        }else if(this.emparejar(this.tokenctual, TipoToken.tipo_dato_int) ||this.emparejar(this.tokenctual, TipoToken.tipo_dato_string)||this.emparejar(this.tokenctual, TipoToken.tipo_dato_char)||this.emparejar(this.tokenctual, TipoToken.tipo_dato_bool)||this.emparejar(this.tokenctual, TipoToken.tipo_dato_double)){
            if(this.emparejar(this.tokenctual, TipoToken.identificador)){
                if(this.tokenctual.Token == TipoToken.parentesis_izquierdo){
                    this.Funcion();
                }else{
                    this.listaId();
                    if(this.emparejar(this.tokenctual,TipoToken.igual)){
                        this.expresion();
                        this.listaId();
                        if(this.emparejar(this.tokenctual,TipoToken.punto_coma)){
                            this.sentencia();
                        }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.punto_coma,this.tokenctual.Columna,this.tokenctual.Fila);
                            this.recuperacionPanico();}
                    }else if(this.emparejar(this.tokenctual,TipoToken.punto_coma)){
                        this.sentencia();
                    }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.punto_coma,this.tokenctual.Columna,this.tokenctual.Fila);
                        this.recuperacionPanico();}
                }
            }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.identificador,this.tokenctual.Columna,this.tokenctual.Fila);
                this.recuperacionPanico();}
        }else{}
    }

    listaId(){
        if(this.emparejar(this.tokenctual, TipoToken.coma)){
            if(this.emparejar(this.tokenctual, TipoToken.identificador)){
                if(this.emparejar(this.tokenctual, TipoToken.igual)){
                    this.expresion();
                    this.listaId();
                }else{
                    this.listaId();
                }
            }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.identificador,this.tokenctual.Columna,this.tokenctual.Fila);
                this.recuperacionPanico();}
        }else{}
    }

    expresion(){
        if(this.emparejar(this.tokenctual, TipoToken.comilla_simple)){
            if(this.emparejar(this.tokenctual, TipoToken.caracter)){
                if(this.emparejar(this.tokenctual, TipoToken.comilla_simple)){
                    if(this.emparejar(this.tokenctual, TipoToken.simbolo_mas)){
                        this.expresion();
                    }
                }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.comilla_simple,this.tokenctual.Columna,this.tokenctual.Fila);
                    this.recuperacionPanico();}
            }else if(this.emparejar(this.tokenctual, TipoToken.comilla_simple)){
                if(this.emparejar(this.tokenctual, TipoToken.simbolo_mas)){
                    this.expresion();
                }
            }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.comilla_simple,this.tokenctual.Columna,this.tokenctual.Fila);
                this.recuperacionPanico();}
        }else if(this.emparejar(this.tokenctual, TipoToken.comilla_doble)){
            if(this.emparejar(this.tokenctual, TipoToken.cadena)){
                if(this.emparejar(this.tokenctual, TipoToken.comilla_doble)){
                    if(this.emparejar(this.tokenctual, TipoToken.simbolo_mas)){
                        this.expresion();
                    }
                }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.comilla_doble,this.tokenctual.Columna,this.tokenctual.Fila);
                    this.recuperacionPanico();}
            }else if(this.emparejar(this.tokenctual, TipoToken.comilla_doble)){
                if(this.emparejar(this.tokenctual, TipoToken.simbolo_mas)){
                    this.expresion();
                }
            }else{this.addError(this.numerror,this.tokenctual.Lexema,TipoToken.comilla_doble,this.tokenctual.Columna,this.tokenctual.Fila);
                this.recuperacionPanico();}
        }else{this.addError(this.numerror,this.tokenctual.Lexema,"Valor",this.tokenctual.Columna,this.tokenctual.Fila);
            this.recuperacionPanico();}
    }

    Funcion(){

    }

}