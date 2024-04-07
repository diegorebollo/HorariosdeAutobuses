import { Component, Input } from '@angular/core';
import {Estacion} from '../../interfaces/estacion'

@Component({
  selector: 'app-autocomplete-estacion',
  standalone: true,
  imports: [],
  templateUrl: './autocomplete-estacion.component.html',
  styleUrl: './autocomplete-estacion.component.css'
})
export class AutocompleteEstacionComponent {

  @Input() estacion: Estacion[] = [];

  

  

}
