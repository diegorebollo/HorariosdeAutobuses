import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estacion } from '../interfaces/estacion';
import { Ruta } from '../interfaces/ruta';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  mainUrl = 'https://bus2.drebollo.com/api'

  constructor(private http: HttpClient){}


  getAllEstaciones(): Observable<Estacion[]> {
    return this.http.get<Estacion[]>(`${this.mainUrl}/estaciones`) 
  }

  searchEstaciones(search: string): Observable<Estacion[]> {
    return this.http.get<Estacion[]>(`${this.mainUrl}/estaciones?s=${search}`)
  }

  getRuta(idOrigen: number, idDestino: number): Observable<Ruta> {
    return this.http.get<any>(`${this.mainUrl}/busqueda/${idOrigen}/${idDestino}`)
  }

}
