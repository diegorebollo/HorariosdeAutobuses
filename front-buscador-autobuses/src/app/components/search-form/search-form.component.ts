import { Component, inject } from '@angular/core';
import { SearchInputFieldComponent } from '../search-input-field/search-input-field.component';
import { NgStyle } from '@angular/common';
import { Estacion } from '../../interfaces/estacion';
import { NavigationExtras, Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [SearchInputFieldComponent, NgStyle],
  providers: [Router, ApiClientService],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',

})
export class SearchFormComponent {

  estacionOrigen!: Estacion;
  estacionDestino!: Estacion;

  router = inject(Router);
  apiClient = inject(ApiClientService);

  
  changeOrigen(estacion: Estacion){
    this.estacionOrigen = estacion
  }

  changeDesitino(estacion: Estacion){
    this.estacionDestino = estacion;
  }

  onSubmit(event:Event){    
    event.preventDefault();    

    this.apiClient.getRuta(this.estacionOrigen.id, this.estacionDestino.id).subscribe(ruta => {     
      const navigationExtras: NavigationExtras = {
        state: { ruta: ruta},
      };       
      this.router.navigate([`ruta/${this.estacionOrigen.id}/${this.estacionDestino.id}`], navigationExtras)    

    })        
    

  }
}
