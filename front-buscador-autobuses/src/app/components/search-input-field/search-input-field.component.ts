import { Component, Input, Output, inject, EventEmitter  } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { SearchAutocompleteComponent } from '../search-autocomplete/search-autocomplete.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Estacion } from '../../interfaces/estacion';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search-input-field',
  standalone: true,
  imports: [SearchAutocompleteComponent, ReactiveFormsModule,NgIf],
  providers: [ApiClientService],
  templateUrl: './search-input-field.component.html',
  styleUrl: './search-input-field.component.css',

})
export class SearchInputFieldComponent {

  @Input() textEstacion!: string;
  @Output() estacion = new EventEmitter<Estacion>();

  searchValue = new FormControl('');
  autocompleteData: Estacion[] = [];

  isArrayEmpty = true;  
  enableAutocomplete = false;
  estacionClicked = false;  
  isFocus = false;
  isMouseOver = false;
  

  hoverIndex = -1;

  apiClient = inject(ApiClientService);


  ngOnInit(){    
    // Fetch API for Autocomplete Component

    this.searchValue.valueChanges.subscribe(searchValue => {

      const length = searchValue?.length;     
      

      if (length !== undefined && length >= 1 && searchValue !== null ){

        if(!searchValue.startsWith(" ")){
          this.apiClient.searchEstaciones(searchValue).subscribe(data => {
            this.autocompleteData = data;
          })      
        }
      } else {
        this.autocompleteData = [];
      } 
    })

  }

  ngDoCheck() {


    // Chapuza maxima pero funciona NO CAMBIAR

    if(this.autocompleteData.length > 0 ){
      if(this.isFocus && this.isMouseOver ){
        if(!this.estacionClicked){
          this.enableAutocomplete = true        
        } else{
          this.enableAutocomplete = false;
        }        
      } else if (!this.isFocus && !this.isMouseOver){
        this.enableAutocomplete = false;
      }
    } else {
      this.enableAutocomplete = false;
      this.estacionClicked = false;
    }   


  } 

  onKeyDown(event: KeyboardEvent){
      const keysDown = ['ArrowDown', 'Tab']

      if(keysDown.includes(event.key)){
        this.hoverIndex = this.hoverIndex === this.autocompleteData.length -1 ? this.hoverIndex = 0 : this.hoverIndex += 1;    
      }
    }

  changeEstacion(estacion: Estacion){
      this.searchValue.setValue(estacion.name); 
      this.autocompleteData = [] 
      this.estacion.emit(estacion);
      this.estacionClicked = true;             
  }


  onFocus(){
      this.isFocus = true;
    }

  onBlur(){   
    this.isFocus = false;
    } 

    onMouseEnter() {
      this.isMouseOver = true;
    }
    
    onMouseLeave(){
      this.isMouseOver = false;
    }
}

  