export class Errores {
    Id:number;
    Nombre: string;
    Tipo: string;
    Descripcion: string;
    Columna: number;
    Fila: number;
    constructor(id:number,nombre:string,tipo:string,descripcion:string,columna:number,fila:number){
      this.Id=id;
      this.Nombre=nombre;
      this.Tipo=tipo;
      this.Descripcion = descripcion;
      this.Columna=columna;
      this.Fila=fila;
    }
  }