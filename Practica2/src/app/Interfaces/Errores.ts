export class Errores {
    Id:number;
    Nombre: string;
    Tipo: string;
    Columna: number;
    Fila: number;
    constructor(id:number,nombre:string,tipo:string,columna:number,fila:number){
      this.Id=id;
      this.Nombre=nombre;
      this.Tipo=tipo;
      this.Columna=columna;
      this.Fila=fila;
    }
  }