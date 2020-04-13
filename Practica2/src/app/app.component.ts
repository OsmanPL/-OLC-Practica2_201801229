import {FormControl} from '@angular/forms';
import {TabsComponent} from './Components/tabs/tabs.component';
import {MetodosTabs} from './Metodos/MetodosTabs';
import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {Errores} from './Interfaces/Errores';
import {Variable} from './Interfaces/Variable';
import {Token} from './Interfaces/Token';
import {Analizador_Lexico} from './Metodos/Analizador_Lexico';
import {Analizador_Sintactico} from './Metodos/Analizador_Sintactico';

const ELEMENT_DATA: Variable[] = [
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Practica2';
  tabs = [];
  textos = [];
  numPest : number = 0;
  selected = new FormControl(0);
  ind : number;
  texto:string="";
  
  tokens: any[]=[];
  errores: any[]=[];
  addTab() {
    this.tabs.push('Petaña No.' + this.numPest);
    this.textos.push('');
    this.numPest++;
    this.selected.setValue(this.tabs.length - 1);
    this.ind = this.tabs.length -1;
  }
  cambio(){
    this.texto = this.textos[this.selected.value];
  }
  removeTab(index: number) {
    console.log(index);
    this.tabs.splice(index, 1);
  }
  iniciar_analisis(){
    let lexico: Analizador_Lexico = new Analizador_Lexico();
    let sintactico: Analizador_Sintactico = new Analizador_Sintactico();
    lexico.analizador(this.texto);
    this.tokens = lexico.tokens;
    this.errores = lexico.errores;
    console.log(this.tokens);
    if(this.errores.length < 1){
      sintactico.iniciarListas(this.tokens,this.errores);
      this.tokens = sintactico.tokens;
      this.errores = sintactico.errores;
    }
    console.log(this.tokens);
    console.log(this.errores);
  }
  displayedColumns: string[] = ['Nombre', 'Tipo', 'Fila', 'Columna'];
  dataSource = new MatTableDataSource(this.tokens);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

