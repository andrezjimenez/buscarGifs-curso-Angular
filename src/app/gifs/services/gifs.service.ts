import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, Searchgifsresponse } from '../Interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _historial: string[] = [];
  private _url : string = 'https://api.giphy.com/v1/gifs'
  private _apiKey: string='VpeqsVm202hvmlwSWw5ByBAxdQpeQYPL';
  public resultados: Gif [] = [];

  get historial (){
    return [...this._historial]
  }
  
  constructor( private http:HttpClient ){

    this._historial = JSON.parse(localStorage.getItem('Historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('Imagenes')!) || [];
    // if(localStorage.getItem('Historial')){
    //   this._historial = JSON.parse(localStorage.getItem('Historial')!);
    // }

  }

  buscarGifs( query:string ){
    
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('Historial',JSON.stringify(this._historial));
      
    }

    const params = new HttpParams()
      .set('api_key',this._apiKey)
      .set('limit','10')
      .set('q',query);
    
    this.http.get<Searchgifsresponse>(`${this._url}/search`,{params})
   .subscribe( (resp) => {
     console.log(resp.data);
     this.resultados = resp.data;
     localStorage.setItem('Imagenes',JSON.stringify(this.resultados));
   })
      
    console.log(this._historial);
    
  }
 
}
