import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgClass, NgStyle, NgIf} from '@angular/common';
import {Estacion} from '../../interfaces/estacion'

@Component({
  selector: 'app-search-autocomplete',
  standalone: true,
  imports: [NgFor, NgClass, NgStyle, NgIf],
  templateUrl: './search-autocomplete.component.html',
  styleUrl: './search-autocomplete.component.css',

})
export class SearchAutocompleteComponent {
  @Input() data: Estacion[] = []
  @Input() isElementFocus = false;
  @Input() hoverIndex = 0;  
  @Output() autocompleteEstacion = new EventEmitter<Estacion>();
  @Output() estacionClicked = new EventEmitter<boolean>() ;


  // ngOnChanges(){  
    
  //   const isArrayEmpty = this.data.length > 0 ? false : true;
  //   this.enableHide = isArrayEmpty ? true : false

  // }

  onClick(estacion:Estacion){
    this.autocompleteEstacion.emit(estacion);
  }  
}
