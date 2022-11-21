import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})

export class PaginaInicialComponent {
  public columna1:string
  constructor(){
    this.columna1 ="variable"
  }

  ngOnInit():void{

  }
}
