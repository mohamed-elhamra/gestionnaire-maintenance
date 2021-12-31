import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-text-cell-rendrer',
  templateUrl: './text-cell-rendrer.component.html',
  styleUrls: ['./text-cell-rendrer.component.css']
})
export class TextCellRendrerComponent implements OnInit, ICellRendererAngularComp {


  descritpion: string = '';

  agInit(params: any): void {
    this.descritpion = params.value;
  }

  constructor() { }

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
