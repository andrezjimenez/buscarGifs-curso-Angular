import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {

  get verHistorial() {
    return this.gifsServices.historial;
  }
  
  constructor( private gifsServices: GifsService ){}

  buscar(item : string){
    
    console.log(item);
    this.gifsServices.buscarGifs(item);

  }

}
