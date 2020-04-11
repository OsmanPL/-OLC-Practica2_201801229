import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

export class MetodosTabs implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  tabs = [];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('Nueva Petaña');
    this.selected.setValue(this.tabs.length - 1);
  }
  
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}
