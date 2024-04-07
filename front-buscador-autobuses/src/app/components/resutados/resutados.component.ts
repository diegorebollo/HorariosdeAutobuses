import { Component, inject } from '@angular/core';
import { Ruta } from '../../interfaces/ruta';
import { Estacion } from '../../interfaces/estacion';
import { RutaData } from '../../interfaces/ruta-data';
import { NgFor, NgClass, Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-resutados',
  standalone: true,
  imports: [NgFor, NgClass],
  providers: [],
  templateUrl: './resutados.component.html',
  styleUrl: './resutados.component.css'
})
export class ResutadosComponent {

  router = inject(Router);
  apiClient = inject(ApiClientService);
  location  = inject(Location)

  rutaResponse!: Ruta

  rutaEstacionOrigen! : Estacion
  rutaEstacionDestino! : Estacion
  rutaData! : RutaData[]


ngOnInit(){ 

  this.rutaResponse = history.state.ruta

  this.rutaEstacionOrigen = this.rutaResponse.estacionOrigen
  this.rutaEstacionDestino = this.rutaResponse.estacionDestino

  if (this.rutaResponse.data !== null) {
    this.rutaData = JSON.parse(this.rutaResponse.data)
  }  
}

onClick(){

  this.apiClient.getRuta(this.rutaEstacionDestino.id, this.rutaEstacionOrigen.id).subscribe(ruta => {
    const navigationExtras: NavigationExtras = {
      state: { ruta: ruta},
    };       
    this.router.navigate([`/ruta/${this.rutaEstacionDestino.id}/${this.rutaEstacionOrigen.id}`], navigationExtras)
  });



}
}
