import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.scss']
})
export class CicloComponent implements OnInit, OnChanges, OnDestroy {

  @Input() valorInicial: number = 10;

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  ngOnChanges(): void{
    console.log("ngOnChanges");
  }

  ngOnDestroy(){
    console.log("ngOnDestroy");
  }

}
