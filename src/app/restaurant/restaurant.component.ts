import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RestaurantModel } from '../models/restaurants-model';

@Component({
  selector: 'app-restaurant',
  imports: [],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {
  @Input() model: RestaurantModel |undefined = undefined;
  @Output() saved = new EventEmitter<RestaurantModel>();


  getValue(event: any): string {
    return event.target.value;
  }

  getNumberValue(event: any): number {
    return Number(event.target.value);
  }

  save(){
    if(!this.model?.restaurantName || this.model.category == "Válassz..." || !this.model?.capacity || !this.model?.restaurantOwner || !this.model?.ownerEmail || !this.model?.ownerBirthDate)
      alert("Minden mezőt ki kell tölteni");
    else
      this.saved.emit(this.model);
  }
}
