import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  juegos: Game[] = [];

  constructor(private http: HttpClient) { }

  getNominados(){

    if( this.juegos.length > 0 ){
      // No tenemos juegos
      console.log('Desde cache');
      return of(this.juegos);
    } else {
      console.log('Desde internet');
      return this.http.get<Game[]>(`${ environment.url }/api/goty`)
          .pipe(
            tap(
              juegos => this.juegos = juegos
            )
          )
    }
  }

  votarJuego( id: string){
    return this.http.post((`${ environment.url }/api/goty/${ id }`),{})
          .pipe(
            catchError( err => {
              return of(err.error);
            })
          )
  }
}
