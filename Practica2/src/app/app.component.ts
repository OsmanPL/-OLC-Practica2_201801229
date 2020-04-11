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

export interface Errores {
  Nombre: string;
  Tipo: string;
  Columna: number;
  Fila: number;
}

const ELEMENT_DATA: Errores[] = [
  {Nombre: 'a', Tipo: 'Lexico', Columna:0,Fila:0},
  {Nombre: 'b', Tipo: 'Lexico', Columna:12,Fila:0},
  {Nombre: 'c', Tipo: 'Lexico', Columna:4,Fila:0},
  {Nombre: 'r', Tipo: 'Sintactico', Columna:1,Fila:7},
  {Nombre: 't', Tipo: 'Sintactico', Columna:6,Fila:8},
  {Nombre: 't', Tipo: 'Sintactico', Columna:6,Fila:8},
  {Nombre: 'b', Tipo: 'Lexico', Columna:12,Fila:0},
  {Nombre: 'c', Tipo: 'Lexico', Columna:4,Fila:0},
  {Nombre: 't', Tipo: 'Sintactico', Columna:6,Fila:8},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Practica2';
  tabs = [];
  numPest : number = 0;
  selected = new FormControl(0);
  ind : number;
  addTab() {
    this.tabs.push('Petaña No.' + this.numPest);
    this.numPest++;
    this.selected.setValue(this.tabs.length - 1);
    this.ind = this.tabs.length -1;
  }
  
  removeTab(index: number) {
    console.log(index);
    this.tabs.splice(index, 1);
  }

  displayedColumns: string[] = ['Nombre', 'Tipo', 'Columna', 'Fila'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

